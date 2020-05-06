import React from 'react';
import { IconName } from '@blueprintjs/icons';
import { IPopoverProps } from '@blueprintjs/core';

import { observer } from 'mobx-react';
import { IItem } from '../../types';
import { IFieldProps } from '../IFieldProps';
import { FormFieldContainer } from '../FormFieldContainer';

export interface ISearchSelectFieldProps extends IFieldProps {
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

export const SearchSelectField = observer((props: ISearchSelectFieldProps) => {
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
  } = props;

  return (
    <FormFieldContainer
      required={required || displayRequired}
      noLabel={noLabel}
      label={label}
      fieldState={fieldState}
      tooltip={tooltip}
    >
      {tipLabel && <span className={'tipLabel'}>{tipLabel}</span>}
    </FormFieldContainer>
  );
});
