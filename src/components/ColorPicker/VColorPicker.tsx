import React, { Component } from 'react';
import { Color, ColorResult } from 'react-color';
import {  Popover } from '@blueprintjs/core';
import { ChromePickerStyled, InputColor, SketchPickerStyled } from './style';

export type TypePickerColor = 'SketchPicker' | 'ChromePicker';

export interface IState {
  displayColorPicker: boolean;
  color: Color;
}
export interface IProps {
  width?: number;
  height?: number;
  defaultColor?: string;
  typePickerColor: TypePickerColor;
  onChange: (color: string) => void;
}

class VColorPicker extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      color: this.props.defaultColor ? this.props.defaultColor : 'red',
      displayColorPicker: false
    };
  }

  handleChange = (color: ColorResult) => {
    this.setState({ color: color.hex });
    this.props.onChange(color.hex);
  };

  render() {
    const colorPicker = this.getPickerColor();

    return (
      <React.Fragment>
        <Popover
          content={colorPicker}
          target={<InputColor defaultColor={this.state.color.toString()} />}
        />
      </React.Fragment>
    );
  }

  getPickerColor = () => {
    switch (this.props.typePickerColor) {
      case 'SketchPicker':
        return (
          <SketchPickerStyled
            color={this.state.color}
            onChange={this.handleChange}
          />
        );
      case 'ChromePicker':
        return (
          <ChromePickerStyled
            color={this.state.color}
            onChange={this.handleChange}
          />
        );
      default:
        return (
          <ChromePickerStyled
            color={this.state.color}
            onChange={this.handleChange}
          />
        );
    }
  };
}

export default VColorPicker;
