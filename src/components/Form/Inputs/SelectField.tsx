import { observer } from 'mobx-react';
import React from 'react';
/** Blueprint */
import {
  Button,
  ButtonGroup,
  Classes,
  Icon,
  IconName,
  Intent,
  IPopoverProps,
  MenuDivider,
  MenuItem
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
import { StyledMenuNoMarginDivider, StyledPopOverWrapper } from './style';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';
import { action, computed, observable } from 'mobx';
import { VSpinner } from '../../Spinner';
import { orderBy, uniqueId } from 'lodash';
import { IItemMultiple } from './SelectMultipleField';
import { FieldState } from 'formstate';

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
  color?: string;
  clearButton?: boolean;
  clearValue?: any;
  isLoading?: boolean;
  tipLabel?: string;
  popoverProps?: IPopoverProps;
  resetOnClose?: boolean;
  allowEmptyItem?: boolean;
  allowOrder?: boolean;
  orderDirection?: 'asc' | 'desc';
  createNewItemFormQuery?: (item: IItem) => void;
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
  query: string | null;
}

const ItemSelect = Select.ofType<IItem>();

const filterItem: ItemPredicate<IItem> = (query, item) => {
  return (
    !query ||
    `${item.label}`.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
    (item && item.label === 'No Selection' && item.value === '')
  );
};

@observer
export class VSelectField extends React.Component<ISelectFieldProps, IState> {
  @observable showClear: boolean;
  @observable selectedItem: FieldState<IItemMultiple | null>;
  @observable changed: FieldState<boolean>;
  @observable activeItem: FieldState<IItemMultiple | null>;
  @observable ref: any;

  constructor(props: ISelectFieldProps) {
    super(props);
    this.showClear = false;
    this.selectedItem = new FieldState<IItemMultiple | null>(null);
    this.activeItem = new FieldState<IItemMultiple | null>(null);
    this.changed = new FieldState<boolean>(false);
    this.state = {
      query: ''
    };
    this.ref = React.createRef();
  }

  @action setRef = (ref: any) => {
    this.ref = ref;
  };

  renderItem: ItemRenderer<IItem> = (item, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }

    const prevActive =
      (this.props.fieldState && item.value === this.props.fieldState.value) ||
      item.value === this.props.value;
    const itemIsTheActiveByKeyBoard =
      this.activeItem?.value && item.value === this.activeItem?.value?.value;

    const notIncludeSearch =
      !!this.state.query &&
      !this.props.options.find(
        (item: IItem) =>
          item.label === this.state.query || item.label === this.state.query
      );

    const active = notIncludeSearch
      ? false
      : (!this.activeItem?.value && prevActive) || !!itemIsTheActiveByKeyBoard;

