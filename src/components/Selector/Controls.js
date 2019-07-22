import React, { PureComponent } from 'react';
import ButtonSelector from './ButtonSelector';

export default class Controls extends PureComponent {

    render() {
      const raceSelector = () => (
        <div>
          <ButtonSelector
            buttonClass={'race'}
            buttonVals={this.props.raceOptions}
            setSelection={race => this.props.setRace(race)}
            selected={this.props.raceSelection}
          />
        </div>
      );

      const yearSelector = () => (
        <div>
          <ButtonSelector
            buttonClass={'year'}
            buttonVals={this.props.yearOptions}
            setSelection={year => this.props.setYear(year)}
            selected={this.props.yearSelection}
          />
        </div>
      );

      const demoSelector = () => (
        <div>
          <ButtonSelector
            buttonClass={'demo'}
            buttonVals={this.props.demoOptions}
            setSelection={demo => this.props.setDemo(demo)}
            selected={this.props.demoSelection}
          />
        </div>
      );

      const demoChangeSelector = () => (
        <div>
          <button
            key={this.props.demoChangeOptions}
            className={this.props.demoChangeSelection ? 'btn btn-active demo-change' : 'btn btn-inactive demo-change'}
            onClick={this.props.toggleDemoChange}
          >
            {'change 2010-2015'}
          </button>
        </div>
      );

      return (
        <div className = 'button-controls'>
          {raceSelector()}
          {yearSelector()}
          {demoSelector()}
          {demoChangeSelector()}
        </div>
      );
    }
}