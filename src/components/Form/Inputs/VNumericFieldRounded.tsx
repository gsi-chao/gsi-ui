import { observer } from 'mobx-react-lite';

import React, { useEffect, useState } from 'react';
import { isFinite, isNumber, round } from 'lodash';
/** Blueprint */
/** FieldState */
import { IconName, InputGroup, Intent } from '@blueprintjs/core';
import { IFieldProps } from './IFieldProps';
import { StyledNumericInput } from './style';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';

/**
 * Field Props
 */
export interface INumericFieldProps extends IFieldProps {
  leftIcon?: IconName;
  fill?: boolean;
  tipLabel?: string;
  roundTo: number;
  maxDecimals: number;
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
    autoComplete
  } = props;
  const [state, setState] = useState<any>('');

  useEffect(() => {
    const propsValue =
      (props.fieldState && props.fieldState.value) || value || '';
    const newValue =
      (propsValue &&
        props.roundTo &&
        fillWithZero(propsValue, props.roundTo)) ||
      propsValue;
    setState(newValue);
  }, [props.roundTo]);

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
  }, [validators, required]);

  useEffect(() => {
    const propsValue =
      (props.fieldState && props.fieldState.value) || value || '';
    if (Number(propsValue) !== Number(state) && state !== '-') {
      MaskValue();
    }
  }, [props.fieldState && props.fieldState.value, props.value]);

  const getValue = () => {
    return isNumber(props.fieldState && props.fieldState.value) &&
      isFinite(props.fieldState && props.fieldState.value)
      ? props.fieldState && props.fieldState.value
      : isNumber(props.value) && isFinite(props.value)
      ? props.value
      : '';
  };

  const MaskValue = () => {
    const propValue = getValue();
    let val = isNumber(propValue) && isFinite(propValue) ? propValue : '';
    if (isNumber(val) && isFinite(val) && props.roundTo) {
      val = round(Number(val.toString()), props.roundTo);
    }
    val = fillWithZero(val, props.roundTo || 0);
    setState(val);
  };

  const onChange = (e: any) => {
    const value = e.target.value;
    if (
      (props.maxDecimals && props.maxDecimals > 0 && regExp.test(value)) ||
      !value
    ) {
      if (!props.maxDecimals || canAddDecimalPlace(value, props.maxDecimals)) {
        let newValue = value;
        if (props.roundTo && props.roundTo > 0) {
          if (
            `${value}` &&
            isNumber(Number(value)) &&
            isFinite(Number(value))
          ) {
            newValue =
              `${newValue &&
                round(Number(newValue.toString()), props.roundTo)}` || '';
          }
          setState(value);
          setPropsValues(newValue);
        } else {
          setState(value);
          setPropsValues(newValue);
        }
      }
    } else if (
      (props.maxDecimals === 0 && regExpNoDecimalPlace.test(value)) ||
      !value
    ) {
      setState(value);
      setPropsValues(value);
    }
  };

  const setPropsValues = (val: any) => {
    if (props.fieldState) {
      props.fieldState.onChange(
        `${val}` && isNumber(Number(val)) && isFinite(Number(val))
          ? Number(val)
          : ''
      );
    }
    if (props.onChange) {
      props.onChange!(
        `${val}` && isNumber(Number(val)) && isFinite(Number(val))
          ? Number(val)
          : ''
      );
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
          autoComplete={autoComplete ? autoComplete : 'no_auto'}
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
          onBlur={MaskValue}
        />
      </FormFieldContainer>
    </StyledNumericInput>
  );
});

const fillWithZero = (value: any, round: number): any => {
  if (!`${value}`) {
    return '';
  }

  if (round === 0) {
    return value;
  }
  const values = `${value || ''}`.split('.');
  if (values && values.length === 2) {
    let secValues = `${values[1]}`;
    while (secValues.length < round) {
      secValues += `0`;
    }
    return `${values[0]}.${secValues}`;
  }
  let secValues = ``;
  while (secValues.length < round) {
    secValues += `0`;
  }
  return value || `${value}`.toString() ? `${value}.${secValues}` : '';
};

const canAddDecimalPlace = (value: any, round: number): boolean => {
  const values = `${value || ''}`.split('.');
  if (values && values.length === 2) {
    const secondValue = values[1];
    return !secondValue.length || secondValue.length <= round;
  }
  return true;
};

const regExp = /^(-)?[0-9]*([.][0-9]*)?$/;
const regExpNoDecimalPlace = /^(-)?[1-9][0-9]*?$/;
