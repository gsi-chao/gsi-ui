import { observer } from 'mobx-react';
import React from 'react';
/** Blueprint */
import {
  Button,
  ButtonGroup,
  Icon,
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
}

const ItemSelect = Select.ofType<IItem>();

const renderItem: ItemRenderer<IItem> = (
  item,
  { handleClick, modifiers, query }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={item.rep}
      key={item.value}
      onClick={handleClick}
      text={item.label}
    />
  );
};

const filterItem: ItemPredicate<IItem> = (query, item) => {
  const label = `${item.label}`.toLowerCase().indexOf(query.toLowerCase()) >= 0;
  return label;
};

@observer
export class VSelectField extends React.Component<ISelectFieldProps, IState> {
  @observable showClear: boolean;

  constructor(props: ISelectFieldProps) {
    super(props);
    this.showClear = false;
  }

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
      clearButton,
      isLoading,
      value,
      tipLabel
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
          required={required}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
        >
          {tipLabel && <span className={'tipLabel'}>{tipLabel}</span>}
          <ItemSelect
            itemPredicate={filterItem}
            itemRenderer={renderItem}
            items={options}
            disabled={this.disable()}
            initialContent={initialContent}
            noResults={<MenuItem disabled={true} text="No results." />}
            onItemSelect={this.onItemSelected}
            filterable={filterable}
          >
            {iconOnly ? (
              <ButtonGroup>
                <Button
                  className={minimal ? 'bp3-minimal' : ''}
                  style={{
                    justifyContent: 'center',
                    color: this.props.color ? this.props.color : 'black'
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
                  color: this.props.color ? this.props.color : 'black'
                }}
              />
            )}
            {this.showClear ? this.renderClearButton() : undefined}{' '}
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
            color: this.props.color ? this.props.color : 'black'
          }}
          icon={this.props.rightIcon || 'chevron-down'}
        />
        {this.props.isLoading ? <VSpinner size={20} /> : undefined}
      </React.Fragment>
    );
  };

  renderClearButton = () => {
    const minimal = this.props.minimal;

    return this.props.clearButton ? (
      !this.props.isLoading ? (
        <Button
          style={{ width: '30px', paddingLeft: '15px' }}
          className={minimal ? 'bp3-minimal' : ''}
          onClick={this.onClear}
          rightIcon={'refresh'}
        />
      ) : (
        undefined
      )
    ) : (
      undefined
    );
  };

  private onClear = () => {
    if (this.props.clearValue) {
      this.onItemSelected({ label: '', value: this.props.clearValue });
    } else {
      this.onItemSelected({ label: '', value: '' });
    }
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
