import React, { useEffect, useState } from 'react';
import { uniqueId } from 'lodash';
/** Blueprint */
import {
  Button,
  IconName,
  Intent,
  MenuItem,
  Classes,
  Icon,
  MenuDivider,
  Menu
} from '@blueprintjs/core';
/** FieldState */
import {
  ItemListRenderer,
  ItemPredicate,
  ItemRenderer,
  Select
} from '@blueprintjs/select';

import '@blueprintjs/select/lib/css/blueprint-select.css';

import { IFieldProps } from './IFieldProps';
import { StyledPopOverWrapper } from './style';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

/**
 * Field Props
 */
export interface ISelectFieldProps extends IFieldProps {
  filterable?: boolean;
  options: IItemMultiple[];
  rightIcon?: IconName;
  icon?: IconName;
  fill?: boolean;
  defaultText?: string;
  fixedInputWidthPx?: number;
  iconOnly?: boolean;
  tipLabel?: string;
  resetOnClose?: boolean;
  clearButton?: boolean;
  isLoading?: boolean;
  popoverMinimal?: boolean;
  allowEmptyItem?: boolean;
}

/**
 * Field component. Must be an observer.
 */

interface IItemRenderer {
  item: IItemMultiple;
  selectedItems: IItemMultiple[];
}

export interface IItemMultiple {
  value: any;
  label: string;
  rep?: string;
}

const clearToken = `$empty#Option#first#item_unique_`;

interface IState {
  selectedItems: IItemMultiple[];
  isOpenPopover: boolean;
}

const ItemSelect = Select.ofType<IItemRenderer>();

const renderItem: ItemRenderer<IItemRenderer> = (
  { item, selectedItems },
  { handleClick, modifiers }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }

  const founded = selectedItems.some(selected => selected.value === item.value);
  return (
    <MenuItem
      icon={founded ? 'tick' : 'blank'}
      disabled={modifiers.disabled}
      label={item.rep}
      key={item.value}
      onClick={handleClick}
      text={item.label}
      shouldDismissPopover={item.value === clearToken}
      labelElement={
        item.value === clearToken && item.label === 'No Selection' ? (
          <Icon color={'#7486949c'} icon={'reset'} />
        ) : null
      }
    />
  );
};

const filterItem: ItemPredicate<IItemRenderer> = (query, value) => {
  return (
    `${value.item.label}`.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
    (value && value.item && value.item.value === clearToken)
  );
};

