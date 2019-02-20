import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import { FormGroup, IconName, InputGroup, Intent } from '@blueprintjs/core';
/** FieldState */
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
  round?: boolean;
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
export class VInputField extends React.Component<IFieldProps> {
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
      type,
      placeholder,
      rightElement,
      round,
      id
    } = this.props;
    let rightEl;
    if (!rightElement) {
      rightEl = <div />;
    }
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
        <InputGroup
          large={size === 'large'}
          small={size === 'small'}
          rightElement={rightEl}
          name={id}
          {...{
            round,
            leftIcon,
            type,
            disabled,
            placeholder,
            id
          }}
          onChange={(e: any) => fieldState.onChange(e.target.value)}
          value={fieldState.value || ''}
          intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        />
      </FormGroup>
    );
  }
}
