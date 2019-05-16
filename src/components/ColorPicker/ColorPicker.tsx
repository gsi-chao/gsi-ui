import React, { Component } from 'react';
import { Color, ColorResult } from 'react-color';
import { Popover } from '@blueprintjs/core';
import { ChromePickerStyled, InputColor, SketchPickerStyled } from './style';
import {
  TypePickerColor,
  VColorResult,
  VHSLColor,
  VPosition,
  VRGBColor
} from './types';
import { hexToRgb } from './util';

export interface IState {
  displayColorPicker: boolean;
  color: Color | undefined;
  defaultColor: Color | undefined;
}

export interface IProps {
  width?: number;
  height?: number;
  Color: string | VHSLColor | VRGBColor;
  typePickerColor: TypePickerColor;
  onChange: (color: VColorResult) => void;
  position?: VPosition;
  disable?: boolean;
}

export class VColorPicker extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      color: undefined,
      displayColorPicker: false,
      defaultColor: props.Color ? props.Color : undefined
    };
  }

  render() {
    const colorPicker = this.getPickerColor();

    let color = this.props.Color;

    if (typeof color === 'string') {
      color = hexToRgb(color);
    }

    if (this.props.disable) {
      if (!(typeof color === 'string')) {
        color.a = 0.42;
      }

      return (
        <React.Fragment>
          <InputColor
            width={this.props.width}
            height={this.props.height}
            defaultColor={color}
            disable
          />
        </React.Fragment>
      );
    }

    if (!(typeof color === 'string')) {
      color.a = 1;
    }

    return (
      <React.Fragment>
        <Popover
          content={colorPicker}
          target={
            <InputColor
              width={this.props.width}
              height={this.props.height}
              defaultColor={color}
            />
          }
          position={this.props.position ? this.props.position : 'right'}
        />
      </React.Fragment>
    );
  }

  getPickerColor = () => {
    switch (this.props.typePickerColor) {
      case 'SketchPicker': {
        return (
          <SketchPickerStyled
            color={this.props.Color}
            onChange={this.handleChange}
          />
        );
      }

      case 'ChromePicker': {
        return (
          <ChromePickerStyled
            color={this.props.Color}
            onChange={this.handleChange}
          />
        );
      }

      default: {
        return (
          <ChromePickerStyled
            color={this.state.color}
            onChange={this.handleChange}
          />
        );
      }
    }
  };

  handleChange = (color: ColorResult) => {
    // this.setState({
    //   color: color.rgb,
    //   Color: undefined
    // });

    this.props.onChange(color);
  };
}
