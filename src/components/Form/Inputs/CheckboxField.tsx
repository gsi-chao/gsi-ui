import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
/** FieldState */ import {
  FormGroup,
  IconName,
  NumericInput,
  Intent,
  Checkbox,
  Alignment
} from '@blueprintjs/core';

import { FieldState } from 'formstate';

/**
 * Field Props
 */
export interface IFieldProps {
  /** Any UI stuff you need */
  label?: string;
  labelInfo?: string;
  rightElement?: Element;
  disabled?: boolean;
  inline?: boolean;
  size?: 'large';
  loading?: boolean;
  alignIndicator?: Alignment;
  id: string;

  /** The fieldState */
  fieldState: FieldState<any>;
}

/**
 * Field component. Must be an observer.
 */

@observer
class CheckboxField extends React.Component<IFieldProps> {
  constructor(props: IFieldProps) {
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
      id
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
        <Checkbox
          name={id}
          large={size === 'large'}
          {...{
            disabled,
            id,
            inline,
            alignIndicator
          }}
          onChange={(e: any) => fieldState.onChange(e.target.checked)}
          checked={fieldState.value || false}
        />
      </FormGroup>
    );
  }
}

export default CheckboxField;