    return (
      <MenuItem
        active={active}
        disabled={modifiers.disabled}
        label={item.rep}
        key={uniqueId()}
        onClick={handleClick}
        title={item.label}
        text={item.label}
        labelElement={
          this.props.allowEmptyItem &&
          item.value === '' &&
          item.label === 'No Selection' ? (
            <Icon color={(active && 'white') || '#7486949c'} icon={'reset'} />
          ) : null
        }
      />
    );
  };

  public renderMenu: ItemListRenderer<IItem> = ({
    items,
    itemsParentRef,
    query,
    renderItem
  }) => {
    const renderedItems = items.map(renderItem).filter(item => item != null);
    const hasValue = !!(this.props.value || this.props?.fieldState?.value);
    const itemsToRender =
      this.props.allowEmptyItem && renderedItems.length > 0 && hasValue ? (
        <>
          {renderedItems.map((item, index: number) => {
            if (index === 0) {
              return (
                <React.Fragment key={`item_${index}`}>
                  {item}
                  <MenuDivider className={'dividerNoMargin'} />
                </React.Fragment>
              );
            }
            return <React.Fragment key={index}>{item}</React.Fragment>;
          })}
        </>
      ) : (
        renderedItems
      );

    const hasQueryValues = !!(this.state && this.state.query !== '');

    const notIncludeSearch =
      !!hasQueryValues &&
      !this.props.options.find(
        (item: IItem) =>
          item.label === this.state.query || item.label === this.state.query
      );

    const createItemView = this.props.createNewItemFormQuery &&
      notIncludeSearch && (
        <MenuItem
          icon="add"
          text={`Create "${query}"`}
          active={true}
          onClick={() => {
            this.onItemSelected({ value: query, label: query });
          }}
          shouldDismissPopover={false}
        />
      );

    return (
      <StyledMenuNoMarginDivider ulRef={itemsParentRef}>
        {renderedItems.length > 0 ? (
          itemsToRender
        ) : !notIncludeSearch ? (
          <MenuItem disabled={true} text="No results." />
        ) : null}

        {createItemView}
      </StyledMenuNoMarginDivider>
    );
  };

  public getOptions = (): IItem[] => {
    const { options, allowEmptyItem } = this.props;
    const newOptions =
      (options &&
        options.length > 0 &&
        (this.props.allowOrder
          ? orderBy(options, ['label'], [this.props.orderDirection || false])
          : options)) ||
      [];
    if (
      allowEmptyItem &&
      options &&
      options.length > 0 &&
      (this.props.value ||
        (this.props.fieldState && this.props.fieldState.value))
    ) {
      return [{ value: '', label: 'No Selection' }, ...newOptions];
    }
    return newOptions;
  };

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      disabled,
      inline,
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
      margin,
      tipLabel,
      popoverProps,
      tooltip,
      displayRequired
    } = this.props;

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

    const areItemsEqual = (
      itemA: IItemMultiple,
      itemB: IItemMultiple
    ): boolean => {
      return itemA.value === itemB.value;
    };

    const onActiveItemChange = (item: IItemMultiple | null) => {
      const isOutEmptyOption = this.getOptions().some(
        item => !!(item.value === '' && item.label === 'No Selection')
      );

      if (
        (this.props.allowEmptyItem && isOutEmptyOption) ||
        this.props.allowOrder
      ) {
        if (!this.changed?.value) {
          if (this.selectedItem?.value) {
            if (this.state) {
              if (this.activeItem?.value?.value !== item?.value) {
                this.activeItem.onChange(this.selectedItem?.value || null);
              }
            }
            this.selectedItem.onChange(null);
          } else {
            if (this.activeItem?.value?.value !== item?.value) {
              this.activeItem.onChange(item);
            }
          }
          this.changed.onChange(true);
        } else {
          this.changed.onChange(false);
        }
      } else {
        this.activeItem &&
          this.activeItem.value?.value !== item?.value &&
          this.activeItem.onChange(item);
      }
    };

    const onOpening = () => {
      const value = this.props.fieldState?.value || this.props.value;
      if (this.ref?.hasOwnProperty('previousFocusedElement')) {
        this.ref.previousFocusedElement = undefined;
      }
      if (value) {
        const newActiveItem =
          this.getOptions() &&
          this.getOptions().length > 0 &&
          this.getOptions().find(el => el.value === value);
        if (newActiveItem) {
          this.activeItem.onChange(newActiveItem);
          this.changed.onChange(true);
          return;
        }
      }
      this.activeItem.onChange(null);
      this.changed.onChange(true);
    };

    return (
      <StyledPopOverWrapper
        disabled={this.disable()}
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
            ref={this.setRef}
            activeItem={this.activeItem?.value}
            onActiveItemChange={onActiveItemChange}
            resetOnSelect={true}
            itemPredicate={filterItem}
            itemRenderer={this.renderItem}
            items={this.getOptions()}
            disabled={this.disable()}
            itemListRenderer={this.renderMenu}
            initialContent={initialContent}
            onItemSelect={this.onItemSelected}
            itemsEqual={areItemsEqual}
            filterable={filterable}
            popoverProps={{
              onOpening,
              modifiers: {
                flip: { enabled: true },
                keepTogether: { enabled: true },
                preventOverflow: { enabled: true }
              },
              shouldReturnFocusOnClose: false,
              captureDismiss: true,
              ...popoverProps
            }}
            resetOnClose={this.props.resetOnClose}
            className={this.props.isLoading ? Classes.SKELETON : ''}
            onQueryChange={(value: string) => this.setState({ query: value })}
            query={(this.state && this.state.query) || ''}
            inputProps={{
              rightElement: this.renderClearButton()
            }}
          >
            {iconOnly ? (
              <ButtonGroup>
                <Button
                  className={minimal ? 'bp3-minimal' : ''}
                  style={{
                    justifyContent: 'center',
                    color: this.props.color && this.props.color
                  }}
                  {...{
                    icon,
                    disabled
                  }}
                  text={iconOnly && undefined}
                />
              </ButtonGroup>
            ) : (
              <Button
                onMouseEnter={() => {
                  this.showClear = true;
                }}
                onMouseLeave={() => {
                  this.showClear = false;
                }}
                className={minimal ? 'bp3-minimal' : ''}
                {...{
                  icon,
                  disabled
                }}
                rightIcon={this.renderRightIcon()}
                disabled={this.disable()}
                text={this.fieldText}
                style={{
                  color: this.props.color && this.props.color
                }}
              />
            )}
          </ItemSelect>
        </FormFieldContainer>
      </StyledPopOverWrapper>
    );
  }

  private disable = () => {
    return this.props.isLoading ? true : this.props.disabled;
  };

  private renderRightIcon = () => {
    return (
      <React.Fragment>
        <Icon
          style={{
            color: this.props.color && this.props.color
          }}
          icon={this.props.rightIcon || 'chevron-down'}
        />
        {this.props.isLoading ? <VSpinner size={20} /> : undefined}
      </React.Fragment>
    );
  };

  renderClearButton = () => (
    <Button
      style={{ width: '30px' }}
      minimal
      onClick={this.onClear}
      rightIcon={'filter-remove'}
    />
  );

  private onClear = () => {
    this.setState({ query: '' });
  };

  @computed
  get fieldText() {
    let fValue = '';
    if (this.props.fieldState) {
      fValue = this.props.fieldState.value;
    } else if (this.props.value !== undefined && this.props.value !== null) {
      fValue = this.props.value;
    }
    if (fValue !== undefined && fValue !== null) {
      const item = this.props.options.find((value: IItem) => {
        return fValue === value.value;
      });
      if (item) {
        return item.label;
      }
    }
    return this.props.defaultText || 'No selection';
  }

  onItemSelected = (value: IItem) => {
    if (this.props.createNewItemFormQuery && value.value !== '') {
      this.props.createNewItemFormQuery(value);
    }
    setTimeout(() => {
      if (this.props.fieldState) {
        this.props.fieldState.onChange(value.value);
      }
      if (this.props.onChange) {
        this.props.onChange!(value.value);
      }
    });
  };
}
