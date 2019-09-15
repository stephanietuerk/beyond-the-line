import React, { PureComponent } from 'react';
import * as d3 from 'd3';
import ColorsHelper from '../../utilities/colors.helper';
import * as config from '../../utilities/config';

export default class Bars extends PureComponent {
  constructor(props) {
    super(props);
    this.colorsHelper = new ColorsHelper();
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.updateBars();
    }
  }

  getScales() {
    const data = this.props.data;
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.demoVal))
      .range([0, config.bars.width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([0, data.length]);

    return [xScale, yScale];
  }

  draw() {
    const g = this.refs.barsG;
    const { data, marginVar } = this.props;

    const [xScale, yScale] = this.getScales();

    d3.select(g)
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', (d, i, n) => yScale(i))
      .attr('height', 1)
      .attr('x', d => {
        return xScale(Math.min(0, d.demoVal));
      })
      .attr('width', d => {
        return Math.abs(xScale(d.demoVal) - xScale(0));
      })
      .style('fill', d => {
        return this.colorsHelper.getBarsColor(d.marginVal, marginVar);
      });
  }

  updateBars() {
    const g = this.refs.barsG;
    const t = d3.transition().duration(750);
    const { marginVar, data } = this.props;

    const [xScale, yScale] = this.getScales();

    const bars = d3
      .select(g)
      .selectAll('.bar')
      .data(data);

    bars.exit().remove();

    bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', (d, i, n) => yScale(i))
      .attr('height', 1)
      .attr('x', d => {
        return xScale(Math.min(0, d.demoVal));
      })
      .attr('width', d => {
        return Math.abs(xScale(d.demoVal) - xScale(0));
      })
      .style('fill', d => {
        return this.colorsHelper.getBarsColor(d.marginVal, marginVar);
      });

    bars
      .transition(t)
      .attr('x', d => {
        return xScale(Math.min(0, d.demoVal));
      })
      .attr('width', d => {
        return Math.abs(xScale(d.demoVal) - xScale(0));
      })
      .style('fill', d => {
        return this.colorsHelper.getBarsColor(d.marginVal, marginVar);
      });
  }

  render() {
    const offset = `translate(${config.bars.margin.left}, ${config.bars.margin.top})`;
    // const zoomTransform = this.props.zoomTransform;
    return (
      <g
        // transform={zoomTransform}
        transform={offset}
        ref="barsG"
      ></g>
    );
  }
}