export const VSelectMultiple = observer((props: ISelectFieldProps) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isOpenPopover, setIsOpenPopover] = useState<boolean>(false);
  const [query, setQuery] = useState<string | null>('');

  useEffect(() => {
    if (props.fieldState) {
      const ids = (props.fieldState && toJS(props.fieldState.value)) || [];

      updateSelectItems(ids);
    }
  }, [props.fieldState && props.fieldState.value]);

  useEffect(() => {
    if (props.value) {
      const ids = (props.value && props.value) || [];
      updateSelectItems(ids);
    }
  }, [props.value]);

  const updateSelectItems = (ids: any[]) => {
    const selectedItemss = props.options.filter(option => {
      if (ids && Array.isArray(ids) && ids.length > 0) {
        return ids.some((id: any) => id.toString() === option.value.toString());
      }
      return false;
    });
    setSelectedItems(selectedItemss);
  };

  const getFieldText = () => {
    if (selectedItems.length === 1) {
      return selectedItems[0].label;
    }
    if (selectedItems.length > 1) {
      return `${selectedItems.length} Items selected`;
    }
    return props.defaultText || 'No selection';
  };

  const selectOrDeselectItem = (value: IItemMultiple, callBack?: any) => {
    if (value && value.value !== clearToken) {
      let outerIndex = -1;
      if (
        selectedItems &&
        Array.isArray(selectedItems) &&
        selectedItems.length > 0
      ) {
        selectedItems.some((item, index) => {
          const result = item.value.toString() === value.value.toString();
          if (result) {
            outerIndex = index;
          }
          return result;
        });
      }

      if (outerIndex === -1) {
        selectedItems.push(value);
      } else {
        selectedItems.splice(outerIndex, 1);
      }
      setSelectedItems(selectedItems);
    } else if (props.allowEmptyItem && value && value.value === clearToken) {
      setSelectedItems([]);
    }
    if (callBack) {
      callBack();
    }
    // this.setState({ selectedItems }, () => {
    //   if (callBack) {
    //     callBack();
    //   }
    // });
  };

  const renderMenu: ItemListRenderer<IItemRenderer> = ({
    items,
    itemsParentRef,
    query,
    renderItem
  }) => {
    const renderedItems = items.map(renderItem).filter(item => item != null);
    const itemsToRender =
      props.allowEmptyItem &&
      renderedItems.length > 0 &&
      selectedItems &&
      selectedItems.length > 0 ? (
        <>
          {renderedItems.map((item, index: number) => {
            if (index === 0) {
              return (
                <React.Fragment key={index}>
                  {item}
                  <MenuDivider key={`divider_$index`} />
                </React.Fragment>
              );
            }
            return item;
          })}
        </>
      ) : (
        renderedItems
      );
    return (
      <>
        <Menu ulRef={itemsParentRef}>
          {renderedItems.length > 0 ? (
            itemsToRender
          ) : (
            <MenuItem disabled={true} text="No results." />
          )}
        </Menu>
      </>
    );
  };

  const getOptions = (): IItemMultiple[] => {
    const { options, allowEmptyItem } = props;
    if (
      allowEmptyItem &&
      options &&
      options.length > 0 &&
      selectedItems &&
      selectedItems.length > 0
    ) {
      return [{ value: clearToken, label: 'No Selection' }, ...options];
    }
    return options;
  };

  const onItemSelected = (value: IItemRenderer) => {
    const itemValue =
      props.allowEmptyItem && value && value.item && value.item.value;
    const updateFieldState = () => {
      if (props.fieldState) {
        const ids = selectedItems.map(item => item.value);
        fieldState!.onChange(itemValue === clearToken ? [] : ids);
      }
      if (props.onChange) {
        const ids = selectedItems.map(item => item.value);
        props.onChange!(itemValue === clearToken ? [] : ids);
      }
    };
    selectOrDeselectItem(value.item, updateFieldState);
  };

  const {
    label,
    labelInfo,
    fieldState,
    disabled,
    inline,
    rightIcon,
    id,
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
    margin,
    options,
    tipLabel,
    tooltip,
    displayRequired,
    popoverMinimal
  } = props;

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

  const renderOptions = getOptions().map(item => ({ item, selectedItems }));

  const handleInteraction = (nextOpenState: boolean) => {
    setIsOpenPopover(nextOpenState);
    // this.setState({ isOpenPopover: nextOpenState });
  };

  const onClear = () => {
    setQuery('');
  };

  const renderClearButton = () => (
    <Button
      style={{ width: '30px' }}
      minimal
      onClick={onClear}
      rightIcon={'filter-remove'}
    />
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
        {tipLabel && <span className={'tipLabel'}>{tipLabel}</span>}
        <ItemSelect
          popoverProps={{
            minimal: popoverMinimal,
            captureDismiss: true,
            isOpen: isOpenPopover,
            onInteraction: handleInteraction,
            modifiers: {
              arrow: { enabled: true },
              flip: { enabled: true },
              keepTogether: { enabled: true },
              preventOverflow: { enabled: true }
            }
          }}
          itemPredicate={filterItem}
          itemRenderer={renderItem}
          items={renderOptions}
          disabled={disabled}
          itemListRenderer={renderMenu}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={onItemSelected}
          filterable={filterable}
          resetOnClose={props.resetOnClose && props.resetOnClose}
          onQueryChange={(value: string) => setQuery(value)}
          query={query || ''}
          inputProps={{
            rightElement: renderClearButton()
          }}
          className={props.isLoading ? Classes.SKELETON : ''}
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
              text={getFieldText()}
            />
          )}
        </ItemSelect>
      </FormFieldContainer>
    </StyledPopOverWrapper>
  );
});
