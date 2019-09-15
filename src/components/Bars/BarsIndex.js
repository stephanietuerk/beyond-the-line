import React, { PureComponent } from 'react';
import * as d3 from 'd3';
import ColorsHelper from '../../utilities/colors.helper';
import * as config from '../../utilities/config';

export default class BarsIndex extends PureComponent {
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
    const yScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([0, data.length]);

    return yScale;
  }

  draw() {
    const g = this.refs.barsIndexG;
    const { marginVar, data } = this.props;

    const yScale = this.getScales();

    const brush = d3
      .brushY()
      .extent([[-10, 0], [config.barsIndex.width + 10, data.length]])
      .on('brush end', this.brushed);

    d3.select(g)
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', (d, i, n) => yScale(i))
      .attr('height', 1)
      .attr('x', 0)
      .attr('width', config.barsIndex.width)
      .style('fill', d => {
        return this.colorsHelper.getBarsColor(d.marginVal, marginVar);
      });

    d3.select(g)
      .append('g')
      .attr('class', 'brush')
      .call(brush)
      .call(brush.move, [70, data.length - 200]);
  }

  updateBars() {
    const g = this.refs.barsIndexG;
    const t = d3.transition().duration(750);
    const { marginVar, data } = this.props;

    const yScale = this.getScales();

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
      .attr('x', 0)
      .attr('width', config.barsIndex.width)
      .style('fill', d => {
        return this.colorsHelper.getBarsColor(d.marginVal, marginVar);
      });

    bars.transition(t).style('fill', d => {
      return this.colorsHelper.getBarsColor(d.marginVal, marginVar);
    });

    d3.select('.brush').raise();
  }

  render() {
    console.log('bi render');
    const offset = `translate(${config.barsIndex.margin.left}, ${config.barsIndex.margin.top})`;
    const g = this.refs.barsIndexG;
    // const zoomTransform = this.props.zoomTransform;
    return (
      <>
        <g
          // transform={zoomTransform}
          transform={offset}
          ref="barsIndexG"
        ></g>
        {/* <BarsIndexBrush
          node={g}
          dimensions={dimensions}
        /> */}
      </>
    );
  }
}
