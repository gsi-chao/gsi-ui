import React, { useEffect, useState } from 'react';
import { Button, HTMLInputProps, IconName, Intent, ITagProps, MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer } from '@blueprintjs/select';
import { IFieldProps } from './IFieldProps';
import { IItemMultiple } from './SelectMultipleField';
import { FormFieldContainer } from './FormFieldContainer';
import { StyledPopOverWrapper } from './style';
import { observer } from 'mobx-react-lite';
import { VMultiSelect } from './VMultiSelect';
import { orderBy } from 'lodash';

const MultiSelectTag = VMultiSelect.ofType<IItemMultiple>();

export interface ISelectMultipleTags extends IFieldProps {
  filterable?: boolean;
  options: IItemMultiple[];
  rightIcon?: IconName;
  icon?: IconName;
  fill?: boolean;
  defaultText?: string;
  fixedInputWidthPx?: number;
  iconOnly?: boolean;
  tagProps?: ITagProps | ((value: React.ReactNode, index: number) => ITagProps);
  inputRef?: (input: HTMLInputElement | null) => void;
  inputProps?: HTMLInputProps;
  resetOnClose?: boolean;
  allowOrder?: boolean;
  orderDirection?: 'asc' | 'desc';
}

export const VSelectMultipleTags = observer((props: ISelectMultipleTags) => {
  const [itemsSelected, setItemsSelected] = useState<IItemMultiple[]>([]);
  const {
    disabled,
    inline,
    fieldState,
    id,
    labelInfo,
    layer,
    fill,
    noLabel,
    fixedInputWidthPx,
    margin,
    required,
    options,
    label,
    tagProps,
    inputRef,
    resetOnClose,
    inputProps,
    tooltip,
    placeholder,
    displayRequired,
    value
  } = props;

  useEffect(() => {
    updateFieldState();
  }, [itemsSelected]);

  useEffect(() => {
    const newValue = (fieldState && fieldState.$) || value || [];
    if (newValue.length !== itemsSelected.length) {
      setItemsSelected(
        options.filter(item => newValue.some((el: any) => el === item.value))
      );
    } else {
      if (newValue.length > 0) {
        const founded = newValue.some(
          (item: any, index: number) =>
            itemsSelected.length > index && item !== itemsSelected[index].value
        );
        if (founded) {
          setItemsSelected(
            options.filter(item =>
              newValue.some((el: any) => el === item.value)
            )
          );
        }
      }
    }
  }, [fieldState && fieldState.$, value]);

  const areItemsEqual = (
    itemA: IItemMultiple,
    itemB: IItemMultiple
  ): boolean => {
    return itemA.value === itemB.value;
  };

  const renderTag = (item: IItemMultiple) => item.label;

  const renderItem: ItemRenderer<IItemMultiple> = (
    item,
    { modifiers, handleClick }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        disabled={props.disabled}
        active={false}
        icon={isItemSelected(item) ? 'tick' : 'blank'}
        key={item.value}
        onClick={handleClick}
        text={`${item.label}`}
        shouldDismissPopover={false}
      />
    );
  };

  const handleTagRemove = (_tag: string, index: number) => {
    deselectItem(index);
  };

  const getSelectedItemIndex = (item: IItemMultiple) => {
    return itemsSelected.indexOf(item);
  };

  const isItemSelected = (item: IItemMultiple) => {
    return getSelectedItemIndex(item) !== -1;
  };

  const selectItem = (item: IItemMultiple) => {
    selectItems(item);
  };

  const selectItems = (itemsToSelect: IItemMultiple) => {
    setItemsSelected([...itemsSelected, itemsToSelect]);
  };

  const deselectItem = (index: number) => {
    setItemsSelected(itemsSelected.filter((_item, i) => i !== index));
  };

  const handleItemSelect = (item: IItemMultiple) => {
    if (!isItemSelected(item)) {
      selectItem(item);
    } else {
      deselectItem(getSelectedItemIndex(item));
    }
  };

  const updateFieldState = () => {
    if (props.fieldState) {
      const ids = itemsSelected.map(item => item.value);
      props.fieldState.onChange(ids);
    }
    if (props.onChange) {
      const ids = itemsSelected.map(item => item.value);
      props.onChange!(ids);
    }
  };

  const handleClear = () => {
    setItemsSelected([]);
  };

  const filterItem: ItemPredicate<IItemMultiple> = (
    query: string,
    item: IItemMultiple,
    index: number | undefined
  ) => {
    const normalizedTitle = item.label.toLowerCase();
    const normalizedQuery = query.toLowerCase();
    return normalizedTitle.indexOf(normalizedQuery) >= 0;
  };

  const initialContent = undefined;

  const clearButton =
    itemsSelected.length > 0 ? (
      <Button
        icon="cross"
        className={'crossButton'}
        minimal={true}
        onClick={handleClear}
      />
    ) : (
      undefined
    );

  return (
    <StyledPopOverWrapper
      disabled={disabled}
      inline={inline}
      intent={fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE}
      labelFor={id}
      labelInfo={labelInfo}
      layer={layer}
      fill={fill}
      noLabel={noLabel}
      fixedInputWidthPx={fixedInputWidthPx}
      margin={margin}
    >
      <FormFieldContainer
        required={required || displayRequired}
        noLabel={noLabel}
        label={label}
        fieldState={fieldState}
        tooltip={tooltip}
      >
        <MultiSelectTag
          itemPredicate={filterItem}
          placeholder={placeholder || ''}
          openOnKeyDown={false}
          resetOnSelect={true}
          itemRenderer={renderItem}
          itemsEqual={areItemsEqual}
          items={
            props.allowOrder
              ? orderBy(
                  options,
                  ['label'],
                  [props.orderDirection || false]
                )
              : options
          }
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={handleItemSelect}
          popoverProps={{ minimal: true }}
          tagRenderer={renderTag}
          tagInputProps={{
            disabled,
            tagProps,
            inputRef,
            inputProps,
            onRemove: (!props.disabled && handleTagRemove) || (() => {}),
            rightElement: (!props.disabled && clearButton) || <></>
          }}
          selectedItems={itemsSelected}
          {...{ initialContent, resetOnClose }}
        />
      </FormFieldContainer>
    </StyledPopOverWrapper>
  );
});
