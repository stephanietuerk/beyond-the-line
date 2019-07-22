import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import { min, max, histogram } from 'd3-array';
import * as config from '../../utilities/config';
import { chunk } from 'lodash';

export default class Bars extends Component {
    
    
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

    getColor(val) {
      const marginVar = this.props.marginVar;
      const voteColorRed = d3.scaleLinear()
        .domain([0,1])
        .range(config.voteRedRange);
      const voteColorBlue = d3.scaleLinear()
        .domain([-1,0])
        .range(config.voteBlueRange);
      const changeColorRed = d3.scaleLinear()
        .domain([0,.5])
        .range(config.changeRedRange);
      const changeColorBlue = d3.scaleLinear()
        .domain([-0.5,0])
        .range(config.changeBlueRange);
        
      if (isNaN(val)) {
        return config.initialColor;
      }
      else {
        if (val >= 0) {
          if (marginVar.includes('CHANGE')) {
            return changeColorRed(val)
          }
          else {
            return voteColorRed(val);
            }
          } 
        if (val < 0) {
          if (marginVar.includes('CHANGE')) {
            return changeColorBlue(val);
          }
          else {
            return voteColorBlue(val);
          }
        }
      }
    }

    createChart() {
      const barsG = this.refs.barsG;
      const { demoVar, marginVar, svgDimensions } = this.props;
      const [width, height] = svgDimensions;
      const sortedData = this.sortData();
      console.log(demoVar, this.props.marginVar);
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
        .domain([0, rankedData.length])
        .range([0, height]);

      // const bins = histogram()
      //   .domain([0,1])
      //   .thresholds(600);

      // const binnedData = bins(rankedData.map(d => d[marginVar]));
      // console.group(binnedData);
      const combineVal = 6;

      d3.select(barsG)
        .selectAll('.bar')
        .data(sortedData)
        // .data(chunk(rankedData, combineVal))
        .join('rect')
        .attr('class', 'bar')
        .attr('y', (d, i, n) => yScale(i))
        .attr('height', 1)
        .attr('x', d => xScale(Math.min(0, d[demoVar])))
        .attr('width', d => {
          // console.log(d);
          // const avg = d.reduce((curr, acc) => curr[demoVar] + acc)/d.length;
          return Math.abs(xScale(d[demoVar])-xScale(0));
        })
        .style('fill', d => {
          // const avg = d.reduce((curr, acc) => curr[marginVar] + acc)/d.length;
          return this.getColor(d[marginVar]);
        });
    }

    render() {
      const zoomTransform = this.props.zoomTransform;
      return (         
        <g 
          transform={zoomTransform}
          ref='barsG'
        >
        </g>
      );
    }

}