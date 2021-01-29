import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
/** Blueprint */
import { IconName, Intent, IPopoverProps } from '@blueprintjs/core';
import {
  DateRange,
  DateRangeInput,
  IDateFormatProps,
  TimePrecision,
} from '@blueprintjs/datetime';
/** FieldState */
import { StyledDateRange } from './style';
import { IFieldProps } from './IFieldProps';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';

import { isDate } from 'lodash';
import { FieldState } from 'formstate';
import { DayPickerProps } from 'react-day-picker';

/**
 * Field component. Must be an observer.
 */

export interface IInputFieldProps extends IFieldProps {
  leftIcon?: IconName;
  rightElement?: JSX.Element;
  round?: boolean;
  fill?: boolean;
  icon?: IIcon;
  format?: string;
  popoverProps?: IPopoverProps;
  dayPickerProps?: DayPickerProps;
  precision?: TimePrecision;
  useAmPm?: boolean;
  maxTime?: Date;
  minTime?: Date;
  canClearSelection?: boolean;
  shortcuts?: boolean | any[];
  showActionsBar?: boolean;
  allowSingleDayRange?: boolean;
  contiguousCalendarMonths?: boolean;
  tipLabel?: string;
  onBlurStart?: any;
  onFocusStart?: any;
  onBlurEnd?: any;
  onFocusEnd?: any;
  fieldState?: FieldState<DateRange>;
  value?: DateRange;
}

interface IIcon {
  backgroundColor?: string;
  color?: string;
  size?: number;
  iconName: IconName;
}

const momentFormatter = (format: string): IDateFormatProps => {
  return {
    formatDate: (date) => moment(date).format(format),
    parseDate: (str) =>
      !moment(str, format, true).isValid()
        ? false
        : moment(str, format).toDate(),
    placeholder: `${format}`,
  };
};

const getTimePrecision: any = (
  precision?: TimePrecision,
  useAmPm?: boolean
) => {
  if (precision) {
    return {
      timePrecision: { precision },
      timePickerProps: {
        useAmPm: useAmPm ?? undefined,
      },
    };
  }
};

export const VDateRangePicker = observer((props: IInputFieldProps) => {
  const [date, setDate] = useState<DateRange>([null, null]);

  useEffect(() => {
    if (props.value) {
      setDate(props.value);
    }
  }, [props.value]);

  const changedDate = (dates: any[]): void => {
    if (dates?.length === 2) {
      const newDates: any = [
        (isDate(dates[0]) && dates[0]) || null,
        (isDate(dates[1]) && dates[1]) || null,
      ];

      if (props.fieldState) {
        props.fieldState.onChange?.(newDates);
        props.onChange?.(props.fieldState.value);
        return;
      }
      setDate(newDates);
      if ((newDates[0] && newDates[1]) || (!newDates[0] && !newDates[1])) {
        props.onChange?.(newDates);
      }
    }
  };

  const {
    label,
    labelInfo,
    fieldState,
    disabled,
    inline,
    id,
    className,
    layer,
    fill,
    margin,
    value,
    noLabel,
    required,
    popoverProps,
    dayPickerProps,
    maxTime,
    minTime,
    validators,
    displayRequired,
    tooltip,
    allowSingleDayRange,
    contiguousCalendarMonths,
    tipLabel,
    precision,
    useAmPm,
    onBlurStart,
    onFocusStart,
    onBlurEnd,
    onFocusEnd,
  } = props;

  if (fieldState) {
    if (required) {
      if (validators && validators.length > 0) {
        fieldState.validators(Validators.requiredDateRange, ...validators);
      } else {
        fieldState.validators(Validators.requiredDateRange);
      }
    } else if (validators && validators.length > 0) {
      fieldState.validators(...validators);
    }
  }

  const getValueField = (): DateRange => {
    const dateNew = props.fieldState?.value || date;
    try {
      if (!props.fieldState && date?.length === 2) {
        dateNew[0] = isDate(date[0]) ? new Date(date[0]) : null;
        dateNew[1] = isDate(date[1]) ? new Date(date[1]) : null;
      }
    } catch (e) {
      dateNew[0] = null;
      dateNew[1] = null;
    }
    return dateNew;
  };

  return (
    <StyledDateRange
      className={className}
      disabled={disabled}
      inline={inline}
      intent={fieldState?.hasError ? Intent.DANGER : Intent.NONE}
      labelFor={id}
      labelInfo={labelInfo}
      layer={layer}
      fill={fill}
      margin={margin}
      noLabel={noLabel}
    >
      <FormFieldContainer
        required={required || displayRequired}
        noLabel={noLabel}
        label={label}
        fieldState={fieldState}
        value={value}
        tooltip={tooltip}
      >
        {tipLabel && <span className={'tipLabel'}>{tipLabel}</span>}
        <DateRangeInput
          {...momentFormatter(props.format || 'MM/DD/YYYY')}
          disabled={disabled}
          minDate={minTime}
          maxDate={maxTime}
          onChange={changedDate}
          value={getValueField()}
          popoverProps={{
            minimal: true,
            ...popoverProps,
          }}
          dayPickerProps={{
            fixedWeeks: true,
            ...dayPickerProps
          }}
          shortcuts={props.shortcuts}
          allowSingleDayRange={allowSingleDayRange}
          contiguousCalendarMonths={contiguousCalendarMonths}
          startInputProps={{
            onBlur: onBlurStart,
            onFocus: onFocusStart,
          }}
          endInputProps={{
            onBlur: onBlurEnd,
            onFocus: onFocusEnd,
          }}
          {...getTimePrecision(precision, useAmPm)}
        />
      </FormFieldContainer>
    </StyledDateRange>
  );
});
