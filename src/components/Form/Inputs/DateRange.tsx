import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
/** Blueprint */
import { IconName, Intent, IPopoverProps } from '@blueprintjs/core';
import {
  DateRange,
  DateRangeInput,
  IDateFormatProps,
  TimePrecision
} from '@blueprintjs/datetime';
/** FieldState */
import { StyledDateRange } from './style';
import { IFieldProps } from './IFieldProps';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';

import { isDate } from 'lodash';

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
}

interface IIcon {
  backgroundColor?: string;
  color?: string;
  size?: number;
  iconName: IconName;
}

const momentFormatter = (format: string): IDateFormatProps => {
  return {
    formatDate: date => moment(date).format(format),
    parseDate: str => {
      if (!moment(str, format, true).isValid()) {
        return false;
      }
      return moment(str, format).toDate();
    },
    placeholder: `${format}`
  };
};

export const VDateRangePicker = observer((props: IInputFieldProps) => {
  const [date, setDate] = useState<DateRange>([null, null]);

  useEffect(() => {
    if (props.fieldState?.value) {
      setDate(props.fieldState.value);
    }
    if (props.value) {
      setDate(props.value);
    }
  }, [props.fieldState?.value, props.value]);

  const FORMATS = () => {
    return momentFormatter(props.format || 'MM/DD/YYYY');
  };

  const changedDate = (dates: any[]) => {
    if (dates && dates.length === 2) {
      const newDates: any = [
        (isDate(dates[0]) && dates[0]) || null,
        (isDate(dates[1]) && dates[1]) || null
      ];
      setDate(newDates);
      if ((newDates[0] && newDates[1]) || (!newDates[0] && !newDates[1])) {
        if (props.fieldState) {
          props.fieldState.onChange(newDates);
        }
        if (props.onChange) {
          props.onChange(newDates);
        }
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
    maxTime,
    minTime,
    validators,
    displayRequired,
    tooltip,
    allowSingleDayRange,
    contiguousCalendarMonths,
    tipLabel
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

  const getValueField = (): DateRange => {
    if (date && date.length === 2) {
      try {
        date[0] = isDate(date[0]) ? new Date(date[0]) : null;
        date[1] = isDate(date[1]) ? new Date(date[1]) : null;
        return date;
      } catch (e) {
        return [null, null];
      }
    }
    return [null, null];
  };

  return (
    <StyledDateRange
      className={className}
      disabled={disabled}
      inline={inline}
      intent={fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE}
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
          {...FORMATS()}
          disabled={disabled}
          minDate={minTime}
          maxDate={maxTime}
          onChange={changedDate}
          value={getValueField()}
          popoverProps={{
            minimal: true,
            ...popoverProps
          }}
          shortcuts={props.shortcuts}
          allowSingleDayRange={allowSingleDayRange}
          contiguousCalendarMonths={contiguousCalendarMonths}
        />
      </FormFieldContainer>
    </StyledDateRange>
  );
});
;
