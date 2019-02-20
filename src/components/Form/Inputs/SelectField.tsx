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
import { FieldState } from 'formstate';
import { ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select';

import '@blueprintjs/select/lib/css/blueprint-select.css';

/**
 * Field Props
 */
export interface IFieldProps {
  /** Any UI stuff you need */
  label?: string;
  labelInfo?: string;
  rightIcon?: IconName;
  icon?: IconName;
  disabled?: boolean;
  inline?: boolean;
  options: IItem[];
  type?: any;
  loading?: boolean;
  filterable?:boolean;
  id: string;

  /** The fieldState */
  fieldState: FieldState<any>;
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
  item: IItem;
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
export class VSelectField extends React.Component<IFieldProps, IState> {
  constructor(props: IFieldProps) {
    super(props);
    this.state = {
      item: this.props.fieldState.value || ''
    };
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
      filterable
    } = this.props;

    const initialContent =
      options && options.length === 0 ? (
        <MenuItem disabled={true} text={`${options.length} items loaded.`} />
      ) : (
        undefined
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
          <Button
            {...{
              icon,
              disabled
            }}
            rightIcon={rightIcon || 'caret-down'}
            text={this.state.item.label || '(No selection)'}
          />
        </ItemSelect>
      </FormGroup>
    );
  }
  onItemSelected = (value: IItem) => {
    this.setState({ item: value });
    this.props.fieldState.onChange(value.value);
  };
}
