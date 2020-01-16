import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
/** FieldState */
import { IconName, Intent, NumericInput } from '@blueprintjs/core';
import { IFieldProps } from './IFieldProps';
import { StyledNumericInput } from './style';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';
import { computed } from 'mobx';
import { isNumber } from 'lodash';

/**
 * Field Props
 */
export interface INumericFieldProps extends IFieldProps {
  leftIcon?: IconName;
  min?: number;
  max?: number;
  buttonPosition?: 'left' | 'right' | 'none';
  fill?: boolean;
  tipLabel?: string;
  allowNumericCharactersOnly?: boolean;
  clampValueOnBlur?: boolean;
}

/**
 * Field component. Must be an observer.
 */

@observer
export class VNumericField extends React.Component<INumericFieldProps> {
  constructor(props: INumericFieldProps) {
    super(props);
  }

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      leftIcon,
      size,
      disabled,
      inline,
      placeholder,
      id,
      min,
      max,
      buttonPosition,
      fill,
      className,
      layer,
      noLabel,
      required,
      validators,
      margin,
      allowNumericCharactersOnly,
      tipLabel,
      tooltip,
      displayRequired,
      clampValueOnBlur,
      value,
      autoComplete
    } = this.props;

    if (fieldState) {
      if (required) {
        if (validators && validators.length > 0) {
          fieldState.validators(Validators.required, ...validators);
        } else {
          fieldState.validators(Validators.required);
        }
      } else if (validators && validators.length > 0) {
        fieldState.validators(...validators);
      }
    }
    return (
      <StyledNumericInput
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        fill={fill}
        noLabel={noLabel}
        margin={margin}
      >
        <FormFieldContainer
          required={required || displayRequired}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
          tooltip={tooltip}
        >
          {tipLabel && <span className={'tipLabel'}>{tipLabel}</span>}
          <NumericInput
            name={id}
            large={size === 'large'}
            {...{
              disabled,
              placeholder,
              id,
              min,
              max,
              leftIcon,
              fill,
              buttonPosition,
              allowNumericCharactersOnly
            }}
            onValueChange={this.onChange}
            value={this.valueField}
            autoComplete={autoComplete ? autoComplete : 'no_auto'}
            intent={
              fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE
            }
            onKeyPress={this.onKeyPress}
            onPaste={e => {
              const oldValue =
                e && e.currentTarget && e.currentTarget.value;
              let newValue =
                e && e.clipboardData && e.clipboardData.getData('Text');
              newValue = newValue.replace(',', '.');
              if (Number(newValue) && isNumber(Number(newValue))) {
                if (this.props.onPaste) {
                  this.props.onPaste(oldValue, newValue);
                }
              } else {
                e.preventDefault();
              }
            }}
          />
        </FormFieldContainer>
      </StyledNumericInput>
    );
  }

  onKeyPress = (event: any) => {
    const keycode = event.keyCode ? event.keyCode : event.which;
    if (
      !(
        event.shiftKey === false &&
        ((keycode === 45 && this.isInTheStart(event)) ||
          keycode === 46 ||
          keycode === 8 ||
          keycode === 37 ||
          keycode === 39 ||
          (keycode >= 48 && keycode <= 57))
      )
    ) {
      event.preventDefault();
    }
  };

  public isInTheStart = (event: any) => {
    if (event.currentTarget && event.currentTarget) {
      return !event.currentTarget.selectionStart;
    }
    return false;
  };

  @computed
  get valueField() {
    if (this.props.fieldState) {
      return this.props.fieldState.value || '';
    }
    if (this.props.value) {
      return this.props.value || '';
    }
    return '';
  }

  onChange = (e: any, value: string) => {
    if (this.props.fieldState) {
      this.props.fieldState.onChange(e);
    }
    if (this.props.onChange) {
      this.props.onChange!(e);
    }
  };
}
