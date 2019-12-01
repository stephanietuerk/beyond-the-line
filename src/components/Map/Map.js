import React, { PureComponent } from 'react';
import '../../styles/App.scss';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import * as config from '../../utilities/config';
import ColorsHelper from '../../utilities/colors.helper';
import geoData from '../../data/pa_geojson.json';
import geoLabels from '../../data/pa_cities.json';

export default class Map extends PureComponent {
  placeNamesOn = config.placeNamesOn;

  constructor(props) {
    super(props);
    this.colorsHelper = new ColorsHelper();
  }

  componentDidMount() {
    this.init();
    this.draw();
  }

  componentDidUpdate() {
    this.update();
  }

  init() {
    const mapMargin = 15;
    const allTracts = feature(geoData, geoData.objects.PA_CensusTracts_2010);

    const mapProjection = d3
      .geoAlbers()
      .rotate([77.1945, 0])
      .center([0, 41.2033])
      .fitExtent(
        [
          [mapMargin, mapMargin],
          [config.mapWidth - mapMargin, config.mapHeight - mapMargin]
        ],
        allTracts
      );

    const mapPath = d3
      .geoPath()
      .projection(mapProjection)
      .pointRadius(population => {
        if (population > 1000000) {
          return 5;
        }
        if (population > 100000) {
          return 3;
        } else {
          return 2;
        }
      });
    this.mapPath = mapPath;
    this.mapProjection = mapProjection;
  }

  getPlaceNameVis(population) {
    const { placeNamesOn, zoomLevel } = this.props;
    if (placeNamesOn) {
      if (zoomLevel >= 1.7) {
        return 'visible';
      } else {
        return population >= 28500 ? 'visible' : 'hidden';
      }
    } else {
      return 'hidden';
    }
  }

  getPointRadius(population) {
    const { zoomLevel } = this.props;
    return population > 1000000
      ? 5 / zoomLevel
      : population > 100000
      ? 3 / zoomLevel
      : 2 / zoomLevel;
  }

  draw() {
    const mapG = this.refs.mapG;
    const { zoomLevel, marginVar, data } = this.props;

    d3.select(mapG)
      .append('g')
      .selectAll('path')
      .data(feature(geoData, geoData.objects.PA_CensusTracts_2010).features)
      .join('path')
      .attr('class', 'tracts vote-tracts tracts-non-brushed')
      .attr('tractno', d => d.properties.GEO_ID)
      .attr('d', this.mapPath)
      .style('fill', d => {
        return data
          ? this.colorsHelper.getMapColor(data[d.properties.GEO_ID], marginVar)
          : config.initialColor;
      })
      .style('stroke', d => {
        return data
          ? this.colorsHelper.getMapColor(data[d.properties.GEO_ID], marginVar)
          : config.initialColor;
      })
      .style('stroke-width', '0.8px');

    const labelsG = d3.select(mapG).append('g');

    labelsG
      .selectAll('.city')
      .data(feature(geoLabels, geoLabels.objects.PA_Cities).features)
      .join('path')
      .attr(
        'd',
        this.mapPath.pointRadius(d =>
          this.getPointRadius(+d.properties.Population)
        )
      )
      .attr('class', 'city')
      .attr('vector-effect', 'non-scaling-stroke')
      .attr('visibility', d => this.getPlaceNameVis(+d.properties.Population));

    labelsG
      .selectAll('.city-label')
      .data(feature(geoLabels, geoLabels.objects.PA_Cities).features)
      .join('text')
      .attr('class', 'city-label')
      .attr(
        'transform',
        d => 'translate(' + this.mapProjection(d.geometry.coordinates) + ')'
      )
      .attr('visibility', d => this.getPlaceNameVis(+d.properties.Population))
      .attr('dy', d => {
        return config.cityNamesNorth.includes(d.properties.City)
          ? '-.35em'
          : '.7em';
      })
      .attr('x', d => {
        return d.geometry.coordinates[0] > -77.1945
          ? -5 / Math.sqrt(zoomLevel)
          : 5 / Math.sqrt(zoomLevel);
      })
      .style('text-anchor', d => {
        return d.geometry.coordinates[0] > -77.1945 ? 'end' : 'start';
      })
      .style('font-size', function() {
        return 9 / zoomLevel + 'px';
      })
      .text(d => d.properties.City);
  }

  update() {
    const { marginVar, data, mapPath, zoomLevel } = this.props;

    const t = d3.transition().duration(750);

    d3.selectAll('.tracts')
      .transition(t)
      .style('fill', d => {
        return data
          ? this.colorsHelper.getMapColor(data[d.properties.GEO_ID], marginVar)
          : config.initialColor;
      })
      .style('stroke', d => {
        return data
          ? this.colorsHelper.getMapColor(data[d.properties.GEO_ID], marginVar)
          : config.initialColor;
      });

    d3.selectAll('.city')
      .attr(
        'd',
        this.mapPath.pointRadius(d =>
          this.getPointRadius(+d.properties.Population)
        )
      )
      .attr('visibility', d => this.getPlaceNameVis(+d.properties.Population));

    d3.selectAll('.city-label')
      .attr('visibility', d => this.getPlaceNameVis(+d.properties.Population))
      .attr('x', d => {
        return d.geometry.coordinates[0] > -77.1945
          ? -5 / Math.sqrt(zoomLevel)
          : 5 / Math.sqrt(zoomLevel);
      })
      .style('font-size', function() {
        return 9 / zoomLevel + 'px';
      });
  }

  render() {
    const zoomTransform = this.props.zoomTransform;
    return <g transform={zoomTransform} id="map-g" ref="mapG"></g>;
  }
}
