import * as config from './config';
import * as d3 from 'd3';

export default class ColorsHelper {
  getBarsColor(val, marginVar) {
    const voteColorRed = d3
      .scaleLinear()
      .domain([0, 1])
      .range(config.voteRedRange);
    const voteColorBlue = d3
      .scaleLinear()
      .domain([-1, 0])
      .range(config.voteBlueRange);
    const changeColorRed = d3
      .scaleLinear()
      .domain([0, 0.5])
      .range(config.changeRedRange);
    const changeColorBlue = d3
      .scaleLinear()
      .domain([-0.5, 0])
      .range(config.changeBlueRange);

    if (isNaN(val)) {
      return config.initialColor;
    } else {
      if (val >= 0) {
        if (marginVar.includes('Change')) {
          return changeColorRed(val);
        } else {
          return voteColorRed(val);
        }
      } else if (val < 0) {
        if (marginVar.includes('Change')) {
          return changeColorBlue(val);
        } else {
          return voteColorBlue(val);
        }
      }
    }
  }

  getMapColor(d, marginVar) {
    const voteColorRed = d3
      .scaleLinear()
      .domain([0, 1])
      .range(['#f8e5e6', '#dd0035']);
    const voteColorBlue = d3
      .scaleLinear()
      .domain([-1, 0])
      .range(['#3c5bff', '#d2e4ff']);
    const changeColorRed = d3
      .scaleLinear()
      .domain([0, 0.5])
      .range(['#f8e5e6', '#dd0035']);
    const changeColorBlue = d3
      .scaleLinear()
      .domain([-0.5, 0])
      .range(['#3c5bff', '#e6f0ff']);

    if (isNaN(d)) {
      return config.initialColor;
    } else {
      if (d >= 0) {
        if (marginVar.includes('CHANGE')) {
          return changeColorRed(d);
        } else {
          return voteColorRed(d);
        }
      }
      if (d < 0) {
        if (marginVar.includes('CHANGE')) {
          return changeColorBlue(d);
        } else {
          return voteColorBlue(d);
        }
      }
    }
  }
}
