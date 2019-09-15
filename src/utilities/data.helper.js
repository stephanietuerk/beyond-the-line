import { csv } from 'd3-fetch';
import * as config from './config';

export default class DataHelper {
  async processData(attrData) {
    const data = await csv(attrData);
    const processedData = {};

    config.dataOptions.forEach(obj => {
      processedData[obj.val] = {};
    });

    data.forEach(d => {
      config.dataOptions.forEach(obj => {
        processedData[obj.val][d.GEO_ID] = +d[obj.rawVal];
      });
    });

    return processedData;
  }
}
