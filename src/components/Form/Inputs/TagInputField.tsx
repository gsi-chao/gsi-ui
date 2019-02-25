import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import {
  Button,
  IconName,
  Intent,
  ITagProps,
  TagInput
} from '@blueprintjs/core';
import { IFieldProps } from './IFieldProps';
import { StyledTagsInput } from './style';
import { FormFieldContainer } from './FormFieldContainer';

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
      layer,
      noLabel
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
      <StyledTagsInput
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        fill={fill}
        noLabel={noLabel}
      >
        <FormFieldContainer noLabel={noLabel} label={label} fieldState={fieldState}>
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
        </FormFieldContainer>
      </StyledTagsInput>
    );
  }

  private handleChange = (values: React.ReactNode[]) => {
    this.props.fieldState.onChange(values);
  };

  private handleClear = () => this.handleChange([]);
}
