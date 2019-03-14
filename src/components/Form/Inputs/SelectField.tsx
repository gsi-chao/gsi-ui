import { observer } from 'mobx-react';
import React, { useState } from 'react';
/** Blueprint */
import {
  Button,
  FormGroup,
  IconName,
  Intent,
  MenuItem
} from '@blueprintjs/core';
/** FieldState */
import { ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select';

import '@blueprintjs/select/lib/css/blueprint-select.css';

import { IFieldProps } from './IFieldProps';
import { StyledPopOverWrapper } from './style';
import { FormFieldContainer } from './FormFieldContainer';
import * as validator from '../Validators';

/**
 * Field Props
 */
export interface ISelectFieldProps extends IFieldProps {
  filterable?: boolean;
  options: IItem[];
  rightIcon?: IconName;
  icon?: IconName;
  fill?: boolean;
  defaultText?: string;
  fixedInputWidthPx?: number;
  iconOnly?: boolean;
}

/**
 * Field component. Must be an observer.
 */

interface IItem {
  value: any;
  label: string;
  rep?: string;
}
interface IState {
  item: IItem | undefined;
}
const ItemSelect = Select.ofType<IItem>();

const renderItem: ItemRenderer<IItem> = (
  item,
  { handleClick, modifiers, query }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={item.rep}
      key={item.value}
      onClick={handleClick}
      text={item.label}
    />
  );
};

const filterItem: ItemPredicate<IItem> = (query, item) => {
  return `${item.label}`.indexOf(query.toLowerCase()) >= 0;
};

@observer
export class VSelectField extends React.Component<ISelectFieldProps, IState> {
  constructor(props: ISelectFieldProps) {
    super(props);
    this.state = {
      item: this.getFieldValue()
    };
  }

  public getFieldValue() {
    const fValue = this.props.fieldState.value;
    if (fValue) {
      const item = this.props.options.find((value: IItem) => {
        return fValue === value.value;
      });
      return item;
    }
    return undefined;
  }

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      disabled,
      inline,
      rightIcon,
      id,
      options,
      icon,
      filterable,
      className,
      layer,
      fill,
      noLabel,
      required,
      validators,
      fixedInputWidthPx,
      iconOnly,
      minimal,
      margin
    } = this.props;

    const defaultText = this.props.defaultText || 'No selection';

    const initialContent =
      options && options.length === 0 ? (
        <MenuItem
          className={className}
          disabled={true}
          text={`${options.length} items loaded.`}
        />
      ) : (
        undefined
      );
    if (required) {
      if (validators && validators.length > 0) {
        fieldState.validators(validator.required, ...validators);
      } else {
        fieldState.validators(validator.required);
      }
    } else if (validators && validators.length > 0) {
      fieldState.validators(...validators);
    }

    return (
      <StyledPopOverWrapper
        disabled={disabled}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        fill={fill}
        noLabel={noLabel}
        fixedInputWidthPx={fixedInputWidthPx}
        margin={margin}
      >
        <FormFieldContainer
          required={required}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
        >
          <ItemSelect
            itemPredicate={filterItem}
            itemRenderer={renderItem}
            items={options}
            disabled={disabled}
            initialContent={initialContent}
            noResults={<MenuItem disabled={true} text="No results." />}
            onItemSelect={this.onItemSelected}
            filterable={filterable}
          >
            {iconOnly ? (
              <Button
                className={minimal ? 'bp3-minimal' : ''}
                style={{ justifyContent: 'center' }}
                {...{
                  icon,
                  disabled
                }}
                text={iconOnly && undefined}
              />
            ) : (
              <Button
                className={minimal ? 'bp3-minimal' : ''}
                {...{
                  icon,
                  disabled
                }}
                rightIcon={rightIcon || 'chevron-down'}
                text={this.state.item ? this.state.item.label : defaultText}
              />
            )}
          </ItemSelect>
        </FormFieldContainer>
      </StyledPopOverWrapper>
    );
  }
  onItemSelected = (value: IItem) => {
    this.setState({ item: value });
    this.props.fieldState.onChange(value.value);
    if (this.props.onChange) {
      this.props.onChange!(value.value);
    }
  };
}
