import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  HTMLInputProps,
  IconName,
  Intent,
  ITagProps,
  MenuItem
} from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer } from '@blueprintjs/select';
import { IFieldProps } from './IFieldProps';
import { IItemMultiple } from './SelectMultipleField';
import { FormFieldContainer } from './FormFieldContainer';
import { StyledPopOverWrapper } from './style';
import { observer } from 'mobx-react';
import { VMultiSelect } from './VMultiSelect';
import { isArray, orderBy } from 'lodash';
import { Validators } from '../Validators';

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
  const selectedItem = useRef<IItemMultiple | null>();
  const changed = useRef<boolean>();
  const [activeItem, setActiveItem] = useState<IItemMultiple | null>(null);
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
    resetOnClose = true,
    inputProps,
    tooltip,
    placeholder,
    displayRequired,
    value,
    validators
  } = props;

  useEffect(() => {
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
  }, [fieldState, validators, required]);

  useEffect(() => {
    const tValue = fieldState?.value ?? value ?? [];
    const newValue = isArray(tValue) ? tValue : [];

    if (newValue.length !== itemsSelected.length) {
      setItemsSelected(
        options.filter(item => newValue.some((el: any) => el === item.value))
      );
    } else {
      if (newValue.length > 0) {
        const founded = newValue?.some(
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
  }, [fieldState && fieldState?.value, value, options]);

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
    const active = activeItem?.value && item.value === activeItem?.value;

    return (
      <MenuItem
        disabled={props.disabled}
        active={active}
        icon={isItemSelected(item) ? 'tick' : 'blank'}
        key={item.value}
        onClick={handleClick}
        text={`${item.label}`}
        shouldDismissPopover={false}
      />
    );
  };

  const handleTagRemove = (_tag: React.ReactNode, index: number) => {
    deselectItem(index);
  };

  const getSelectedItemIndex = (item: IItemMultiple) => {
    return itemsSelected.findIndex(
      element => JSON.stringify(element) === JSON.stringify(item)
    );
  };

  const isItemSelected = (item: IItemMultiple) => {
    return getSelectedItemIndex(item) !== -1;
  };

  const selectItem = (item: IItemMultiple) => {
    selectItems(item);
  };

  const selectItems = (itemsToSelect: IItemMultiple) => {
    const newState = [...itemsSelected, itemsToSelect];
    updateFieldState(newState);
  };

  const deselectItem = (index: number) => {
    const newState = itemsSelected.filter((_item, i) => i !== index);
    updateFieldState(newState);
  };

  const handleItemSelect = (item: IItemMultiple) => {
    selectedItem.current = item;
    setActiveItem(item);
    if (!isItemSelected(item)) {
      selectItem(item);
    } else {
      deselectItem(getSelectedItemIndex(item));
    }
  };

  const updateFieldState = (items: IItemMultiple[] = itemsSelected) => {
    const ids = items.map(item => item.value);

    props.fieldState?.onChange(ids);
    props.onChange?.(ids);
  };

  const handleClear = () => {
    setItemsSelected([]);
    props.fieldState?.onChange([]);
    props.onChange?.([]);
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

  const getItems = () =>
    props.allowOrder
      ? orderBy(options, ['label'], [props.orderDirection || false])
      : options;

  const clearActive = () => {
    setActiveItem(null);
    changed.current = true;
  };

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
          activeItem={activeItem}
          onActiveItemChange={item => {
            if (!changed.current) {
              if (selectedItem.current) {
                setActiveItem(selectedItem.current);
                selectedItem.current = null;
              }
              changed.current = true;
            } else {
              changed.current = false;
            }
          }}
          itemPredicate={filterItem}
          placeholder={placeholder || ''}
          openOnKeyDown={false}
          resetOnSelect={true}
          itemRenderer={renderItem}
          itemsEqual={areItemsEqual}
          items={getItems()}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={handleItemSelect}
          popoverProps={{
            minimal: true,
            onClose: () => {
              selectedItem.current = null;
              changed.current = false;
              setActiveItem(null);
            },
            onOpening: clearActive,
            onClosing: clearActive
          }}
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
