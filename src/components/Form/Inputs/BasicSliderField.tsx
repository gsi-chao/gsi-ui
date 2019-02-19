import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
/** FieldState */ import {
  FormGroup,
  IconName,
  NumericInput,
  Intent,
  Slider
} from '@blueprintjs/core';

import { FieldState } from 'formstate';

/**
 * Field Props
 */
export interface IFieldProps {
  /** Any UI stuff you need */
  label?: string;
  labelInfo?: string;
  disabled?: boolean;
  inline?: boolean;
  size?: 'large';
  type?: any;
  loading?: boolean;
  id: string;
  min?: number;
  max?: number;
  stepSize?: number;
  labelStepSize?: number;
  vertical?: boolean;

  /** The fieldState */
  fieldState: FieldState<any>;
}

/**
 * Field component. Must be an observer.
 */

@observer
export class VBasicSliderField extends React.Component<IFieldProps> {
  constructor(props: IFieldProps) {
    super(props);
  }

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      disabled,
      inline,
      id,
      min,
      max,
      stepSize,
      labelStepSize
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
        <Slider
          {...{
            disabled,
            id,
            min,
            max,
            stepSize,
            labelStepSize
          }}
          onChange={(_v: number) => fieldState.onChange(_v)}
          value={fieldState.value || 0}
        />
      </FormGroup>
    );
  }
}
