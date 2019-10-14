import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
/** FieldState */
import { Alignment, Switch, Intent } from '@blueprintjs/core';

import { IFieldProps } from './IFieldProps';
import { StyledCheckBoxInput } from './style';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';
import { computed } from 'mobx';

/**
 * Field Props
 */
export interface ISwitchFieldProps extends IFieldProps {
  rightElement?: Element;
  alignIndicator?: Alignment;
  checkBoxAtLeft?: boolean;
  innerLabel?: string;
  innerLabelChecked?: string;
  requiredJustVisual?: boolean;
  labelElement?: Element;
}

/**
 * Field component. Must be an observer.
 */

@observer
export class VSwitchField extends React.Component<ISwitchFieldProps> {
  constructor(props: ISwitchFieldProps) {
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
      margin,
      value,
      labelElement,
      innerLabel,
      requiredJustVisual,
      innerLabelChecked,
      tooltip
    } = this.props;
    if (fieldState) {
      if (required && !requiredJustVisual) {
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
      <StyledCheckBoxInput
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE}
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
          tooltip={tooltip}
        >
          <Switch
            name={id}
            large={size === 'large'}
            {...{
              disabled,
              id,
              inline,
              alignIndicator,
              labelElement,
              innerLabel,
              innerLabelChecked,
              label: ''
            }}
            onChange={this.onChange}
            checked={this.valueField}
          />
        </FormFieldContainer>
      </StyledCheckBoxInput>
    );
  }

  @computed
  get valueField() {
    if (this.props.fieldState) {
      return this.props.fieldState.value || false;
    }
    if (this.props.value) {
      return this.props.value;
    }
    return false;
  }

  onChange = (e: any) => {
    if (this.props.fieldState) {
      this.props.fieldState.onChange(e.target.checked);
    }
    if (this.props.onChange) {
      this.props.onChange!(e.target.checked);
    }
  };
}
