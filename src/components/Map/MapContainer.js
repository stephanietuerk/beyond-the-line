import React, { PureComponent } from 'react';
import '../../styles/App.scss';
import Map from './Map';
import * as d3 from 'd3';
import * as config from '../../utilities/config';

export default class MapContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      placeNamesOn: config.placeNamesOn,
      zoomLevel: 1
    };
    this.togglePlaceNames = this.togglePlaceNames.bind(this);
    this.zoom = d3
      .zoom()
      .scaleExtent([1, 10])
      .on('zoom', this.zoomed.bind(this));
  }

  componentDidMount() {
    d3.select(this.refs.svg).call(this.zoom);
    this.drawBoundingBox();
  }

  togglePlaceNames() {
    if (this.state.placeNamesOn) {
      this.setState({
        placeNamesOn: false
      });
    } else {
      this.setState({
        placeNamesOn: true
      });
    }
  }

  resetZoom() {
    d3.select(this.refs.svg)
      .transition()
      .duration(500)
      .call(this.zoom.transform, d3.zoomIdentity);
  }

  zoomed() {
    this.setState({
      zoomTransform: d3.event.transform,
      zoomLevel: d3.event.transform.k
    });
  }

  drawBoundingBox() {
    const mapZoomBox = d3
      .select(this.refs.svg)
      .append('rect')
      .attr('class', 'click-overlay')
      .attr('width', config.mapWidth)
      .attr('height', config.mapHeight)
      .on('mouseover', () => {
        mapZoomBox
          .style('stroke', config.initialColor)
          .style('stroke-width', '3px')
          .style('stroke-linecap', 'butt')
          .style('stroke-dasharray', '2, 3');
      })
      .on('mouseout', () => {
        mapZoomBox.style('stroke', 'none');
      });
  }

  render() {
    const { zoomLevel, zoomTransform, placeNamesOn } = this.state;

    return (
      <div className="map-container">
        <p className="instructions-text explore-text">
          zoom and move map to explore
        </p>
        <p className="instructions-text zoom-text">
          double click or pinch to zoom
        </p>
        <svg width={config.mapWidth} height={config.mapHeight} ref="svg">
          <Map
            marginVar={this.props.marginVar}
            zoomLevel={zoomLevel}
            zoomTransform={zoomTransform}
            placeNamesOn={placeNamesOn}
            data={this.props.data}
          />
        </svg>
        <div className="map-controls">
          <button
            className="button placenames-button"
            onClick={this.togglePlaceNames}
          >
            {this.state.placeNamesOn ? 'placenames: on' : 'placenames: off'}
          </button>
          {this.state.zoomLevel > 1 && (
            <button
              className="button zoom-button"
              onClick={() => this.resetZoom()}
            >
              reset zoom
            </button>
          )}
        </div>
      </div>
    );
  }
}
