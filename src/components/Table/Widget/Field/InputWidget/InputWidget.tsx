import React, { Component } from 'react';
import { ActionClickWidget, IPropsWidgets } from '../../Widget';

interface IProps extends IState, ActionClickWidget , IPropsWidgets{
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
        style={{ textAlign: 'center', ...this.getStyle(disable) }}
        disabled={disable}
        value={this.props.value}
        onChange={this.onChange}
      />


    );
  }

  getStyle = (disable: boolean) => {

    const style = {
      width: '99%',
      border: 'none',
      fontSize: '12px',
      fontFamily: 'Segoe UI',
      color: 'black'

    };
    return disable ? { backgroundColor: 'white', ...style } : style;


  };
  onChange = (e: any) => {
    console.log(e.target.value);
    this.props.onClick(this.props.row, this.props.column, e.target.value);
  };
}

export default InputWidget;
