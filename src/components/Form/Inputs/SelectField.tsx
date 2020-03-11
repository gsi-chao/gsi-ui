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
import { computed, observable } from 'mobx';
import { VSpinner } from '../../Spinner';

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
  item: IItem | undefined;
  query: string | null;
}

const ItemSelect = Select.ofType<IItem>();

const filterItem: ItemPredicate<IItem> = (query, item) => {
  return (
    `${item.label}`.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
    (item && item.label === 'No Selection' && item.value === '')
  );
};

@observer
export class VSelectField extends React.Component<ISelectFieldProps, IState> {
  @observable showClear: boolean;
  refInputSelect: any;

  constructor(props: ISelectFieldProps) {
    super(props);
    this.showClear = false;
    this.refInputSelect = React.createRef();
  }

  public componentDidUpdate(prevProps: Readonly<ISelectFieldProps>, prevState: Readonly<IState>, snapshot?: any): void {
    console.log(this.refInputSelect)
  }

  renderItem: ItemRenderer<IItem> = (item, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }

    const active =
      (this.props.fieldState && item.value === this.props.fieldState.value) ||
      item.value === this.props.value;

    return (
      <MenuItem
        active={active}
        disabled={modifiers.disabled}
        label={item.rep}
        key={item.value}
        onClick={handleClick}
        title={item.label}
        text={item.label}
        labelElement={
          this.props.allowEmptyItem &&
          item.value === '' &&
          item.label === 'No Selection' ? (
            <Icon color={'#7486949c'} icon={'reset'} />
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
    const itemsToRender =
      this.props.allowEmptyItem &&
      renderedItems.length > 0 &&
      this.state &&
      this.state.item &&
      this.state.item.value ? (
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
        <StyledMenuNoMarginDivider
          ulRef={itemsParentRef}
          width={
            this.refInputSelect && this.refInputSelect?.current
              ? this.refInputSelect?.current?.clientWidth
              : 200
          }
        >
          {renderedItems.length > 0 ? (
            itemsToRender
          ) : (
            <MenuItem disabled={true} text="No results." />
          )}
        </StyledMenuNoMarginDivider>
      </>
    );
  };

  public getOptions = (): IItem[] => {
    const { options, allowEmptyItem } = this.props;
    if (
      allowEmptyItem &&
      options &&
      options.length > 0 &&
      ((this.state && this.state.item && this.state.item.value) ||
        this.props.value ||
        (this.props.fieldState && this.props.fieldState.value))
    ) {
      return [{ value: '', label: 'No Selection' }, ...options];
    }
    return options;
  };

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
      ) : undefined;
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

    return (
      <div
        ref={(element: any) => {
          this.refInputSelect.current = element;
        }}
      >
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
            itemPredicate={filterItem}
            itemRenderer={this.renderItem}
            items={this.getOptions()}
            disabled={this.disable()}
            itemListRenderer={this.renderMenu}
            initialContent={initialContent}
            onItemSelect={this.onItemSelected}
            filterable={filterable}
            popoverProps={{
              modifiers: {
                arrow: { enabled: true },
                flip: { enabled: true },
                keepTogether: { enabled: true },
                preventOverflow: { enabled: true }
              },
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
      </div>
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
    this.setState({ item: value });
    if (this.props.fieldState) {
      this.props.fieldState.onChange(value.value);
    }
    if (this.props.onChange) {
      this.props.onChange!(value.value);
    }
  };
}
