import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import {
  HTMLSelect,
  IIconProps,
  Intent,
  IOptionProps
} from '@blueprintjs/core';
/** FieldState */
import { IFieldProps } from './IFieldProps';
import { StyledFormGroup } from './style';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';
import { computed } from 'mobx';

/**
 * Field Props
 */
export interface IBasicSelectFieldProps extends IFieldProps {
  icon?: Partial<IIconProps>;
  options: IOptionProps[];
  minimal?: boolean;
}

/**
 * Field component. Must be an observer.
 */

@observer
export class VBasicSelectField extends React.Component<IBasicSelectFieldProps> {
  constructor(props: IBasicSelectFieldProps) {
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
      icon,
      id,
      placeholder,
      options,
      minimal,
      className,
      layer,
      required,
      validators,
      noLabel,
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
      <StyledFormGroup
        margin={margin}
        disabled={disabled}
        inline={inline}
        intent={fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        className={className}
      >
        <FormFieldContainer
          required={required}
          label={label}
          noLabel={noLabel}
          fieldState={fieldState}
        >
          <HTMLSelect
            options={options}
            iconProps={icon}
            name={id}
            large={size === 'large'}
            onChange={this.onChange}
            value={this.valueField}
            {...{
              disabled,
              placeholder,
              id,
              minimal
            }}
          />
        </FormFieldContainer>
      </StyledFormGroup>
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
      this.props.onChange(e.target.value);
    }
  };
}
