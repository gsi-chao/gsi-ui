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
import {IFieldProps} from "./IFieldProps";
import {StyledFormGroup} from "./style";
import { FormFieldContainer } from './FormFieldContainer';

/**
 * Field Props
 */
export interface ISelectFieldProps extends IFieldProps{
    filterable?:boolean;
    options: IItem[];
    rightIcon?: IconName;
    icon?: IconName;


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
export class VSelectField extends React.Component<ISelectFieldProps, IState> {
  constructor(props: ISelectFieldProps) {
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
      filterable,
      className,
      layer
    } = this.props;

    const initialContent =
      options && options.length === 0 ? (
        <MenuItem className={className} disabled={true} text={`${options.length} items loaded.`} />
      ) : (
        undefined
      );

    return (
      <StyledFormGroup
        disabled={disabled}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
      >
        <FormFieldContainer label={label} fieldState={fieldState}>
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
        </FormFieldContainer>
      </StyledFormGroup>
    );
  }
  onItemSelected = (value: IItem) => {
    this.setState({ item: value });
    this.props.fieldState.onChange(value.value);
  };
}
