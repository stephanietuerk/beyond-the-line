import React, { PureComponent } from 'react';
import ButtonGroup from './ButtonGroup';
import '../../styles/App.scss';

export default class SelectorControls extends PureComponent {
  render() {
    const raceSelector = () => (
      <ButtonGroup
        buttonClass={'race'}
        buttonVals={this.props.raceOptions}
        setSelection={value => this.props.setSelection({ race: value })}
        selected={this.props.race}
      />
    );

    const dateSelector = () => (
      <ButtonGroup
        buttonClass={'date'}
        buttonVals={this.props.dateOptions}
        setSelection={value => this.props.setSelection({ date: value })}
        selected={this.props.date}
      />
    );

    const demoSelector = () => (
      <ButtonGroup
        buttonClass={'demo'}
        buttonVals={this.props.demoOptions}
        setSelection={value => this.props.setSelection({ demo: value })}
        selected={this.props.demo}
      />
    );

    const demoChangeSelector = () => (
      <div className="button-group">
        <button
          key={this.props.demoChangeOptions.value}
          className={
            this.props.demoChange
              ? 'button button-active demo-change'
              : 'button button-inactive demo-change'
          }
          onClick={this.props.toggleDemoChange}
        >
          {this.props.demoChangeOptions.displayText}
        </button>
      </div>
    );

    return (
      <div className="selector-controls">
        {raceSelector()}
        {dateSelector()}
        {demoSelector()}
        {demoChangeSelector()}
      </div>
    );
  }
}
