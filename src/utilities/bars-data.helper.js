import { chunk } from 'lodash';
import * as d3 from 'd3';
import * as config from './config';

export default class BarsDataHelper {
  getAvgProperty(arr, property) {
    return (
      arr.reduce((acc, curr) => acc + Number(curr[`${property}`]), 0) /
      arr.length
    );
  }

  sortDataObj(data, removeNan, valueName) {
    const dataArr = Object.entries(data).map(([key, val]) => {
      const obj = { geoId: key };
      obj[valueName] = val;
      return obj;
    });
    const sortedData = dataArr.sort((a, b) => {
      if (!isFinite(a[valueName]) && !isFinite(b[valueName])) {
        return 0;
      } else if (!isFinite(a[valueName])) {
        return 1;
      } else if (!isFinite(b[valueName])) {
        return -1;
      }
      return b[valueName] > a[valueName]
        ? 1
        : b[valueName] < a[valueName]
        ? -1
        : 0;
    });
    return !removeNan
      ? sortedData
      : sortedData.filter(tractObj => !isNaN(tractObj[valueName]));
  }

  orderMarginDataByDemo(demoData, marginData) {
    const sortedDemoData = this.sortDataObj(demoData, true, 'demoVal');
    sortedDemoData.forEach(obj => {
      obj['marginVal'] = marginData[obj.geoId];
    });
    return sortedDemoData;
  }

  filterByZoom(data, zoomLevel) {
    const chunks = chunk(data, zoomLevel);
    const newData = chunks.map(chunk => {
      return {
        demoVal: this.getAvgProperty(chunk, 'demoVal'),
        marginVal: this.getAvgProperty(chunk, 'marginVal'),
        geoIds: chunk.map(obj => obj.geoId)
      };
    });
    return newData;
  }

  getQuantileVals(data) {
    return d3.range(config.numBarQuantiles + 1).map(num => {
      return d3.quantile(data, num / config.numBarQuantiles);
    });
  }

  formatQuantileValues(vals, demoVar) {
    const format =
      demoVar.includes('Change') ||
      demoVar === 'nonWhite' ||
      demoVar === 'unemployment' ||
      demoVar === 'collge'
        ? d3.format('.0%')
        : demoVar === 'income'
        ? d3.format('$2f')
        : d3.format('.1f');
  }
}
