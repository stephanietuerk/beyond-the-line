import React, { PureComponent } from 'react';
import '../../styles/App.scss';

export default class ButtonGroup extends PureComponent {
  render() {
    const buttonGroup = this.props.buttonVals.map(val => (
      <button
        key={val.value}
        className={
          this.props.selected === val.value
            ? `button button-active ${this.props.buttonClass}`
            : `button button-inactive ${this.props.buttonClass}`
        }
        onClick={() => this.props.setSelection(val.value)}
      >
        {val.displayText}
      </button>
    ));

    return (
      <div className={`button-group ${this.props.buttonClass}`}>
        {buttonGroup}
      </div>
    );
  }
}
