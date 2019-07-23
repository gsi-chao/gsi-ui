import React, { Component } from 'react';
import { ActionClickWidget, IPropsWidgets } from '../../Widget';
import { Checkbox } from '@blueprintjs/core';
import { CheckboxCell } from './style';

export interface ICheckboxWidget {
  label?: string;
  backgroundColor?: string;
  value?: boolean;
}

interface IProps extends ICheckboxWidget, ActionClickWidget, IPropsWidgets {
  onChange?(
    rowIndex: number,
    columnIndex: number,
    newValue: string | boolean | number
  ): void;
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

    const checkboxBlue = (
      <Checkbox
        disabled={this.props.disable}
        onChange={this.handleToggle}
        label={label}
        checked={this.props.value}
      />
    );

    return (
      <CheckboxCell backgroundColor={backgroundColor}>
        {checkboxBlue}
      </CheckboxCell>
    );
  }

  handleToggle = () => {
    this.setState({
      value: !this.state.value,
      backgroundColor: this.props.backgroundColor,
      label: this.props.label
    });

    this.props.onClick(this.props.row, this.props.column, !this.state.value);
    if (this.props.onChange) {
      this.props.onChange(this.props.row, this.props.column, !this.state.value);
    }
  };
}

export default CheckboxWidget;
