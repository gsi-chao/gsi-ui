import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import {
  Button,
  FormGroup,
  IconName,
  Intent,
  ITagProps,
  TagInput
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
  leftIcon?: IconName;
  tagProps?: ITagProps | ((value: React.ReactNode, index: number) => ITagProps);
  disabled?: boolean;
  inline?: boolean;
  size?: 'large' | 'small';
  loading?: boolean;
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
export class VTagInputField extends React.Component<IFieldProps> {
  constructor(props: IFieldProps) {
    super(props);
  }

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      leftIcon,
      fill,
      size,
      disabled,
      inline,
      placeholder,
      id,
      tagProps
    } = this.props;

    const clearButton = (
      <Button
        disabled={disabled}
        icon={fieldState.value.length > 0 ? 'cross' : 'refresh'}
        minimal={true}
        onClick={this.handleClear}
      />
    );

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
        <TagInput
          {...{
            leftIcon,
            disabled,
            placeholder,
            id,
            fill
          }}
          rightElement={clearButton}
          tagProps={tagProps}
          large={size === 'large'}
          onChange={this.handleChange}
          values={fieldState.value || []}
          intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        />
      </FormGroup>
    );
  }

  private handleChange = (values: React.ReactNode[]) => {
    this.props.fieldState.onChange(values);
  };

  private handleClear = () => this.handleChange([]);
}
