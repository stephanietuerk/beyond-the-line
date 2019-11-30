import React, { PureComponent } from 'react';
import * as d3 from 'd3';
import ColorsHelper from '../../utilities/colors.helper';
import * as config from '../../utilities/config';
import BarsDataHelper from './bars-data.helper';

export default class Bars extends PureComponent {
  constructor(props) {
    super(props);
    this.colorsHelper = new ColorsHelper();
    this.barsDataHelper = new BarsDataHelper();
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.setScalesAndAxes(this.draw);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setScalesAndAxes(this.update);
    }
  }

  setScalesAndAxes(makeChart) {
    const data = this.props.data;
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.demoVal))
      .range([0, config.bars.width]);

    this.xScale = xScale;

    this.yScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([0, data.length]);

    const quantileVals = this.barsDataHelper.getQuantileVals(
      data.map(obj => obj.demoVal)
    );

    this.barsYQuantiles = d3
      .scalePoint()
      .domain(quantileVals)
      .range([0, config.bars.height]);

    this.barsXAxisTop = d3.axisTop(xScale);

    makeChart();
  }

  draw() {
    const g = this.refs.barsG;
    const { data, marginVar } = this.props;

    const bars = d3
      .select(g)
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', (d, i, n) => this.yScale(i))
      .attr('height', 1)
      .attr('x', d => {
        return this.xScale(Math.min(0, d.demoVal));
      })
      .attr('width', d => {
        return Math.abs(this.xScale(d.demoVal) - this.xScale(0));
      })
      .style('fill', d => {
        return this.colorsHelper.getBarsColor(d.marginVal, marginVar);
      });

    d3.select(g).call(this.barsXAxisTop);
  }

  update() {
    const g = this.refs.barsG;
    const t = d3.transition().duration(750);
    const { marginVar, data } = this.props;

    const bars = d3
      .select(g)
      .selectAll('.bar')
      .data(data);

    bars.exit().remove();

    bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', (d, i, n) => this.yScale(i))
      .attr('height', 1)
      .attr('x', d => {
        return this.xScale(Math.min(0, d.demoVal));
      })
      .attr('width', d => {
        return Math.abs(this.xScale(d.demoVal) - this.xScale(0));
      })
      .style('fill', d => {
        return this.colorsHelper.getBarsColor(d.marginVal, marginVar);
      });

    bars
      .transition(t)
      .attr('x', d => {
        return this.xScale(Math.min(0, d.demoVal));
      })
      .attr('width', d => {
        return Math.abs(this.xScale(d.demoVal) - this.xScale(0));
      })
      .style('fill', d => {
        return this.colorsHelper.getBarsColor(d.marginVal, marginVar);
      });

    d3.select(g).call(this.barsXAxisTop);
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
