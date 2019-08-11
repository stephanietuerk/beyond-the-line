import React, { PureComponent } from 'react';
import * as d3 from 'd3';
import Bars from './Bars';
import BarsIndex from './BarsIndex';
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
      d3.select(this.refs.svg);
    }

    render() {
      const dimensions = this.props.dimensions;
      const offset = `translate(${dimensions.margin.left}, ${dimensions.margin.top})`;

      return (
        <div>
          <svg
            width={dimensions.width}
            height={dimensions.height}
            ref='svg'
          >
            <g
              transform={offset}
            >
              <BarsIndex
                dimensions = {config.barsIndex}
                barsData={this.props.barsData}
                barsVar={this.props.barsVar}
                marginVar={this.props.marginVar}
              />
              <Bars
                dimensions = {config.bars}
                barsData={this.props.barsData}
                barsVar={this.props.barsVar}
                marginVar={this.props.marginVar}
              />
            </g>
          </svg>
        </div>
      );
    }
}