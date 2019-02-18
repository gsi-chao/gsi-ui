import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import {
  FormGroup,
  HTMLSelect,
  IIconProps,
  Intent,
  IOptionProps
} from '@blueprintjs/core';
/** FieldState */
import { FieldState } from 'formstate';

/**
 * Field Props
 */
export interface IFieldProps {
  /** Any UI stuff you need */
  label?: string;
  labelInfo?: string;
  icon?: Partial<IIconProps>;
  disabled?: boolean;
  inline?: boolean;
  options: IOptionProps[];
  size?: 'large';
  type?: any;
  loading?: boolean;
  minimal?: boolean;
  fill?: boolean;
  placeholder?: string;
  id: string;

  /** The fieldState */
  fieldState: FieldState<any>;
}

/**
 * Field component. Must be an observer.
 */

@observer
class BasicSelectField extends React.Component<IFieldProps> {
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
      icon,
      id,
      placeholder,
      options,
      minimal,
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
        <HTMLSelect
          options={options}
          iconProps={icon}
          name={id}
          large={size === 'large'}
          onChange={(e: any) => fieldState.onChange(e.target.value)}
          value={fieldState.value || ''}
          {...{
            disabled,
            placeholder,
            id,
            minimal,
            fill
          }}
        />
      </FormGroup>
    );
  }
}

export default BasicSelectField;
