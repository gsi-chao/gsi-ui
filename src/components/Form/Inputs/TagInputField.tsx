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
import { IFieldProps } from './IFieldProps';
import { StyledFormGroup } from './style';

/**
 * Field Props
 */
export interface ITagFieldProps extends IFieldProps {
  leftIcon?: IconName;
  tagProps?: ITagProps | ((value: React.ReactNode, index: number) => ITagProps);
  fill?: boolean;
}

/**
 * Field component. Must be an observer.
 */

@observer
export class VTagInputField extends React.Component<ITagFieldProps> {
  constructor(props: ITagFieldProps) {
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
      tagProps,
      className,
      layer
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
      </StyledFormGroup>
    );
  }

  private handleChange = (values: React.ReactNode[]) => {
    this.props.fieldState.onChange(values);
    if (this.props.onChange) {
      this.props.onChange!(values);
    }
  };

  private handleClear = () => this.handleChange([]);
}
