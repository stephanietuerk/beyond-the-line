import React, { Component } from 'react';
import SelectionHelper from './utilities/selection.helper';
import MapContainer from './components/Map/MapContainer';
import DemoLine from './components/DemoLine';
import Controls from './components/Selector/Controls';
import geoData from './data/paTracts_sm.json';
import geoLabels from './data/PA_Cities.json';
import * as config from './utilities/config';
import * as topojson from "topojson-client";
import BarsContainer from './components/Bars/BarsContainer';
import { noConflict } from 'q';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      geoData: geoData,
      race: config.initRace,
      date: config.initDate,
      demo: config.initDemo,
      demoChange: config.initDemoChange,
      marginVar: config.initMarginVar,
      barsVar: config.initBarsVar,
      geoLabels: geoLabels,
      dataLoaded: false
    };
    this.toggleDemoChange = this.toggleDemoChange.bind(this);
    this.selectionHelper = new SelectionHelper;
  }

  componentDidMount() {
    this.setState({
      dataLoaded: true
    });
  }

  componentDidUpdate() {
  }

  updateSelection(selection) {
    this.setState(selection, this.updateVars);
  }

  updateVars() {
    const { date, race, demo, demoChange } = this.state;
    this.setState({
      marginVar: this.selectionHelper.getMarginVar(date, race),
      barsVar: this.selectionHelper.getBarsVar(demo, demoChange)
    });
  }

  toggleDemoChange() {
    this.setState(prevState => ({
      demoChange: !prevState.demoChange,
    }));
  }
  
  render() {
      return (
        <div className='app'>
          <div className='left-column'>
            <Controls
              setSelection = {selection => this.updateSelection(selection)}
              toggleDemoChange = {this.toggleDemoChange}
              raceOptions = {config.raceOptions}
              dateOptions = {config.dateOptions}
              demoOptions = {config.demoOptions}
              demoChangeOptions = {config.demoChangeOptions}
              race = {this.state.race}
              date = {this.state.date}
              demo = {this.state.demo}
              demoChange = {this.state.demoChange}
            />
            <MapContainer
              svgDimensions={[config.mapWidth, config.mapHeight]}
              geoData={this.state.geoData}
              geoLabels={this.state.geoLabels}
              marginVar={this.state.marginVar}
            />
          </div>
          {/* <div>
            <DemoLine
              svgDimensions={[config.lineWidth, config.lineHeight]}
              demoData={(topojson.feature(this.state.data, this.state.data.objects.PA_CensusTracts_2010).features).map(geometry => geometry.properties)}
              demoVar={this.getDemoVar()}
            />
          </div> */}
          <div className='bars-container'>
            <BarsContainer
              svgDimensions={[config.barsWidth, config.barsHeight]}
              margin={config.barsContainerMargin}
              barsData={(topojson.feature(this.state.geoData, this.state.geoData.objects.PA_CensusTracts_2010).features).map(geometry => geometry.properties)}
              barsVar={this.state.barsVar}
              marginVar={this.state.marginVar}
            />
          </div>
        </div>
        );
      }
}


