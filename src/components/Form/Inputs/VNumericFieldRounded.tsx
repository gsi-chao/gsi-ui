import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect, useState } from 'react';
/** Blueprint */
/** FieldState */
import { IconName, InputGroup, Intent } from '@blueprintjs/core';
import { IFieldProps } from './IFieldProps';
import { StyledNumericInput } from './style';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';
import { round } from 'lodash';
import { debounce } from 'formstate/lib/internal/utils';

/**
 * Field Props
 */
export interface INumericFieldProps extends IFieldProps {
  leftIcon?: IconName;
  fill?: boolean;
  tipLabel?: string;
  roundTo?: number;
  maxDecimals?: number;
}

/**
 * Field component. Must be an observer.
 */

export const VNumericFieldRounded = observer((props: INumericFieldProps) => {
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
    fill,
    className,
    layer,
    noLabel,
    required,
    validators,
    margin,
    tipLabel,
    tooltip,
    displayRequired,
    value,
    roundTo
  } = props;
  const [state, setState] = useState<any>('');

  useEffect(() => {
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
    const propsValue =
      (props.fieldState && props.fieldState.value) || value || '';
    const newValue =
      (propsValue &&
        props.roundTo &&
        fillWithZero(propsValue, props.roundTo)) ||
      propsValue;
    setState(newValue);
  }, []);

  const onChange = (e: any) => {
    const funct = () => {
      let val =
        (props.fieldState && props.fieldState.value) || props.value || 0;
      val = (val && round(Number(val.toString()), props.roundTo)) || 0;
      val = fillWithZero(val, props.roundTo || 0);
      setState(val);
    };
    executeFunctionWithDebounce(funct);
    const regExp = /^(-)?[0-9]*([.][0-9]*)?$/;
    const value = e.target.value;
    if (regExp.test(value) || !value) {
      if (!props.maxDecimals || canAddDecimalPlace(value, props.maxDecimals)) {
        let newValue = value;
        if (props.roundTo && props.roundTo > 0) {
          newValue =
            (newValue && round(Number(newValue.toString()), props.roundTo)) ||
            0;
          setState(value);
          if (props.fieldState) {
            props.fieldState.onChange(newValue);
          }
          if (props.onChange) {
            props.onChange!(newValue);
          }
        } else {
          setState(value);
          if (props.fieldState) {
            props.fieldState.onChange(newValue);
          }
          if (props.onChange) {
            props.onChange!(newValue);
          }
        }
      }
    }
  };
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
        <InputGroup
          name={id}
          large={size === 'large'}
          {...{
            disabled,
            placeholder,
            id,
            leftIcon,
            fill
          }}
          onChange={onChange}
          value={state || ''}
          intent={
            fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE
          }
          onPaste={e => {
            const oldValue = e && e.currentTarget && e.currentTarget.value;
            const newValue =
              e && e.clipboardData && e.clipboardData.getData('Text');
            if (props.onPaste) {
              props.onPaste(oldValue, newValue);
            }
          }}
        />
      </FormFieldContainer>
    </StyledNumericInput>
  );
});

const fillWithZero = (value: any, round: number): any => {
  const values = `${value || ''}`.split('.');
  if (values && values.length === 2) {
    let secValues = `${values[1]}`;
    while (secValues.length < round) {
      secValues += `0`;
    }
    return `${values[0]}.${secValues}`;
  }
  let secValues = `0`;
  while (secValues.length < round) {
    secValues += `0`;
  }
  return (value || `${value}`.toString()) ? `${value}.${secValues}` : '';
};

const canAddDecimalPlace = (value: any, round: number): boolean => {
  const values = `${value || ''}`.split('.');
  if (values && values.length === 2) {
    const secondValue = values[1];
    return !secondValue.length || secondValue.length <= round;
  }
  return true;
};

export const executeFunctionWithDebounce = debounce((callBack: any) => {
  callBack();
}, 1000);
