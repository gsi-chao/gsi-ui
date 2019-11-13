import React, { useEffect, useState } from 'react';
import { Color, ColorResult } from 'react-color';
import { Button, Intent, Popover } from '@blueprintjs/core';
import { ChromePickerStyled, InputColor, SketchPickerStyled } from './style';
import { TypePickerColor, VColorResult, VPosition } from './types';
import color from 'color';

export interface IState {
  color: ColorResult | undefined;
  currentColor: any;
}

export interface IProps {
  width?: number;
  height?: number;
  Color: Color;
  typePickerColor: TypePickerColor;
  onChange: (color: VColorResult) => void;
  position?: VPosition;
  disable?: boolean;
  addButton?: {
    text: string;
    intent: Intent;
  };
}

export const VColorPicker = (props: IProps) => {
  const [state, setState] = useState<IState>({
    color: undefined,
    currentColor: color(props.Color)
  });

  useEffect(() => {
    setState({
      currentColor: color(props.Color).toString(),
      color: state.color
    });
  }, [props.Color]);

  const getPickerColor = () => {
    switch (props.typePickerColor) {
      case 'SketchPicker': {
        return (
          <>
            <SketchPickerStyled
              color={state.currentColor}
              onChangeComplete={handleChange}
              disableAlpha={false}
            />
            {props.addButton && (
              <Button
                onClick={handleClick}
                text={props.addButton.text}
                style={{ fontSize: 14 }}
                minimal
                large
                fill
                intent={props.addButton.intent}
              />
            )}
          </>
        );
      }

      case 'ChromePicker': {
        return (
          <>
            <ChromePickerStyled
              color={state.currentColor}
              onChangeComplete={handleChange}
              disableAlpha={false}
            />

            {props.addButton && (
              <Button
                onClick={handleClick}
                text={props.addButton.text}
                style={{ fontSize: 14 }}
                minimal
                large
                fill
                intent={props.addButton.intent}
              />
            )}
          </>
        );
      }
    }
  };

  const handleClick = () => {
    if (state.color) {
      props.onChange(state.color);
    }
  };

  const handleChange = (col: ColorResult) => {
    const { a, ...rgb } = col.rgb;
    setState({
      color: col,
      currentColor: color(rgb)
        .alpha(a || 1)
        .toString()
    });
    if (!props.addButton) {
      props.onChange(col);
    }
  };

  return (
    <div className={'gsi-color-picker'}>
      {props.disable ? (
        <InputColor
          width={props.width}
          height={props.height}
          defaultColor={state.currentColor}
          disable
        />
      ) : (
        <Popover
          content={getPickerColor()}
          canEscapeKeyClose={false}
          interactionKind={'click-target'}
          captureDismiss={false}
          enforceFocus
          usePortal={true}
          target={
            <InputColor
              width={props.width}
              height={props.height}
              defaultColor={state.currentColor}
            />
          }
          position={props.position ? props.position : 'right'}
        />
      )}
    </div>
  );
};
