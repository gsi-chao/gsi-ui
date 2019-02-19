import { observer } from 'mobx-react';
import * as React from 'react';
/** FieldState */
import { FieldState } from 'formstate';

/** Blueprint */
import {
  FormGroup,
  Intent,
  Alignment,
  Radio,
  RadioGroup,
  IOptionProps
} from '@blueprintjs/core';

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
  loading?: boolean;
  alignIndicator?: Alignment;
  id: string;
  options: IOptionProps[];
  /** The fieldState */
  fieldState: FieldState<any>;
}

/**
 * Field component. Must be an observer.
 */

@observer
export class VRadioGroupField extends React.Component<IFieldProps> {
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
      alignIndicator,
      id,
      options
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
        <RadioGroup
          name={id}
          {...{
            disabled,
            id,
            inline,
            alignIndicator
          }}
          onChange={(e: any) => fieldState.onChange(e.target.value)}
          selectedValue={fieldState.value}
          options={options}
        />
      </FormGroup>
    );
  }
}
