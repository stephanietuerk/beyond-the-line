import React, { PureComponent } from 'react';
import '../../App.scss';
import { select, selectAll, event } from 'd3-selection';
import {geoPath, geoAlbers } from 'd3-geo';
import { scaleLinear, scaleThreshold } from 'd3-scale';
import * as d3Zoom from 'd3-zoom';
import { feature } from 'topojson-client';
import * as config from '../../utilities/config';

export default class Map extends PureComponent {
    
    placeNamesOn = config.placeNamesOn;

    constructor(props) {
      super(props);
      this.draw = this.draw.bind(this);
        
        // this.updateChart = this.updateChart.bind(this);
        // this.destroyChart = this.destroyChart.bind(this);
    }
    
    componentDidMount() {
      // this.createMap();
    }

    componentDidUpdate() {
      select(this.refs.mapG)
        .selectAll('g')
        .remove();
      this.draw();
    }


    getColor(d) {
      const marginVar = this.props.marginVar;
      const voteColorRed = scaleLinear()
    		.domain([0,1])
    		.range(['#f8e5e6','#dd0035']);
    	const voteColorBlue = scaleLinear()
    		.domain([-1,0])
    		.range(['#3c5bff', '#d2e4ff']);
    	const changeColorRed = scaleLinear()
    		.domain([0,.5])
    		.range(['#f8e5e6','#dd0035']);
    	const changeColorBlue = scaleLinear()
    		.domain([-0.5,0])
        .range(['#3c5bff', '#e6f0ff']);
        
      if (isNaN(d.properties[marginVar])) {
        return config.initialColor;
      }
      else {
        if (d.properties[marginVar] >= 0) {
          if (marginVar.includes('CHANGE')) {
            return changeColorRed(d.properties[marginVar])
          }
          else {
            return voteColorRed(d.properties[marginVar]);
            }
          } 
        if (d.properties[marginVar] < 0) {
          if (marginVar.includes('CHANGE')) {
            return changeColorBlue(d.properties[marginVar]);
          }
          else {
            return voteColorBlue(d.properties[marginVar]);
          }
        }
      }
    }

    getPlaceNameVis(d) {
      const { placeNamesOn, zoomLevel } = this.props;
      if (placeNamesOn) {
        if (zoomLevel >= 1.7) {
          return "visible";
        }
        else {
          return (+d.properties.Population >= 28500) ? "visible" : "hidden";
        }
      }
      else {
        return 'hidden';
      }
    }

    getPointRadius(d) {
      const { zoomLevel } = this.props;
      return +d.properties.Population > 1000000 ? 
      5 / zoomLevel : +d.properties.Population > 100000 ? 
      3 / zoomLevel : 2 / zoomLevel;
    }

    getMapPath() {
      const mapProjection = geoAlbers()
        .rotate( [77.1945,0] )
        .center( [0, 41.2033] );
        
      const mapPath = geoPath()
        .projection(mapProjection)
        .pointRadius(d => {
          if (+d.properties.Population > 1000000) {return (5);}
          if (+d.properties.Population >100000) {return (3);}
          else {return (2);}
        });
    }
    
    draw() {
      const mapG = this.refs.mapG;
      const [mapWidth, mapHeight] = this.props.svgDimensions;
      const { geoData, geoLabels, zoomLevel } = this.props;

      // const mapG = select(node)
      //   .append('g');
      // const mapZoomBox = select(node)
      //   .append('rect')
      //   .attr('class', 'click-overlay')
      //   .attr('width', mapWidth)
      //   .attr('height', mapHeight)
      //   .on('mouseover', function() {
      //     mapZoomBox
      //       .style('stroke', config.initialColor)
      //         .style('stroke-width', '3px')
      //         .style('stroke-linecap', 'butt')
      //         .style('stroke-dasharray', '2, 3');
      //   })
      //   .on('mouseout', function() {
      //     mapZoomBox
      //       .style('stroke', 'none');
      //   })

      const mapProjection = geoAlbers()
        .rotate( [77.1945,0] )
        .center( [0, 41.2033] )
        .scale(1)
        .translate([0,0]);
        
      const mapPath = geoPath()
        .projection(mapProjection)
        .pointRadius(d => {
          if (+d.properties.Population > 1000000) {return (5);}
          if (+d.properties.Population >100000) {return (3);}
          else {return (2);}
        });

      const allTracts = feature(geoData, geoData.objects.PA_CensusTracts_2010);

      // mapProjection
      //   .scale(1)
      //   .translate([0,0]);
      
      const b = mapPath.bounds(allTracts),
        s = .95 / Math.max((b[1][0] - b[0][0]) / mapWidth, (b[1][1] - b[0][1]) / mapHeight),
        t = [(mapWidth - s * (b[1][0] + b[0][0])) / 2, (mapHeight - s * (b[1][1] + b[0][1])) / 2];
      
      mapProjection
          .scale(s)
          .translate(t);
        
    	//Make map geometry elements
      select(mapG)
        .append('g')
        .selectAll('path')
        .data(feature(geoData, geoData.objects.PA_CensusTracts_2010).features) 
        .join('path')
          // .enter().append('path')
        .attr('class', 'tracts vote-tracts tracts-non-brushed')
        .attr('tractno', d => d.properties.GEO_ID)
        .attr('d', mapPath)
        .style('fill', d => this.getColor(d))
        .style ('stroke', d => this.getColor(d))
        .style('stroke-width', '0.8px');
      
      const labelsG = select(mapG)
        .append('g')

      labelsG.selectAll('.city')
        .data(feature(geoLabels, geoLabels.objects.PA_Cities).features)
        .join('path')
        // .enter().append('path')
        .attr('d', mapPath.pointRadius(d => this.getPointRadius(d)))
        .attr('class', 'city')
        .attr('visibility', d => this.getPlaceNameVis(d));
      
      labelsG.selectAll('.city-label')
        .data(feature(geoLabels, geoLabels.objects.PA_Cities).features)
        .join('text')
        // .enter().append('text')
        .attr('class', 'city-label')
        .attr('transform', d => 'translate(' + mapProjection(d.geometry.coordinates) + ')')
        .attr('visibility', d => this.getPlaceNameVis(d))
        .attr('dy', d => {
          return (d.properties.City === 'Bethlehem' || 
          d.properties.City ==='Philadelphia' || 
          d.properties.City === 'Pittsburgh') ? '-.35em' : '.7em';
        })
        .attr('x', d => {return d.geometry.coordinates[0] > -77.1945 ? -5 : 5; })
        .style('text-anchor', d => {return d.geometry.coordinates[0] > -77.1945 ? 'end' : 'start'; })
        .style("font-size", function() {return 9/zoomLevel + "px";})
        .text(d => d.properties.City);
    }

    render() {
      const zoomTransform = this.props.zoomTransform;

      return (         
        <g 
          transform={zoomTransform}
          ref='mapG'
        >
        </g>
      );
    }
}