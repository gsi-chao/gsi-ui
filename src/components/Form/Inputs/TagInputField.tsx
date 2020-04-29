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
import { Validators } from '../Validators';
import { showToastNotification } from '../../ToastNotification';
import { computed } from 'mobx';
import { isArray } from 'lodash';

/**
 * Field Props
 */
export interface TagValidation {
  regex: RegExp;
  errorMessage: string;
}

export interface ITagFieldProps extends IFieldProps {
  leftIcon?: IconName;
  tagProps?: ITagProps | ((value: React.ReactNode, index: number) => ITagProps);
  fill?: boolean;
  limit?: number;
  separator?: string | RegExp;
  tagValidation?: TagValidation;
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
      noLabel,
      required,
      validators,
      value,
      separator,
      tooltip,
      displayRequired,
      margin
    } = this.props;
    if (fieldState) {
      if (required) {
        if (validators && validators.length > 0) {
          fieldState.validators(Validators.required, ...validators);
        } else {
          fieldState.validators(Validators.required);
        }
      } else if (validators && validators.length > 0) {
        fieldState.validators(...validators);
      }
    }

    const clearButton = (
      <Button
        disabled={disabled}
        icon={
          (!!fieldState && fieldState.$ && fieldState.$.length > 0) ||
          (!!value && value.length > 0)
            ? 'cross'
            : 'refresh'
        }
        minimal={true}
        onClick={this.handleClear}
      />
    );

    return (
      <StyledTagsInput
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        fill={fill}
        noLabel={noLabel}
        margin={margin}
      >
        <FormFieldContainer
          required={required || displayRequired}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
          tooltip={tooltip}
        >
          <TagInput
            separator={separator}
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
            values={this.valueField}
            intent={
              fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE
            }
          />
        </FormFieldContainer>
      </StyledTagsInput>
    );
  }

  @computed
  get valueField() {
    if (this.props.fieldState && isArray(this.props.fieldState.value)) {
      return this.props.fieldState.value;
    }
    if (this.props.value && isArray(this.props.value)) {
      return this.props.value;
    }
    return [];
  }

  private handleChange = (values: React.ReactNode[]) => {
    let newValues = values;
    if (
      this.props.limit &&
      newValues &&
      newValues.length > 0 &&
      newValues.length > this.props.limit
    ) {
      newValues = newValues.filter(
        (item, index) => this.props.limit && index < this.props.limit
      );
    }
    if (this.props.tagValidation && this.props.tagValidation.regex) {
      newValues = newValues.filter(item => {
        const result =
          this.props.tagValidation &&
          this.props.tagValidation.regex.test((item && item.toString()) || '');
        if (!result) {
          showToastNotification({
            message: `${(item && item.toString()) || ''} ${(this.props
              .tagValidation &&
              this.props.tagValidation.errorMessage) ||
              'is not valid'}`,
            type: 'danger'
          });
        }
        return result;
      });
    }
    if (this.props.fieldState) {
      this.props.fieldState.onChange(newValues);
    }
    if (this.props.onChange) {
      this.props.onChange!(newValues);
    }
  };

  private handleClear = () => this.handleChange([]);
}
