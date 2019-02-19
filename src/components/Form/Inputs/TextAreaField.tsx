import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import { FormGroup, Intent, TextArea } from '@blueprintjs/core';
/** FieldState */
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
  size?: 'large' | 'small';
  type?: any;
  loading?: boolean;
  placeholder?: string;
  id: string;

  /** The fieldState */
  fieldState: FieldState<any>;
}

/**
 * Field component. Must be an observer.
 */

@observer
export class VTextAreaField extends React.Component<IFieldProps> {
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
        <TextArea
          large={size === 'large'}
          small={size === 'small'}
          onChange={(e: any) => fieldState.onChange(e.target.value)}
          value={fieldState.value || ''}
          intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
          name={id}
          {...{
            disabled,
            id
          }}
        />
      </FormGroup>
    );
  }
}
