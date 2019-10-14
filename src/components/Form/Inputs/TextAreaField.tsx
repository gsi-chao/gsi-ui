import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import { Intent, TextArea } from '@blueprintjs/core';
import { IFieldProps } from './IFieldProps';
import { StyledTextArea } from './style';

import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';
import { computed } from 'mobx';
/** FieldState */

/**
 * Field Props
 */

/**
 * Field component. Must be an observer.
 */

export interface ITextAreaFieldProps extends IFieldProps {
  fill?: boolean;
  upperCaseFormat?: boolean;
  rows?: number;
  heightArea?: number;
  growVertically?: boolean;
  cols?: number;
}

@observer
export class VTextAreaField extends React.Component<ITextAreaFieldProps> {
  constructor(props: ITextAreaFieldProps) {
    super(props);
  }

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      size,
      disabled,
      inline,
      id,
      className,
      fill,
      layer,
      noLabel,
      required,
      validators,
      value,
      upperCaseFormat,
      heightArea,
      tooltip,
      growVertically,
      cols
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
    const renderedValue =
      (upperCaseFormat &&
        this.valueField &&
        this.valueField.toString() &&
        this.valueField.toString().toUpperCase()) ||
      this.valueField;
    return (
      <StyledTextArea
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        layer={layer}
        labelInfo={labelInfo}
        fill={fill}
        noLabel={noLabel}
        heightArea={heightArea}
      >
        <FormFieldContainer
          required={required}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
          tooltip={tooltip}
        >
          <TextArea
            large={size === 'large'}
            small={size === 'small'}
            onChange={this.onChange}
            value={renderedValue}
            intent={
              fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE
            }
            name={id}
            {...{
              disabled,
              id
            }}
            rows={this.props.rows ? this.props.rows : undefined}
            growVertically={growVertically}
            cols={this.props.rows ? this.props.rows : undefined}
          />
        </FormFieldContainer>
      </StyledTextArea>
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

  onChange = (e: any) => {
    const parsedValue =
      (this.props.upperCaseFormat && e.target.value.toString().toUpperCase()) ||
      e.target.value;
    if (this.props.fieldState) {
      this.props.fieldState.onChange(parsedValue);
    }
    if (this.props.onChange) {
      this.props.onChange!(parsedValue);
    }
  };
}
