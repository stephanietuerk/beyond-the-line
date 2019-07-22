import React, { Component } from 'react';
import { getDemoVar, getMarginVar } from './utilities/selection.helper';
import MapContainer from './components/Map/MapContainer';
import DemoLine from './components/DemoLine';
// import BarsComponent from './components/BarsComponent';
import Controls from './components/Selector/Controls';
import geoData from './data/paTracts.json';
import geoLabels from './data/PA_Cities.json';
import * as config from './utilities/config';
import * as topojson from "topojson-client";
import BarsContainer from './components/Bars/BarsContainer';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      geoData: geoData,
      mapDate: config.initMapDate,
      mapRace: config.initMapRace,
      demoSelection: config.initDemoSelection,
      demoChange: config.initDemoChange,
      geoLabels: geoLabels
    };
    this.toggleDemoChange = this.toggleDemoChange.bind(this);
  }

  componentDidMount() {
    const { mapDate, mapRace, demoSelection, demoChange } = this.state;
    this.setState({
      marginVar: getMarginVar(mapDate, mapRace),
      demoVar: getDemoVar(demoSelection, demoChange),
      dataLoaded: true
    });
  }

  componentDidUpdate() {
  }

  setRace(race) {
    this.setState({
      mapRace: race,
    });
  }

  setYear(year) {
    this.setState({
      mapDate: year,
    });
  }

  setDemo(demo) {
    this.setState({
      demoSelection: demo,
    });
  }

  toggleDemoChange() {
    this.setState(prevState => ({
      demoChange: !prevState.demoChange,
    }));
  }
  
  render() {
    console.log(this.state.demoSelection, this.state.demoChange, this.state.mapRace, this.state.mapDate);    

    return (
      <div className='app'>
        <div className='left-column'>
        <Controls
            raceOptions = {config.raceOptions}
            setRace = {race => this.setRace(race)}
            raceSelection = {this.state.race}
            yearOptions = {config.yearOptions}
            setYear = {year => this.setYear(year)}
            yearSelection = {this.state.year}
            demoOptions = {config.demoOptions}
            setDemo = {demo => this.setDemo(demo)}
            demoSelection = {this.state.demo}
            demoChangeOptions = {config.demoChangeOptions}
            toggleDemoChange = {this.toggleDemoChange}
            demoChangeSelection = {this.state.demoChange}
          />
          <MapContainer
            svgDimensions={[config.mapWidth, config.mapHeight]}
            geoData={this.state.geoData}
            geoLabels={this.state.geoLabels}
            marginVar={this.state.marginVar}
          />
        </div>
        <div className='controls'>
          
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
            demoData={(topojson.feature(this.state.geoData, this.state.geoData.objects.PA_CensusTracts_2010).features).map(geometry => geometry.properties)}
            demoVar={this.state.demoVar}
            marginVar={this.state.marginVar}
          />
        </div>
      </div>
    );
  }
}

