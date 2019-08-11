import React, { PureComponent } from 'react';
import ButtonSelector from './ButtonSelector';

export default class Controls extends PureComponent {

    render() {
      const raceSelector = () => (
        <div>
          <ButtonSelector
            buttonClass={'race'}
            buttonVals={this.props.raceOptions}
            setSelection={value => this.props.setSelection({ race: value })}
            selected={this.props.race}
          />
        </div>
      );

      const dateSelector = () => (
        <div>
          <ButtonSelector
            buttonClass={'date'}
            buttonVals={this.props.dateOptions}
            setSelection={value => this.props.setSelection({ date: value })}
            selected={this.props.date}
          />
        </div>
      );

      const demoSelector = () => (
        <div>
          <ButtonSelector
            buttonClass={'demo'}
            buttonVals={this.props.demoOptions}
            setSelection={value => this.props.setSelection({ demo: value })}
            selected={this.props.demo}
          />
        </div>
      );

      const demoChangeSelector = () => (
        <div>
          <button
            key={this.props.demoChangeOptions.value}
            className={this.props.demoChange ? 'button button-active demo-change' : 'button button-inactive demo-change'}
            onClick={this.props.toggleDemoChange}
          >
            {this.props.demoChangeOptions.displayText}
          </button>
        </div>
      );

      return (
        <div className = 'selector-controls'>
          {raceSelector()}
          {dateSelector()}
          {demoSelector()}
          {demoChangeSelector()}
        </div>
      );
    }
}