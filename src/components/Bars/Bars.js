import React, { PureComponent } from 'react';
import * as d3 from 'd3';
import * as config from '../../utilities/config';
import { chunk } from 'lodash';
import ColorsHelper from '../../utilities/colors.helper';

export default class Bars extends PureComponent {
    
    constructor(props) {
        super(props);
        this.colorsHelper = new ColorsHelper;
        this.draw = this.draw.bind(this);
    }
    
    componentDidMount() {
    }

    componentDidUpdate() {
        this.draw();
    }

    sortData() {
      const { barsData, barsVar } = this.props;
      const sorted = barsData.sort((a, b) => {
    		if(!isFinite(a[barsVar] && !isFinite(b[barsVar]))) {
			    return 0;
		    } else if (!isFinite(a[barsVar]) ) {
          return 1;
        } else if (!isFinite(b[barsVar]) ) {
	        return -1;
        }
		    return +b[barsVar] > +a[barsVar] ? 1 : +b[barsVar] < +a[barsVar] ? -1 : 0;
      });
      return sorted;
    }

    rankData(sortedData) {
      return sortedData.map((tractObj, i) => {
        tractObj.position = i;
        return tractObj;
      });
    }

    pruneData(sortedData) {
      const prunedData = [];
      const delta = 6;
      let i;
      for (i = 0; i < sortedData.length; i=i+delta) {
        prunedData.push(sortedData[i]);
      }
      return prunedData;
    }

    getAvgProperty(arr, property) {
      return arr.reduce((acc, curr) => acc + Number(curr[`${property}`]), 0)/arr.length;
    }

    draw() {
      const g = this.refs.barsG;
      const { barsVar, marginVar, dimensions } = this.props;
      const sortedData = this.sortData().filter(tractObj => !isNaN(tractObj[barsVar]));
      // const rankedData = this.rankData(sortedData);
      // const prunedData = this.pruneData(sortedData);
      const demoMin = d3.min(sortedData.map(tractObj => Number(tractObj[barsVar])));
      const demoMax = d3.max(sortedData.map(tractObj => Number(tractObj[barsVar])));

      const combineVal = 5;
      const dataChunks = chunk(sortedData, combineVal);

      const xScale = d3.scaleLinear()
        .domain([demoMin, demoMax])
        .range([0, dimensions.width]);

      const yScale = d3.scaleLinear()
        .domain([0, dataChunks.length])
        .range([0, dataChunks.length]);

      d3.select(g)
        .selectAll('.bar')
        .data(dataChunks)
        .join('rect')
        .attr('class', 'bar')
        .attr('y', (d, i, n) => yScale(i))
        .attr('height', 1)
        .attr('x', d => {
          return xScale(Math.min(0, this.getAvgProperty(d, barsVar)));
        })
        .attr('width', d => {
          return Math.abs(xScale(this.getAvgProperty(d, barsVar))-xScale(0));
        })
        .style('fill', d => {
          return this.colorsHelper.getColor(this.getAvgProperty(d, marginVar), marginVar);
        });
    }

    render() {
      const dimensions = this.props.dimensions;
      const offset = `translate(${dimensions.margin.left}, ${dimensions.margin.top})`;
      // const zoomTransform = this.props.zoomTransform;
      return (         
        <g 
          // transform={zoomTransform}
          transform={offset}
          ref='barsG'
        >
        </g>
      );
    }

}