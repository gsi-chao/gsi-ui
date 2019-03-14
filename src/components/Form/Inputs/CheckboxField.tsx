import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
/** FieldState */
import { Intent, Checkbox, Alignment } from '@blueprintjs/core';

import { IFieldProps } from './IFieldProps';
import { StyledCheckBoxInput } from './style';
import { FormFieldContainer } from './FormFieldContainer';
import * as validator from '../Validators';

/**
 * Field Props
 */
export interface ICheckBoxFieldProps extends IFieldProps {
  rightElement?: Element;
  alignIndicator?: Alignment;
  checkBoxAtLeft?: boolean;
}

/**
 * Field component. Must be an observer.
 */

@observer
export class VCheckboxField extends React.Component<ICheckBoxFieldProps> {
  constructor(props: ICheckBoxFieldProps) {
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
      alignIndicator,
      id,
      className,
      layer,
      checkBoxAtLeft,
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
      <StyledCheckBoxInput
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        checkBoxAtLeft={checkBoxAtLeft}
        noLabel={noLabel}
        margin={margin}
      >
        <FormFieldContainer
          required={required}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
        >
          <Checkbox
            name={id}
            large={size === 'large'}
            {...{
              disabled,
              id,
              inline,
              alignIndicator,
              label: ''
            }}
            onChange={this.onChange}
            checked={fieldState.value || false}
          />
        </FormFieldContainer>
      </StyledCheckBoxInput>
    );
  }

  onChange = (e: any) => {
    this.props.fieldState.onChange(e.target.checked);
    if (this.props.onChange) {
      this.props.onChange!(e.target.checked);
    }
  };
}
