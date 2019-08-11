import React, { PureComponent } from 'react';
import * as d3 from 'd3';
import { chunk } from 'lodash';
import ColorsHelper from '../../utilities/colors.helper';
import Bars from './Bars';

export default class BarsIndex extends Bars {
  
  draw() {
    const g = this.refs.barsIndexG;
    const { barsVar, marginVar, dimensions } = this.props;
    const sortedData = this.sortData().filter(tractObj => !isNaN(tractObj[barsVar]));

    const combineVal = 5;
    const dataChunks = chunk(sortedData, combineVal);

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
      .attr('x', 0)
      .attr('width', dimensions.width)
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
        ref='barsIndexG'
      >
      </g>
    );
  }
}