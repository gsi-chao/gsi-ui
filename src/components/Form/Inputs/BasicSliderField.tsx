import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
/** FieldState */
import { Intent, Slider } from '@blueprintjs/core';

import { IFieldProps } from './IFieldProps';
import { StyledSlider } from './style';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';
import { computed } from 'mobx';
import { isNumber } from 'lodash';

/**
 * Field Props
 */
export interface ISliderFieldProps extends IFieldProps {
  min?: number;
  max?: number;
  stepSize?: number;
  labelStepSize?: number;
  vertical?: boolean;
  fill?: boolean;
}

/**
 * Field component. Must be an observer.
 */

@observer
export class VBasicSliderField extends React.Component<ISliderFieldProps> {
  constructor(props: ISliderFieldProps) {
    super(props);
  }

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      disabled,
      inline,
      id,
      min,
      max,
      stepSize,
      labelStepSize,
      className,
      layer,
      fill,
      noLabel,
      required,
      validators,
      margin,
      value
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
      <StyledSlider
        className={className}
        disabled={disabled}
        inline={inline}
        intent={
          !!fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE
        }
        labelFor={id}
        labelInfo={labelInfo}
        fill={fill}
        layer={layer}
        noLabel={noLabel}
        margin={margin}
      >
        <FormFieldContainer
          required={required}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
        >
          <Slider
            {...{
              disabled,
              id,
              min,
              max,
              stepSize,
              labelStepSize
            }}
            onChange={this.onChange}
            value={this.valueField}
          />
        </FormFieldContainer>
      </StyledSlider>
    );
  }

  @computed
  get valueField() {
    if (this.props.fieldState && isNumber(this.props.fieldState.value)) {
      return this.props.fieldState.value;
    }
    if (this.props.value && isNumber(this.props.value)) {
      return this.props.value;
    }
    return 0;
  }

  onChange = (e: any) => {
    if (this.props.fieldState) {
      this.props.fieldState.onChange(e);
    }
    if (this.props.onChange) {
      this.props.onChange!(e);
    }
  };
}
