import React, { useEffect } from 'react';
import { Intent } from '@blueprintjs/core';

import { observer } from 'mobx-react';
import { IItem } from '../../types';
import { IFieldProps } from '../IFieldProps';
import { FormFieldContainer } from '../FormFieldContainer';
import { SearchSelect } from './SearchSelect';
import { StyledPopOverWrapper } from '../style';
import { Validators } from '../../Validators';

export interface ISearchSelectFieldProps extends IFieldProps {
  options: IItem[];
  fill?: boolean;
  fixedInputWidthPx?: number;
  isLoading?: boolean;
  tipLabel?: string;
  allowNewItem?: boolean;
  sort?: 'asc' | 'desc';
  onAddNewItem?: (item: string) => void;
  multi?: boolean;
  popoverWidth?: number;
  allowEmpty?: boolean;
  popoverMinimal?: boolean;
  tipBgColor?: string;
  displayAsTree?: boolean;
  treeChildIndentWidth?: number;
  getValueOnSelectMenuItem?: boolean;
}

export const VSearchSelectField = observer((props: ISearchSelectFieldProps) => {
  const {
    label,
    labelInfo,
    fieldState,
    disabled,
    inline,
    options,
    className,
    layer,
    fill,
    noLabel,
    required,
    validators,
    fixedInputWidthPx,
    id,
    margin,
    tipLabel,
    tooltip,
    displayRequired,
    value,
    multi,
    allowNewItem,
    onAddNewItem,
    popoverWidth,
    sort,
    allowEmpty,
    popoverMinimal,
    tipBgColor,
    displayAsTree,
    treeChildIndentWidth,
    getValueOnSelectMenuItem,
    loading,
    placeholder
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
  }, [validators]);

  const changeValueOrField = (value: any) => {
    if (props.fieldState) {
      props.fieldState.onChange(value);
    }
    if (props.onChange) {
      props.onChange!(value);
    }
  };

  return (
    <StyledPopOverWrapper
      disabled={disabled}
      inline={inline}
      intent={fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE}
      labelFor={id}
      labelInfo={labelInfo}
      layer={layer}
      fill={fixedInputWidthPx ? false : fill}
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
        className={className}
      >
        {tipLabel && (
          <span
            className={'tipLabel'}
            style={{ backgroundColor: tipBgColor ? tipBgColor : '#fff' }}
          >
            {tipLabel}
          </span>
        )}
        <SearchSelect
          disabled={disabled}
          sort={sort}
          value={props.fieldState ? props.fieldState.value : value}
          options={options != null && Array.isArray(options) ? options : []}
          multi={multi}
          onChange={changeValueOrField}
          allowNewItem={allowNewItem}
          onAddNewItem={onAddNewItem}
          popoverWidth={popoverWidth}
          fixedInputWidthPx={fixedInputWidthPx}
          allowEmpty={allowEmpty}
          popoverMinimal={popoverMinimal}
          displayAsTree={displayAsTree}
          treeChildIndentWidth={treeChildIndentWidth}
          getValueOnSelectMenuItem={getValueOnSelectMenuItem}
          isLoading={loading}
          placeholder={placeholder}
        />
      </FormFieldContainer>
    </StyledPopOverWrapper>
  );
});
