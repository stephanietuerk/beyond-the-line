import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection';
import { event as d3event} from 'd3-selection';
import { line } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array';


export default class DemoLine extends Component {
    
    
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

    sortData() {
      const { demoData, demoVar } = this.props;
      const sorted = demoData.sort((a, b) => {
    		if(!isFinite(a[demoVar] && !isFinite(b[demoVar]))) {
			    return 0;
		    } else if (!isFinite(a[demoVar]) ) {
          return 1;
        } else if (!isFinite(b[demoVar]) ) {
	        return -1;
        }
		    return +b[demoVar] > +a[demoVar] ? 1 : +b[demoVar] < +a[demoVar] ? -1 : 0;
      });
      return sorted;
    }

    rankData(sortedData) {
      return sortedData.map((tractObj, i) => {
        tractObj.position = i;
        return tractObj;
      })
    }

    createChart() {
      const { demoVar, svgDimensions } = this.props;
      const [width, height] = svgDimensions;
      const sortedData = this.sortData();
      console.log(demoVar);
      console.log(sortedData);
      const rankedData = this.rankData(sortedData).filter(tractObj => !isNaN(tractObj[demoVar]));
      console.log(rankedData);
      const demoMin = min(rankedData.map(tractObj => Number(tractObj[demoVar])));
      const demoMax = max(rankedData.map(tractObj => Number(tractObj[demoVar])));
    
      console.log(demoMin, demoMax);
      const xScale = scaleLinear()
        .domain([demoMin, demoMax])
        .range([0, width]);

      const yScale = scaleLinear()
        .domain([0, sortedData.length])
        .range([0, height]);

      const demoLine = line()
        .x(d => xScale(Number(d[demoVar])))
        .y(d => yScale(d.position));

      select(this.refs.svg)
        .selectAll('path')
        .data([rankedData])
        .join('path')
        .attr('class', 'line')
        .attr('d', demoLine)
        .style('stroke', 'darkgray')
        .style('fill', 'none');
      
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
          </svg>
        </div>
      );
    }
}