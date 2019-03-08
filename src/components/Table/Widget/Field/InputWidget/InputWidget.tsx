import React, { Component } from 'react';
import { ActionClickWidget, IPropsWidgets } from '../../Widget';

interface IProps extends IState, ActionClickWidget, IPropsWidgets {
  onChange?: (value: string) => void;

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
        style={{ textAlign: 'center', ...this.getStyle(this.props.isValid!) }}
        disabled={disable}
        value={this.props.value}
        onChange={this.onChange}
      />


    );
  }

  getStyle = (isValid: boolean) => {

    return {
      width: '99%',
      border: 'none',
      fontSize: '12px',
      fontFamily: 'Segoe UI',
      color: isValid ? 'Black' : '#f73636 ',
      backgroundColor: 'transparent'
    };


  };
  onChange = (e: any) => {
    this.props.onClick(this.props.row, this.props.column, e.target.value);
  };
}

export default InputWidget;
