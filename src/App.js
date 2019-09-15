import React, { Component } from 'react';
import SelectionHelper from './utilities/selection.helper';
import MapContainer from './components/Map/MapContainer';
import DemoLine from './components/DemoLine';
import Controls from './components/Selector/Controls';
import attrData from './data/pa_attribute_data.csv';
import * as config from './utilities/config';
import BarsContainer from './components/Bars/BarsContainer';
import DataHelper from './utilities/data.helper';
import Bars from './components/Bars/Bars';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      race: config.initRace,
      date: config.initDate,
      demo: config.initDemo,
      demoChange: config.initDemoChange,
      marginVar: config.initMarginVar,
      barsVar: config.initBarsVar,
      marginData: null,
      demoData: null
    };
    this.toggleDemoChange = this.toggleDemoChange.bind(this);
    this.selectionHelper = new SelectionHelper();
    this.dataHelper = new DataHelper();
  }

  async componentDidMount() {
    const { marginVar, barsVar } = this.state;
    this.data = await this.dataHelper.processData(attrData);
    this.setState({
      marginData: this.data[marginVar],
      demoData: this.data[barsVar]
    });
  }

  componentDidUpdate() {}

  updateSelection(selection) {
    this.setState(selection, this.updateVars);
  }

  updateVars() {
    const { date, race, demo, demoChange } = this.state;
    const marginVar = this.selectionHelper.getMarginVar(date, race);
    const barsVar = this.selectionHelper.getBarsVar(demo, demoChange);
    this.setState({
      marginVar,
      barsVar,
      marginData: this.data[marginVar],
      demoData: this.data[barsVar]
    });
  }

  toggleDemoChange() {
    this.setState(prevState => ({
      demoChange: !prevState.demoChange
    }));
  }

  render() {
    console.log('render');
    return (
      <div className="app">
        <div className="left-column">
          <Controls
            setSelection={selection => this.updateSelection(selection)}
            toggleDemoChange={this.toggleDemoChange}
            raceOptions={config.raceOptions}
            dateOptions={config.dateOptions}
            demoOptions={config.demoOptions}
            demoChangeOptions={config.demoChangeOptions}
            race={this.state.race}
            date={this.state.date}
            demo={this.state.demo}
            demoChange={this.state.demoChange}
          />
          <MapContainer
            marginVar={this.state.marginVar}
            data={this.state.marginData}
          />
        </div>
        {/* <div>
            <DemoLine
              svgDimensions={[config.lineWidth, config.lineHeight]}
              demoData={(topojson.feature(this.state.data, this.state.data.objects.PA_CensusTracts_2010).features).map(geometry => geometry.properties)}
              demoVar={this.getDemoVar()}
            />
          </div> */}
        <div className="bars-container">
          {this.state.demoData && this.state.marginData && (
            <BarsContainer
              demoData={this.state.demoData}
              marginData={this.state.marginData}
              demoVar={this.state.barsVar}
              marginVar={this.state.marginVar}
            />
          )}
          {/* <BarsContainer
            dimensions={config.barsContainer}
            data={topojson
              .feature(
                this.state.geoData,
                this.state.geoData.objects.PA_CensusTracts_2010
              )
              .features.map(geometry => geometry.properties)}
            barsVar={this.state.barsVar}
            marginVar={this.state.marginVar}
          /> */}
        </div>
      </div>
    );
  }
}
