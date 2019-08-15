import React, { useEffect, useState } from 'react';
/** Blueprint */
import { Button, IconName, Intent, MenuItem } from '@blueprintjs/core';
/** FieldState */
import { ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select';

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
      shouldDismissPopover={false}
    />
  );
};

const filterItem: ItemPredicate<IItemRenderer> = (query, value) => {
  return `${value.item.label}`.toLowerCase().indexOf(query.toLowerCase()) >= 0;
};

export const VSelectMultiple = observer((props: ISelectFieldProps) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isOpenPopover, setIsOpenPopover] = useState<boolean>(false);

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
      if (ids && ids.length > 0) {
        return ids.some((id: any) => id === option.value);
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
    let outerIndex = -1;
    if (selectedItems && selectedItems.length > 0) {
      selectedItems.some((item, index) => {
        const result = item.value === value.value;
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
    if (callBack) {
      callBack();
    }
    // this.setState({ selectedItems }, () => {
    //   if (callBack) {
    //     callBack();
    //   }
    // });
  };

  const onItemSelected = (value: IItemRenderer) => {
    const updateFieldState = () => {
      if (props.fieldState) {
        const ids = selectedItems.map(item => item.value);
        fieldState!.onChange(ids);
      }
      if (props.onChange) {
        const ids = selectedItems.map(item => item.value);
        props.onChange!(ids);
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
    tipLabel
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

  const renderOptions = options.map(item => ({ item, selectedItems }));

  const handleInteraction = (nextOpenState: boolean) => {
    setIsOpenPopover(nextOpenState);
    // this.setState({ isOpenPopover: nextOpenState });
  };

  const onClear = () => {
    if (props.fieldState) {
      fieldState!.onChange([]);
    }
    if (props.onChange) {
      props.onChange!([]);
    }
    setIsOpenPopover(false);
  };

  const renderClearButton = () => {
    const minimal = props.minimal;

    return props.clearButton ? (
      <Button
        style={{ width: '30px' }}
        className={minimal ? 'bp3-minimal' : ''}
        onClick={onClear}
        rightIcon={'filter-remove'}
      />
    ) : (
      undefined
    );
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
        required={required}
        noLabel={noLabel}
        label={label}
        fieldState={fieldState}
      >
        {tipLabel && <span className={'tipLabel'}>{tipLabel}</span>}
        <ItemSelect
          popoverProps={{
            captureDismiss: true,
            isOpen: isOpenPopover,
            onInteraction: handleInteraction
          }}
          itemPredicate={filterItem}
          itemRenderer={renderItem}
          items={renderOptions}
          disabled={disabled}
          initialContent={initialContent}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={onItemSelected}
          filterable={filterable}
          resetOnClose={props.resetOnClose && props.resetOnClose}
          inputProps={{
            rightElement: renderClearButton()
          }}
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
