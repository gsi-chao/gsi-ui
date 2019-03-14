import { observer } from 'mobx-react';
import * as React from 'react';

/** Blueprint */
import {
  FormGroup,
  Intent,
  Alignment,
  Radio,
  RadioGroup,
  IOptionProps
} from '@blueprintjs/core';

import { IFieldProps } from './IFieldProps';
import {
  IStyledFieldProps,
  layerInPercent,
  StyledFormGroup,
  StyledRadioButton
} from './style';
import styled from 'styled-components';
import { FormFieldContainer } from './FormFieldContainer';
import * as validator from '../Validators';

/**
 * Field Props
 */
export interface IRadioButtonFieldProps extends IFieldProps {
  alignIndicator?: Alignment;
  rightElement?: Element;
  options: IOptionProps[];
}

/**
 * Field component. Must be an observer.
 */

@observer
export class VRadioGroupField extends React.Component<IRadioButtonFieldProps> {
  constructor(props: IRadioButtonFieldProps) {
    super(props);
  }

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      disabled,
      inline,
      alignIndicator,
      id,
      options,
      className,
      layer,
      noLabel,
      required,
      validators,
      margin
    } = this.props;
    if (required) {
      if (validators && validators.length > 0) {
        fieldState.validators(validator.required, ...validators);
      } else {
        fieldState.validators(validator.required);
      }
    } else if (validators && validators.length > 0) {
      fieldState.validators(...validators);
    }
    return (
      <StyledRadioButton
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
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
          <RadioGroup
            name={id}
            {...{
              disabled,
              id,
              inline,
              alignIndicator
            }}
            onChange={this.onChange}
            selectedValue={fieldState.value}
            options={options}
          />
        </FormFieldContainer>
      </StyledRadioButton>
    );
  }

  onChange = (e: any) => {
    this.props.fieldState.onChange(e.target.value);
    if (this.props.onChange) {
      this.props.onChange!(e.target.value);
    }
  };
}
