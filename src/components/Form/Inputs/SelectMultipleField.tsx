import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { get, orderBy } from 'lodash';
/** Blueprint */
import {
  Button,
  Classes,
  Icon,
  IconName,
  Intent,
  MenuDivider,
  MenuItem,
  IPopoverProps
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
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { NoFocusMenu } from '../../SelectionList/style';
import { BLUEPRINTJS_CLASS_PREFIX } from '../../commons/constants';

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
  allowOrder?: boolean;
  orderDirection?: 'asc' | 'desc';
  popoverProps?: IPopoverProps;
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
  readonly?: boolean;
}

const clearToken = `$empty#Option#first#item_unique_`;

const ItemSelect: PropsWithChildren<any> = Select.ofType<IItemRenderer>();

const filterItem: ItemPredicate<IItemRenderer> = (query, value) => {
  return (
    `${value.item.label}`.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
    (value && value.item && value.item.value === clearToken)
  );
};

export const VSelectMultiple = observer((props: ISelectFieldProps) => {
  const selectedItem = useRef<IItemMultiple | null>();
  const changed = useRef<boolean>();
  const noChangeToClear = useRef<boolean>();
  const usedClear = useRef<boolean>();
  const [activeItem, setActiveItem] = useState<IItemRenderer | null>(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isOpenPopover, setIsOpenPopover] = useState<boolean>(false);
  const [query, setQuery] = useState<string | null>('');
  const ref = useRef<any>(null);

  const renderItem: ItemRenderer<IItemRenderer> = (
    { item, selectedItems },
    { handleClick, modifiers }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }

    const active =
      activeItem?.item?.value && item.value === activeItem?.item?.value;

    const founded = selectedItems.some(
      selected => selected.value === item.value
    );
    return (
      <MenuItem
        icon={founded ? 'tick' : 'blank'}
        disabled={modifiers.disabled}
        label={item.rep}
        active={active}
        key={item.value}
        onClick={handleClick}
        text={item.label}
        shouldDismissPopover={item.value === clearToken}
        labelElement={
          item.value === clearToken && item.label === 'No Selection' ? (
            <Icon color={(active && 'white') || '#7486949c'} icon={'reset'} />
          ) : null
        }
      />
    );
  };

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
      setActiveItem({
        item: get<IItemMultiple[], string, any>(getOptions(), '[0]', null),
        selectedItems: []
      });
      setSelectedItems([]);
    }
    if (callBack) {
      callBack();
    }
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
                  <MenuDivider
                    key={`divider_$index`}
                    className={'dividerNoMargin'}
                  />
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
        <StyledMenuNoMarginDivider ulRef={itemsParentRef}>
          {renderedItems.length > 0 ? (
            itemsToRender
          ) : (
            <MenuItem disabled={true} text="No results." />
          )}
        </StyledMenuNoMarginDivider>
      </>
    );
  };

  const getOptions = (): IItemMultiple[] => {
    const { options, allowEmptyItem } = props;
    const newOptions =
      (options &&
        options.length > 0 &&
        (props.allowOrder
          ? orderBy(options, ['label'], [props.orderDirection || false])
          : options)) ||
      [];
    if (
      allowEmptyItem &&
      options &&
      options.length > 0 &&
      selectedItems &&
      selectedItems.length > 0
    ) {
      return [{ value: clearToken, label: 'No Selection' }, ...newOptions];
    }
    return newOptions;
  };

  const onItemSelected = (value: IItemRenderer) => {
    if (usedClear.current) {
      noChangeToClear.current = true;
      usedClear.current = false;
    }
    if (value?.item?.value === clearToken) {
      usedClear.current = true;
    } else {
      selectedItem.current = value?.item;
    }
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
    layer,
    fill,
    noLabel,
    required,
    validators,
    fixedInputWidthPx,
    iconOnly,
    minimal,
    margin,
    tipLabel,
    tooltip,
    displayRequired,
    popoverMinimal,
    popoverProps
  } = props;

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

  const areItemsEqual = (
    itemA: IItemRenderer,
    itemB: IItemRenderer
  ): boolean => {
    return itemA.item?.value === itemB.item?.value;
  };

  const clearActive = () => {
    if (ref?.current?.hasOwnProperty('previousFocusedElement')) {
      ref.current.previousFocusedElement = undefined;
    }
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
        {tipLabel && <span className={'tipLabel'}>{tipLabel}</span>}
        <ItemSelect
          ref={ref}
          activeItem={activeItem}
          onActiveItemChange={(value: any) => {
            if (!changed.current) {
              if (selectedItem.current) {
                setActiveItem({
                  item: selectedItem.current,
                  selectedItems: []
                });
                if (noChangeToClear.current) {
                  noChangeToClear.current = false;
                } else {
                  selectedItem.current = null;
                }
              } else {
                setActiveItem(value);
              }
              changed.current = true;
            } else {
              changed.current = false;
            }
          }}
          popoverProps={{
            minimal: popoverMinimal,
            captureDismiss: true,
            isOpen: isOpenPopover,
            onInteraction: handleInteraction,
            onOpening: clearActive,
            onClosing: clearActive,
            modifiers: {
              flip: { enabled: true },
              keepTogether: { enabled: true },
              preventOverflow: { enabled: true }
            },
            shouldReturnFocusOnClose: false,
            ...popoverProps
          }}
          itemPredicate={filterItem}
          itemRenderer={renderItem}
          items={renderOptions}
          disabled={disabled}
          itemsEqual={areItemsEqual}
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
              className={minimal ? `${BLUEPRINTJS_CLASS_PREFIX}-minimal` : ''}
              style={{ justifyContent: 'center' }}
              {...{
                icon,
                disabled
              }}
              text={iconOnly && undefined}
            />
          ) : (
            <Button
              className={minimal ? `${BLUEPRINTJS_CLASS_PREFIX}-minimal` : ''}
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

export const StyledMenuNoMarginDivider = styled(NoFocusMenu)`
  & .dividerNoMargin {
    margin: 0;
  }
`;
