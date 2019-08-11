import React, { PureComponent } from 'react';
import * as d3 from 'd3';
import { min, max, histogram } from 'd3-array';
import * as config from '../../utilities/config';
import { chunk } from 'lodash';

export default class Bars extends PureComponent {
    
    
    constructor(props) {
        super(props);
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
            return changeColorRed(val);
          }
          else {
            return voteColorRed(val);
            }
          } 
        else if (val < 0) {
          if (marginVar.includes('CHANGE')) {
            return changeColorBlue(val);
          }
          else {
            return voteColorBlue(val);
          }
        }
      }
    }

    getAvgProperty(arr, property) {
      return arr.reduce((acc, curr) => acc + Number(curr[`${property}`]), 0)/arr.length;
    }

    draw() {
      const barsG = this.refs.barsG;
      const { barsVar, marginVar, svgDimensions } = this.props;
      const [width, height] = svgDimensions;
      const sortedData = this.sortData().filter(tractObj => !isNaN(tractObj[barsVar]));
      // const rankedData = this.rankData(sortedData);
      // const prunedData = this.pruneData(sortedData);
      const demoMin = d3.min(sortedData.map(tractObj => Number(tractObj[barsVar])));
      const demoMax = d3.max(sortedData.map(tractObj => Number(tractObj[barsVar])));

      const combineVal = 5;
      const dataChunks = chunk(sortedData, combineVal);

      const xScale = d3.scaleLinear()
        .domain([demoMin, demoMax])
        .range([0, width]);

      const yScale = d3.scaleLinear()
        .domain([0, dataChunks.length])
        .range([0, dataChunks.length]);

      d3.select(barsG)
        .selectAll('.bar')
        .data(dataChunks)
        // .data(prunedData)
        .join('rect')
        .attr('class', 'bar')
        .attr('y', (d, i, n) => yScale(i))
        .attr('height', 1)
        .attr('x', d => {
          return xScale(Math.min(0, this.getAvgProperty(d, barsVar)));
        })
        .attr('width', d => {
          // const avg = d.reduce((curr, acc) => curr[barsVar] + acc)/d.length;
          const avgWidth = Math.abs(xScale(this.getAvgProperty(d, barsVar))-xScale(0));
          // const toReturn = Math.abs(xScale(d[barsVar])-xScale(0));
          return avgWidth;
        })
        .style('fill', d => {
          // const avg = d.reduce((curr, acc) => curr[marginVar] + acc)/d.length;
          return this.getColor(this.getAvgProperty(d, marginVar));
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