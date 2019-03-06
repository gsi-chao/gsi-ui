import React, { Component } from 'react';
import { ActionClickWidget, IPropsWidgets } from '../../Widget';
import { Checkbox } from '@blueprintjs/core';
import { CheckboxCell } from './style';

export interface ICheckboxWidget {
  label?: string;
  backgroundColor?: string;
  value?: boolean;
}

interface IProps extends ICheckboxWidget, ActionClickWidget,IPropsWidgets {

}

class CheckboxWidget extends Component<IProps, ICheckboxWidget> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      label: props.label ? props.label : '',
      value: props.value ? props.value : false,
      backgroundColor: props.backgroundColor ? props.backgroundColor : '#137cbd'
    };
  }

  render() {
    const { backgroundColor, label } = this.state;
    const value = this.props.value ? this.props.value : false;
    const checkboxBlue = (
      <Checkbox onChange={this.handleToggle} label={label} checked={value} />
    );
    return (
      <CheckboxCell backgroundColor={backgroundColor}>
        {checkboxBlue}
      </CheckboxCell>
    );
  }

  handleToggle = () => {
    const value = this.state.value;
    this.setState({
      value: !this.state.value,
      backgroundColor: this.props.backgroundColor,
      label: this.props.label
    });

    this.props.onClick(this.props.row, this.props.column, !value);
  };
}

export default CheckboxWidget;
