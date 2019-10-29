import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import { IconName, InputGroup, Intent } from '@blueprintjs/core';
/** FieldState */
import { StyledInput } from './style';
import { IFieldProps } from './IFieldProps';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';
import { computed } from 'mobx';

/**
 * Field component. Must be an observer.
 */

export interface IInputFieldProps extends IFieldProps {
  leftIcon?: IconName;
  rightElement?: JSX.Element;
  round?: boolean;
  fill?: boolean;
  tipLabel?: string;
  upperCaseFormat?: boolean;
}

@observer
export class VInputField extends React.Component<IInputFieldProps> {
  constructor(props: IInputFieldProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
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
      type,
      placeholder,
      rightElement,
      round,
      id,
      className,
      layer,
      fill,
      noLabel,
      required,
      validators,
      margin,
      value,
      tipLabel,
      upperCaseFormat,
      displayRequired,
      tooltip
    } = this.props;
    let rightEl;
    if (!rightElement) {
      rightEl = <div style={{ paddingRight: 10 }} />;
    }
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

    const renderedValue =
      (upperCaseFormat &&
        this.valueField &&
        this.valueField.toString() &&
        this.valueField.toString().toUpperCase()) ||
      this.valueField;
    return (
      <StyledInput
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
            large={size === 'large'}
            small={size === 'small'}
            rightElement={rightElement || rightEl}
            name={id}
            {...{
              round,
              leftIcon,
              type,
              disabled,
              placeholder,
              id
            }}
            onChange={this.onChange}
            onKeyPress={(e: any) => {
              this.props.onKeyPress && this.props.onKeyPress(e);
            }}
            value={renderedValue}
            intent={
              fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE
            }
            style={{ paddingRight: 10 }}
          />
        </FormFieldContainer>
      </StyledInput>
    );
  }

  @computed
  get valueField() {
    if (this.props.fieldState) {
      return this.props.fieldState.value || '';
    }
    if (this.props.value) {
      return this.props.value;
    }
    return '';
  }

  onChange(e: any) {
    const parsedValue =
      (this.props.upperCaseFormat && e.target.value.toString().toUpperCase()) ||
      e.target.value;
    if (this.props.fieldState) {
      this.props.fieldState.onChange(parsedValue);
    }
    if (this.props.onChange) {
      this.props.onChange(parsedValue);
    }
  }
}
