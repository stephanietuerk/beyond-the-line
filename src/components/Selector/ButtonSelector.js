import React, { PureComponent } from 'react';

export default class ButtonSelector extends PureComponent {
  render() {
    const buttonGroup = (this.props.buttonVals).map(val => (
      <button
        key={val.value}
        className={this.props.selected === val.value ? `button button-active ${ this.props.buttonClass }` : `button button-inactive ${ this.props.buttonClass }`}
        onClick={() => this.props.setSelection(val.value)}
        >
        {val.displayText}
      </button>
    ));

    return (
      <div className={`btn-group ${ this.props.buttonClass }`}>
        {buttonGroup}
      </div>
    );
  }
}