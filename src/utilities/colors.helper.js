import * as config from './config';
import * as d3 from 'd3';

export default class ColorsHelper { 
  getColor(val, marginVar) {
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
}