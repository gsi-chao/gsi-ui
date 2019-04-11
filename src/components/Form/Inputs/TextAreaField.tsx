import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import { FormGroup, Intent, TextArea } from '@blueprintjs/core';
/** FieldState */

import { IFieldProps } from './IFieldProps';
import { StyledTextArea } from './style';

import { FormFieldContainer } from './FormFieldContainer';
import * as validator from '../Validators';
import { computed } from 'mobx';

/**
 * Field Props
 */

/**
 * Field component. Must be an observer.
 */

export interface ITextAreaFieldProps extends IFieldProps {
  fill?: boolean;
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
      >
        <FormFieldContainer
          required={required}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
        >
          <TextArea
            large={size === 'large'}
            small={size === 'small'}
            onChange={this.onChange}
            value={this.valueField}
            intent={
              fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE
            }
            name={id}
            {...{
              disabled,
              id
            }}
          />
        </FormFieldContainer>
      </StyledTextArea>
    );
  }

  @computed
  get valueField() {
    if (this.props.fieldState) {
      return this.props.fieldState.value;
    }
    if (this.props.value) {
      return this.props.value;
    }
    return '';
  }

  onChange = (e: any) => {
    if (this.props.fieldState) {
      this.props.fieldState.onChange(e.target.value);
    }
    if (this.props.onChange) {
      this.props.onChange!(e.target.value);
    }
  };
}
