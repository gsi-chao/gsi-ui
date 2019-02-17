import React, { Component } from 'react';
import { ActionClickWidget } from '../../Widget';
import { Checkbox } from '@blueprintjs/core';
import styled from 'styled-components';

export interface ICheckboxWidget {
  label?: string;
  backgroundColor?: string;
  value?: boolean;
}

interface IProps extends ICheckboxWidget, ActionClickWidget {
  row: number;
  column: number;
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
    const { value, backgroundColor, label } = this.state;
    const CheckboxCell = styled.div`
      display: flex;
      justify-content: center;

      & .bp3-control input:checked ~ .bp3-control-indicator {
        background-color: ${backgroundColor};
      }

      .bp3-control
        input:not(:disabled):active:checked
        ~ .bp3-control-indicator {
        background: ${backgroundColor};
      }
    `;
    const checkboxBlue = (
      <Checkbox onChange={this.handleToggle} label={label} checked={value} />
    );
    return <CheckboxCell>{checkboxBlue}</CheckboxCell>;
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
