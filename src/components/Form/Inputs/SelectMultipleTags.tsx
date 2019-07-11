import * as React from 'react';

import { Button, IconName, Intent, MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer, MultiSelect } from '@blueprintjs/select';
import { IFieldProps } from './IFieldProps';
import { IItemMultiple } from './SelectMultipleField';
import { FormFieldContainer } from './FormFieldContainer';
import { StyledPopOverWrapper } from './style';
import { validateAndGetArray } from '../utils';

const MultiSelectTag = MultiSelect.ofType<IItemMultiple>();

export interface ISelectMultipleTags extends IFieldProps {
  filterable?: boolean;
  options: IItemMultiple[];
  rightIcon?: IconName;
  icon?: IconName;
  fill?: boolean;
  defaultText?: string;
  fixedInputWidthPx?: number;
  iconOnly?: boolean;
}

export interface IMultiSelectExampleState {
  allowCreate: boolean;
  createdItems: IItemMultiple[];
  itemsSelected: IItemMultiple[];
  hasInitialContent: boolean;
  intent: boolean;
  openOnKeyDown: boolean;
  popoverMinimal: boolean;
  resetOnSelect: boolean;
  tagMinimal: boolean;
  updating: boolean;
}

export class VSelectMultipleTags extends React.Component<
  ISelectMultipleTags,
  IMultiSelectExampleState
> {
  public state: IMultiSelectExampleState = {
    allowCreate: false,
    createdItems: [],
    itemsSelected: [],
    hasInitialContent: false,
    intent: false,
    openOnKeyDown: false,
    popoverMinimal: true,
    resetOnSelect: true,
    tagMinimal: false,
    updating: false
  };

  componentDidMount() {
    if (validateAndGetArray(this.props, 'fieldState.value')) {
      const itemsToSelect =
        this.props.options.filter(item =>
          this.props.fieldState!.value.some(
            (fieldValue: any) => fieldValue === item.value
          )
        ) || [];
      itemsToSelect.forEach(item => {
        this.selectItem(item);
      });
      this.props.fieldState!.onDidChange(config => {
        const itemsToSelect =
          this.props.options.filter(item =>
            config.newValue.some((fieldValue: any) => fieldValue === item.value)
          ) || [];
        this.setState({ itemsSelected: itemsToSelect });
        if (this.props.onChange) {
          const ids = itemsToSelect.map(item => item.value);
          this.props.onChange!(ids);
        }
      });
    }
  }

  public render() {
    const { itemsSelected, popoverMinimal, ...flags } = this.state;

    const initialContent = this.state.hasInitialContent ? (
      <MenuItem
        disabled={true}
        text={`${this.props.options.length} items loaded.`}
      />
    ) : (
      undefined
    );

    const clearButton =
      itemsSelected.length > 0 ? (
        <Button
          icon="cross"
          className={'crossButton'}
          minimal={true}
          onClick={this.handleClear}
        />
      ) : (
        undefined
      );
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
      className,
      placeholder
    } = this.props;
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
          required={required}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
        >
          <MultiSelectTag
            itemPredicate={this.filterItem}
            placeholder={placeholder || ''}
            {...flags}
            initialContent={initialContent}
            itemRenderer={this.renderItem}
            itemsEqual={this.areItemsEqual}
            items={options}
            noResults={<MenuItem disabled={true} text="No results." />}
            onItemSelect={this.handleItemSelect}
            popoverProps={{ minimal: popoverMinimal }}
            tagRenderer={this.renderTag}
            tagInputProps={{
              onRemove: this.handleTagRemove,
              rightElement: clearButton
            }}
            selectedItems={this.state.itemsSelected}
          />
        </FormFieldContainer>
      </StyledPopOverWrapper>
    );
  }

  areItemsEqual = (itemA: IItemMultiple, itemB: IItemMultiple): boolean => {
    return itemA.value === itemB.value;
  };

  private renderTag = (item: IItemMultiple) => item.label;

  private renderItem: ItemRenderer<IItemMultiple> = (
    item,
    { modifiers, handleClick }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={this.isItemSelected(item) ? 'tick' : 'blank'}
        key={item.value}
        onClick={handleClick}
        text={`${item.label}`}
        shouldDismissPopover={false}
      />
    );
  };

  private handleTagRemove = (_tag: string, index: number) => {
    this.deselectItem(index);
  };

  private getSelectedItemIndex(item: IItemMultiple) {
    return this.state.itemsSelected.indexOf(item);
  }

  private isItemSelected(item: IItemMultiple) {
    return this.getSelectedItemIndex(item) !== -1;
  }

  private selectItem(item: IItemMultiple) {
    this.selectItems(item, this.updateFieldState);
  }

  private selectItems(itemsToSelect: IItemMultiple, callback?: any) {
    const { itemsSelected } = this.state;
    itemsSelected.push(itemsToSelect);
    this.setState(
      {
        itemsSelected
      },
      () => {
        if (callback) {
          callback();
        }
      }
    );
  }

  private deselectItem(index: number, callback?: any) {
    const { itemsSelected } = this.state;
    this.setState(
      {
        itemsSelected: itemsSelected.filter((_item, i) => i !== index)
      },
      () => {
        if (callback) {
          callback();
        }
      }
    );
  }

  private handleItemSelect = (item: IItemMultiple) => {
    if (!this.isItemSelected(item)) {
      this.selectItem(item);
    } else {
      this.deselectItem(this.getSelectedItemIndex(item), this.updateFieldState);
    }
  };

  updateFieldState = () => {
    if (this.props.fieldState) {
      const ids = this.state.itemsSelected.map(item => item.value);
      this.props.fieldState.onChange(ids);
    }
    if (this.props.onChange) {
      const ids = this.state.itemsSelected.map(item => item.value);
      this.props.onChange!(ids);
    }
  };

  private handleClear = () =>
    this.setState({ itemsSelected: [] }, () => {
      this.updateFieldState();
    });

  filterItem: ItemPredicate<IItemMultiple> = (
    query: string,
    item: IItemMultiple,
    index: number | undefined
  ) => {
    const normalizedTitle = item.label.toLowerCase();
    const normalizedQuery = query.toLowerCase();
    return normalizedTitle.indexOf(normalizedQuery) >= 0;
  };
}
