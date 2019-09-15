import { chunk } from 'lodash';

export default class BarsDataHelper {
  getAvgProperty(arr, property) {
    return (
      arr.reduce((acc, curr) => acc + Number(curr[`${property}`]), 0) /
      arr.length
    );
  }

  sortData(data, barsVar, removeNan) {
    const sortedData = data.sort((a, b) => {
      if (!isFinite(a[barsVar] && !isFinite(b[barsVar]))) {
        return 0;
      } else if (!isFinite(a[barsVar])) {
        return 1;
      } else if (!isFinite(b[barsVar])) {
        return -1;
      }
      return +b[barsVar] > +a[barsVar] ? 1 : +b[barsVar] < +a[barsVar] ? -1 : 0;
    });

    return !removeNan
      ? sortedData
      : sortedData.filter(tractObj => !isNaN(tractObj[barsVar]));
  }

  sortAndChunkData(data, combineVal, barsVar, removeNan) {
    const sortedData = this.sortData(data, barsVar, removeNan);
    return chunk(sortedData, combineVal);
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
        marginVal: this.getAvgProperty(chunk, 'marginVal')
      };
    });
    return newData;
  }
}
