import React, { useEffect, useRef, useState } from 'react';
import { Color, ColorResult } from 'react-color';
import { Button, Intent, Popover } from '@blueprintjs/core';
import { ChromePickerStyled, InputColor, SketchPickerStyled } from './style';
import { TypePickerColor, VColorResult, VPosition } from './types';
import color from 'color';
import OutsideClickHandler from 'react-outside-click-handler';

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
  disableAlpha?: boolean;
  boundary?: 'scrollParent' | 'viewport' | 'window';
}

export const VColorPicker = (props: IProps) => {
  const [state, setState] = useState<IState>({
    color: undefined,
    currentColor: color(props.Color)
  });

  const [isOpen, setIsOpen] = useState(false);

  const pickerRef = useRef(null);

  useEffect(() => {
    setState({
      currentColor: color(props.Color).toString(),
      color: state.color
    });
  }, [props.Color]);

  const onOutsideClick = (e: any) => {
    const cl = e.target.className;
    if (!props.addButton && !cl.includes('gsi-input-color')) {
      setIsOpen(false);
    }
  };

  const getPickerColor = () => {
    switch (props.typePickerColor) {
      case 'SketchPicker': {
        return (
          <OutsideClickHandler onOutsideClick={onOutsideClick}>
            <SketchPickerStyled
              color={state.currentColor}
              onChangeComplete={handleChange}
              disableAlpha={props.disableAlpha}
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
          </OutsideClickHandler>
        );
      }

      case 'ChromePicker': {
        return (
          <OutsideClickHandler onOutsideClick={onOutsideClick}>
            <ChromePickerStyled
              color={state.currentColor}
              onChangeComplete={handleChange}
              disableAlpha={props.disableAlpha}
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
          </OutsideClickHandler>
        );
      }
    }
  };

  const handleClick = () => {
    if (state.color) {
      props.onChange && props.onChange(state.color);
    }
    setIsOpen(false);
  };

  const handleChange = (col: ColorResult) => {
    const { a, ...rgb } = col.rgb;
    setState({
      color: col,
      currentColor: color(rgb)
        .alpha(a || 1)
        .toString()
    });
  };

  const waitForHandleClick = () => {
    if (props.addButton && isOpen) {
      return;
    }

    setIsOpen(!isOpen);
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
          isOpen={isOpen}
          onClosing={() => !props.addButton && handleClick()}
          interactionKind={'click'}
          captureDismiss={false}
          enforceFocus
          usePortal={true}
          ref={pickerRef}
          target={
            <InputColor
              className="gsi-input-color"
              width={props.width}
              height={props.height}
              defaultColor={state.currentColor}
              onClick={waitForHandleClick}
            />
          }
          position={props.position ? props.position : 'right'}
          boundary={props.boundary ? props.boundary : 'scrollParent'}
          modifiers={{
            preventOverflow: {
              enabled: true
            }
          }}
          onInteraction={(nextOpenState: boolean) => {
            if (!nextOpenState) setIsOpen(false);
          }}
        />
      )}
    </div>
  );
};
