import { observer } from 'mobx-react';
import React, { ChangeEvent } from 'react';
/** Blueprint */
import {
  Button,
  Classes,
  IconName,
  Intent,
  IPopoverProps,
  Menu,
  MenuItem
} from '@blueprintjs/core';
/** FieldState */
import {
  ItemListRenderer,
  ItemPredicate,
  ItemRenderer,
  Suggest
} from '@blueprintjs/select';

import '@blueprintjs/select/lib/css/blueprint-select.css';

import { IFieldProps } from './IFieldProps';
import { StyledPopOverWrapper } from './style';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';
import { computed, observable } from 'mobx';
import styled from 'styled-components';

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
  allowClear?: boolean;
  allowInitialContent?: boolean;
  onQueryChange?: (
    query: string,
    event?: ChangeEvent<HTMLInputElement>
  ) => void;
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

const ItemSelect = Suggest.ofType<IItem>();

const filterItem: ItemPredicate<IItem> = (query, item) => {
  return (
    `${item.label}`.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
    (item && item.label === 'No Selection' && item.value === '')
  );
};

@observer
export class VAutoComplete extends React.Component<ISelectFieldProps, IState> {
  @observable showClear: boolean;

  constructor(props: ISelectFieldProps) {
    super(props);
    this.showClear = false;
  }

  renderItem: ItemRenderer<IItem> = (item, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }

    return (
      <MenuItem
        active={false}
        disabled={modifiers.disabled}
        label={item.rep}
        key={item.value}
        onClick={handleClick}
        text={item.label}
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
    return (
      <>
        <StyledMenuNoMarginDivider ulRef={itemsParentRef}>
          {renderedItems.length > 0 ? (
            renderedItems
          ) : (
            <MenuItem disabled={true} text="No results." />
          )}
        </StyledMenuNoMarginDivider>
      </>
    );
  };

  public getOptions = (): IItem[] => {
    const { options } = this.props;
    return options;
  };

  renderInputValue = (item: IItem) => item.label;

  @computed
  get valueField() {
    if (this.props.fieldState) {
      return this.props.fieldState.value || '';
    }
    if (this.props.value) {
      return this.props.value;
    }
    return '';
  }

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      inline,
      id,
      options,
      className,
      layer,
      fill,
      noLabel,
      required,
      validators,
      fixedInputWidthPx,
      minimal,
      margin,
      tipLabel,
      popoverProps,
      tooltip,
      displayRequired,
      allowInitialContent
    } = this.props;

    const initialContent =
      (options && options.length === 0) || allowInitialContent ? (
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
            itemPredicate={filterItem}
            itemRenderer={this.renderItem}
            items={this.getOptions()}
            disabled={this.disable()}
            initialContent={initialContent}
            onItemSelect={this.onItemSelected}
            inputValueRenderer={this.renderInputValue}
            noResults={<MenuItem disabled={true} text="No results." />}
            selectedItem={this.state?.item || undefined}
            popoverProps={{
              minimal,
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
            onQueryChange={(
              query: string,
              event?: ChangeEvent<HTMLInputElement>
            ) => {
              this.setState({ query, item: undefined });
              if (this.props.onQueryChange) {
                this.props.onQueryChange(query, event);
              }
            }}
            query={this.state?.query || ''}
            inputProps={{
              rightElement: this.props.allowClear ? (
                this.renderClearButton()
              ) : (
                <></>
              )
            }}
          />
        </FormFieldContainer>
      </StyledPopOverWrapper>
    );
  }

  private disable = () => {
    return this.props.isLoading ? true : this.props.disabled;
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
    if (this.props.onChange) {
      this.props.onChange('');
    }
    if (this.props.fieldState) {
      this.props.fieldState.onChange('');
    }
  };

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

export const StyledMenuNoMarginDivider = styled(Menu)`
  & .dividerNoMargin {
    margin: 0;
  }
`;
