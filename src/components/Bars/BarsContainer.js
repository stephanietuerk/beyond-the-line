import React, { PureComponent } from 'react';
import { select, selectAll } from 'd3-selection';
import { event as d3event} from 'd3-selection';
import { line } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';
import Bars from './Bars';
import * as config from '../../utilities/config';


export default class BarsContainer extends PureComponent {
    
    
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
      select(this.refs.svg);
    }

    render() {
      const [width, height] = this.props.svgDimensions;
      const move = `translate(${this.props.margin.left}, ${this.props.margin.top})`;


      return (
        <div>
          <svg
            width={width}
            height={height}
            ref='svg'
          >
            <g
              transform={move}
            >
              <Bars
                svgDimensions={this.props.svgDimensions}
                barsData={this.props.barsData}
                barsVar={this.props.barsVar}
                marginVar={this.props.marginVar}
                // zoomTransform={zoomTransform}
              />
            </g>
          </svg>
        </div>
      );
    }
}