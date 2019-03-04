import React, { Component } from 'react';
import { Color, ColorResult, RGBColor } from 'react-color';
import { Popover } from '@blueprintjs/core';
import { ChromePickerStyled, InputColor, SketchPickerStyled } from './style';
import { TypePickerColor, VColorResult, VPosition } from './types';

export interface IState {
  displayColorPicker: boolean;
  color: Color;
}

export interface IProps {
  width?: number;
  height?: number;
  defaultColor?: string | RGBColor;
  typePickerColor: TypePickerColor;
  onChange: (color: VColorResult) => void;
  position?: VPosition;
}

export class VColorPicker extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      color: this.props.defaultColor ? this.props.defaultColor : 'red',
      displayColorPicker: false
    };
  }

  handleChange = (color: ColorResult) => {
    this.setState({ color: color.rgb });

    this.props.onChange(color);
  };

  render() {
    const colorPicker = this.getPickerColor();
    return (
      <React.Fragment>
        <Popover
          content={colorPicker}
          target={
            <InputColor
              width={this.props.width}
              height={this.props.height}
              defaultColor={this.state.color}
            />
          }
          position={this.props.position ? this.props.position : 'right'}
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
