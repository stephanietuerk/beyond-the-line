import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection';
import { event as d3event} from 'd3-selection';
import { line } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import Bars from './Bars';
import * as config from '../../utilities/config';


export default class BarsContainer extends Component {
    
    
    constructor(props) {
        super(props);
        this.createChart = this.createChart.bind(this);
    }
    
    componentDidMount() {
      this.createChart();
    }

    componentDidUpdate() {
        this.createChart();
    }

    createChart() {
      select(this.refs.svg)
    }

    render() {
      const [width, height] = this.props.svgDimensions;

      return (
        <div>
          <svg
            width={width}
            height={height}
            ref='svg'
          >
            <Bars
              svgDimensions={this.props.svgDimensions}
              demoData={this.props.demoData}
              demoVar={this.props.demoVar}
              marginVar={this.props.marginVar}
            />
          </svg>
        </div>
      );
    }
}