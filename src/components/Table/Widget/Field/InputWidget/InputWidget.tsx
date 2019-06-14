import React, { Component } from 'react';
import { ActionClickWidget, IPropsWidgets } from '../../Widget';
import { TextAlignProperty } from 'csstype';

interface IProps extends IState, ActionClickWidget, IPropsWidgets {
  textAlign?: string;
  onChange?(rowIndex: number,
            columnIndex: number,
            newValue: string | boolean | number):void
}

interface IState {
  value?: string;
}

class InputWidget extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const disable = this.props.disable;

    return (
      <input
        style={{
          ...this.getStyle(this.props.isValid!)
        }}
        disabled={disable}
        value={this.props.value}
        onChange={this.onChange}
      />
    );
  }

  getStyle = (isValid: boolean) => {
    return {
      textAlign: this.getTextAlign(),
      width: '99%',
      border: 'none',
      fontSize: '12px',
      color: isValid ? 'Black' : '#f73636 ',
      backgroundColor: 'transparent',
      padding: '0px 10px'
    };
  };

  private getTextAlign() {
    const supported: TextAlignProperty[] = [
      '-moz-initial',
      'inherit',
      'initial',
      'revert',
      'unset',
      'center',
      'end',
      'justify',
      'left',
      'match-parent',
      'right',
      'start'
    ];

    const textAlign = supported.find(
      (x: TextAlignProperty) => x === this.props.textAlign
    );
    return textAlign ? textAlign : 'center';
  }

  onChange = (e: any) => {
    this.props.onClick(this.props.row, this.props.column, e.target.value);
    if(this.props.onChange){
      this.props.onChange(this.props.row, this.props.column, e.target.value)
    }
  };
}

export default InputWidget;
