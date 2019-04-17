import { observer } from 'mobx-react';
import React  from 'react';
/** Blueprint */
import {
  Button,
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
  options: IItemMultiple[];
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
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={item.rep}
      key={item.value}
      onClick={handleClick}
      text={item.label}
    />
  );
};

const filterItem: ItemPredicate<IItemRenderer> = (query, value) => {
  return `${value.item.label}`.toLowerCase().indexOf(query.toLowerCase()) >= 0;
};

@observer
export class VSelectMultiple extends React.Component<
  ISelectFieldProps,
  IState
> {
  constructor(props: ISelectFieldProps) {
    super(props);
    this.state = {
      selectedItems: []
    };
  }

  getFieldText() {
    if (this.state.selectedItems.length === 1) {
      return this.state.selectedItems[0].label;
    }
    if (this.state.selectedItems.length > 1) {
      return `${this.state.selectedItems.length} Items selected`;
    }
    return this.props.defaultText || 'No selection';
  }

  render() {
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
      options
    } = this.props;
    const { selectedItems } = this.state;
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
          fieldState.validators(validator.required, ...validators);
        } else {
          fieldState.validators(validator.required);
        }
      } else if (validators && validators.length > 0) {
        fieldState.validators(...validators);
      }
    }

    const renderOptions = options.map(item => ({ item, selectedItems }));

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
          <ItemSelect
            popoverProps={{ captureDismiss: true }}
            itemPredicate={filterItem}
            itemRenderer={renderItem}
            items={renderOptions}
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
                text={this.getFieldText()}
              />
            )}
          </ItemSelect>
        </FormFieldContainer>
      </StyledPopOverWrapper>
    );
  }

  selectOrDeselectItem = (value: IItemMultiple, callBack?: any) => {
    const { selectedItems } = this.state;
    let outerIndex = -1;
    selectedItems.some((item, index) => {
      const result = item.value === value.value;
      if (result) {
        outerIndex = index;
      }
      return result;
    });
    if (outerIndex === -1) {
      selectedItems.push(value);
    } else {
      selectedItems.splice(outerIndex, 1);
    }
    this.setState({ selectedItems }, () => {
      if (callBack) {
        callBack();
      }
    });
  };

  onItemSelected = (value: IItemRenderer) => {
    const updateFieldState = () => {
      if (this.props.fieldState) {
        const ids = this.state.selectedItems.map(item => item.value);
        this.props.fieldState.onChange(ids);
      }
      if (this.props.onChange) {
        const ids = this.state.selectedItems.map(item => item.value);
        this.props.onChange!(ids);
      }
    };
    this.selectOrDeselectItem(value.item, updateFieldState);
  };
}
