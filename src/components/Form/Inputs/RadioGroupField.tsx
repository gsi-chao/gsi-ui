import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import { Alignment, Intent, IOptionProps, RadioGroup } from '@blueprintjs/core';

import { IFieldProps } from './IFieldProps';
import { StyledRadioButton } from './style';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';
import { computed } from 'mobx';

/**
 * Field Props
 */
export interface IRadioButtonFieldProps extends IFieldProps {
  alignIndicator?: Alignment;
  rightElement?: JSX.Element;
  options: IOptionProps[];
  fill?: boolean;
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
      margin,
      value,
      fill,
      tooltip
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
      <StyledRadioButton
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        noLabel={noLabel}
        margin={margin}
        fill={fill}
      >
        <FormFieldContainer
          required={required}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
          tooltip={tooltip}
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
            selectedValue={this.valueField}
            options={options}
          />
        </FormFieldContainer>
      </StyledRadioButton>
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
    return null;
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
