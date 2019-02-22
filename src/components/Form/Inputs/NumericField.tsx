import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
/** FieldState */ import {
  FormGroup,
  IconName,
  NumericInput,
  Intent
} from '@blueprintjs/core';

import { FieldState } from 'formstate';
import { ILayer } from './ILayer';
import { IFieldProps } from './IFieldProps';
import { StyledFormGroup } from './style';

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
      layer
    } = this.props;

    return (
      <StyledFormGroup
        className={className}
        disabled={disabled}
        helperText={fieldState.hasError && fieldState.error}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        fill={fill}
      >
        <label>{label}</label>
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
          value={fieldState.value || 0}
          intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        />
      </StyledFormGroup>
    );
  }

  onChange = (e: any, value: string) => {
    this.props.fieldState.onChange(e);
    if (this.props.onChange) {
      this.props.onChange!(e);
    }
  };
}
