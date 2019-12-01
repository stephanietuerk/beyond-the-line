import React, { PureComponent } from 'react';
import '../../styles/App.scss';
import * as d3 from 'd3';
import Bars from './Bars';
import BarsIndex from './BarsIndex';
import * as config from '../../utilities/config';
import BarsDataHelper from './bars-data.helper';

export default class BarsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      zoomLevel: 5
    };
    // this.createChart = this.createChart.bind(this);
    this.zoom = d3
      .zoom()
      .scaleExtent([1, 5])
      // .translateExtent([0, 0], [width, height])
      // .extent([[0, 0], [width, height]])
      .on('zoom', this.zoomed.bind(this));
    this.barsDataHelper = new BarsDataHelper();
  }

  componentDidMount() {
    this.makeZoomDataObj();
    this.getDataForSelection();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDataForSelection();
    }
  }

  makeZoomDataObj() {
    const obj = {};
    const marginVars = [];
    const demoVars = [];
    config.dataOptions.forEach(obj => {
      if (obj.rawVal.includes('MARGIN')) {
        marginVars.push(obj.val);
      } else {
        demoVars.push(obj.val);
      }
    });
    d3.range(config.barsZoomLevels).forEach(zl => {
      obj[`level${zl + 1}`] = {};
      demoVars.forEach(demo => {
        obj[`level${zl + 1}`][demo] = {};
        marginVars.forEach(margin => {
          obj[`level${zl + 1}`][demo][margin] = [];
        });
      });
    });
    this.zoomData = obj;
  }

  getDataForSelection() {
    // add make data for Level 5
    const { demoData, marginData, demoVar, marginVar } = this.props;
    if (
      this.zoomData[`level${this.state.zoomLevel}`][demoVar][marginVar]
        .length === 0
    ) {
      const sortedData = this.barsDataHelper.orderMarginDataByDemo(
        demoData,
        marginData
      );
      const filteredData = this.barsDataHelper.filterByZoom(
        sortedData,
        this.state.zoomLevel
      );
      this.zoomData[`level${this.state.zoomLevel}`][demoVar][
        marginVar
      ] = filteredData;
    }
    this.setState({
      barsData: this.zoomData[`level${this.state.zoomLevel}`][demoVar][
        marginVar
      ]
    });
  }

  zoomed() {
    this.setState({});
  }

  render() {
    const dimensions = config.barsContainer;
    const offset = `translate(${dimensions.margin.left}, ${dimensions.margin.top})`;

    return (
      <div>
        <svg width={dimensions.width} height={dimensions.height} ref="svg">
          <g transform={offset}>
            {this.state.barsData && (
              <Bars
                data={this.state.barsData}
                demoVar={this.props.demoVar}
                marginVar={this.props.marginVar}
              />
            )}
            {this.state.barsData && (
              <BarsIndex
                data={this.state.barsData}
                marginVar={this.props.marginVar}
              />
            )}
          </g>
        </svg>
      </div>
    );
  }
}
