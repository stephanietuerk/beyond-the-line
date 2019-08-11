import React, { PureComponent } from 'react';
import '../../App.scss';
import Map from './Map';
import { select, selectAll } from 'd3-selection';
import { event as d3event} from 'd3-selection';
import { geoPath, geoAlbers } from 'd3-geo';
import { scaleLinear, scaleThreshold } from 'd3-scale';
import { zoom, zoomIdentity } from 'd3-zoom';
import { feature } from 'topojson-client';
import * as config from '../../utilities/config';

export default class MapContainer extends PureComponent {

    constructor(props) {
      super(props);
      this.state = {
        placeNamesOn: config.placeNamesOn,
        zoomLevel: 1,
      };
      this.togglePlaceNames = this.togglePlaceNames.bind(this);
      this.zoom = zoom()
        .scaleExtent([1,10])
        .on('zoom', this.zoomed.bind(this));
    }
    
    componentDidMount() {
      select(this.refs.svg)
        .call(this.zoom);
      this.drawBoundingBox();
    }

    componentDidUpdate() {
      select(this.refs.svg)
        .selectAll('rect')
        .remove();
      select(this.refs.svg)
        .call(this.zoom);
      this.drawBoundingBox();
    }

    togglePlaceNames() {
      if (this.state.placeNamesOn) {
        this.setState({
          placeNamesOn: false
        });
      }
      else {
        this.setState({
          placeNamesOn: true
        });
      }
    }

    resetZoom() {
      select(this.refs.svg)
        .transition()
        .duration(500)
          .call(this.zoom.transform, zoomIdentity);
    }


    zoomed() {
      this.setState({
        zoomTransform: d3event.transform,
        zoomLevel: d3event.transform.k
      });
    } 

    getPlaceNameVis(d) {
      if (this.state.placeNamesOn) {
        if (this.state.zoomLevel >= 1.7) {
          return "visible";
        }
        if (this.state.zoomLevel < 1.7) {
          return (+d.properties.Population >= 28500) ? "visible" : "hidden";
        }
      }
      else {
        return 'hidden';
      }
    }

    drawBoundingBox() {
      const [width, height] = this.props.svgDimensions;
      const mapZoomBox = select(this.refs.svg)
        .append('rect')
        .attr('class', 'click-overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', () => {
          mapZoomBox
            .style('stroke', config.initialColor)
            .style('stroke-width', '3px')
            .style('stroke-linecap', 'butt')
            .style('stroke-dasharray', '2, 3');
        })
        .on('mouseout', () => {
          mapZoomBox
            .style('stroke', 'none');
        });
    }

    render() {
      const [width, height] = this.props.svgDimensions;
      const { zoomLevel, zoomTransform, placeNamesOn } = this.state;

      return (
        <div>
          <div className='map-instructions'>
            <p id='explore-text'>zoom and move map to explore</p>
            <p id='zoom-text'>double click or pinch to zoom</p>
          </div>
          <svg
            width={width}
            height={height}
            ref='svg'
          >
            <Map
              svgDimensions={this.props.svgDimensions}
              geoData={this.props.geoData}
              geoLabels={this.props.geoLabels}
              marginVar={this.props.marginVar}
              zoomLevel={zoomLevel}
              zoomTransform={zoomTransform}
              placeNamesOn={placeNamesOn}
            />
          </svg>
          <div className='map-controls'>
            <button className='button' id='placenames-button' onClick={this.togglePlaceNames}>
              {this.state.placeNamesOn ? 'placenames: on' : 'placenames: off'}
            </button>
            {this.state.zoomLevel > 1 &&
              <button className='button' id='zoom-button' onClick={() => this.resetZoom()}>reset zoom</button>
            }
          </div>
        </div>
      );
    }
}