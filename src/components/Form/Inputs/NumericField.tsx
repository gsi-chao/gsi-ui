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

/**
 * Field Props
 */
export interface IFieldProps {
  /** Any UI stuff you need */
  label?: string;
  labelInfo?: string;
  leftIcon?: IconName;
  rightElement?: Element;
  disabled?: boolean;
  inline?: boolean;
  size?: 'large';
  type?: any;
  loading?: boolean;
  placeholder?: string;
  id: string;
  min?: number;
  max?: number;
  buttonPosition?: 'left' | 'right' | 'none';
  fill?: boolean;

  /** The fieldState */
  fieldState: FieldState<any>;
}

/**
 * Field component. Must be an observer.
 */

@observer
class NumericField extends React.Component<IFieldProps> {
  constructor(props: IFieldProps) {
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
      fill
    } = this.props;

    return (
      <FormGroup
        disabled={disabled}
        helperText={fieldState.hasError && fieldState.error}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        label={label}
        labelFor={id}
        labelInfo={labelInfo}
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
          onValueChange={(_v: number, value: string) => fieldState.onChange(_v)}
          value={fieldState.value || 0}
          intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        />
      </FormGroup>
    );
  }
}

export default NumericField;
