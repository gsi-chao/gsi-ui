import React, { Component } from 'react';
import { Color, ColorResult} from 'react-color';
import { Popover } from '@blueprintjs/core';
import { ChromePickerStyled, InputColor, SketchPickerStyled } from './style';
import { TypePickerColor, VColorResult, VHSLColor, VPosition, VRGBColor } from './types';

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

    const color = this.props.Color;


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
      case 'SketchPicker':
        return (
          <SketchPickerStyled
            color={this.props.Color}
            onChange={this.handleChange}
          />
        );
      case 'ChromePicker':
        return (
          <ChromePickerStyled
            color={this.props.Color}
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

  handleChange = (color: ColorResult) => {
    // this.setState({
    //   color: color.rgb,
    //   Color: undefined
    // });

    this.props.onChange(color);
  };
}
