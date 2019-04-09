import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
/** FieldState */
import { IconName, NumericInput, Intent } from '@blueprintjs/core';
import { IFieldProps } from './IFieldProps';
import { StyledNumericInput } from './style';
import { FormFieldContainer } from './FormFieldContainer';
import * as validator from '../Validators';

/**
 * Field Props
 */
export interface INumericFieldProps extends IFieldProps {
  leftIcon?: IconName;
  min?: number;
  max?: number;
  buttonPosition?: 'left' | 'right' | 'none';
  fill?: boolean;
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
      value
    } = this.props;
    if (fieldState) {
      if (required) {
        if (validators && validators.length > 0) {
          fieldState.validators(validator.required, ...validators);
        } else {
          fieldState.validators(validator.required);
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
        intent={
          fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE
        }
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        fill={fill}
        noLabel={noLabel}
        margin={margin}
      >
        <FormFieldContainer
          required={required}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
        >
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
              buttonPosition
            }}
            onValueChange={this.onChange}
            value={fieldState && fieldState.$ ? fieldState.$ : value ? value : 0}
            intent={
              fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE
            }
          />
        </FormFieldContainer>
      </StyledNumericInput>
    );
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
