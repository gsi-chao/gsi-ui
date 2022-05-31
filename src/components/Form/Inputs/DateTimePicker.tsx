import React, { useEffect, useMemo, useRef, useState } from 'react';
/** Blueprint */
import { Icon, IconName, Intent, IPopoverProps } from '@blueprintjs/core';
import {
  DateFormatProps,
  DatePickerModifiers,
  TimePicker
} from '@blueprintjs/datetime';
import { TimePrecision } from '@blueprintjs/datetime/lib/esm/timePicker';
import { observer } from 'mobx-react';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/es';
import 'moment/locale/fr';
import { DayPickerProps } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import { Validators } from '../Validators';
import { FormFieldContainer } from './FormFieldContainer';
import { IFieldProps } from './IFieldProps';
/** FieldState */
import { DateInputContainer, IconDate, StyledDatePicker } from './style';

/**
 * Field component. Must be an observer.
 */

export interface IInputFieldProps extends IFieldProps {
  leftIcon?: IconName;
  rightElement?: JSX.Element;
  round?: boolean;
  fill?: boolean;
  dateType: 'DATE' | 'DATETIME' | 'TIME';
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
  closeOnSelection?: boolean;
  tipLabel?: string;
  locale?: string;
  clearButtonText?: string;
  todayButtonText?: string;
}

interface IIcon {
  backgroundColor?: string;
  color?: string;
  size?: number;
  iconName: IconName;
}

const momentFormatter = (format: string): DateFormatProps => {
  return {
    formatDate: (date: Date) => moment(date).format(format),
    parseDate: (str: string, locale: string) =>
      moment(str, format)
        .locale(locale)
        .toDate(),
    placeholder: `${format}`
  };
};

const toDate = () => {
  return moment().toDate();
};

const toDateNotSelect = (date: Date) => {
  return moment(moment().toDate()).isSame(moment(date), 'd');
};

const outOfRangeError = (date: any, value: any, type: 'MIN' | 'MAX') => {
  if (type === 'MIN') {
    return moment(value).isBefore(moment(date), 'd');
  }
  return moment(value).isAfter(moment(date), 'd');
};

export const VDateTimePicker = observer((props: IInputFieldProps) => {
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
    dateType,
    rightElement,
    icon,
    margin,
    value,
    noLabel,
    required,
    popoverProps,
    dayPickerProps,
    maxTime,
    minTime,
    useAmPm,
    precision,
    validators,
    displayRequired,
    tooltip,
    format,
    onChange,
    canClearSelection,
    shortcuts,
    showActionsBar,
    locale = 'en',
    clearButtonText = 'Clear',
    todayButtonText = 'Today'
  } = props;

  const dateRef: any = useRef<HTMLElement>(null);
  const isFocused: any = useRef();
  const [minTimeCalculate, setMinTimeCalculate] = useState<any>();
  const [maxTimeCalculate, setMaxTimeCalculate] = useState<any>();
  const [defaultValue, setDefaultValue] = useState(toDate());
  const [valueField, setValueField] = useState<any>();

  useEffect(() => {
    calculateValue();
  }, [fieldState?.value, value]);

  useEffect(() => {
    setDefaultValue(minTime ? minTime : maxTime ? maxTime : toDate());
  }, [minTime, maxTime]);

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
  }, [fieldState]);

  useEffect(() => {
    setMinTimeCalculate(
      minTime
        ? outOfRangeError(minTime, valueField, 'MIN')
          ? moment('1/1/1900').toDate()
          : minTime
        : moment('1/1/1900').toDate()
    );
  }, [minTime, valueField]);

  useEffect(() => {
    setMaxTimeCalculate(
      maxTime
        ? outOfRangeError(maxTime, valueField, 'MAX')
          ? moment('1/1/2100').toDate()
          : maxTime
        : moment('1/1/2100').toDate()
    );
  }, [maxTime, valueField]);

  const calculateValue = () => {
    if (
      dateType === 'TIME' &&
      ((!value && fieldState && !fieldState.value) || (!value && !fieldState))
    ) {
      setValueField(new Date(0, 0, 0, 0, 0, 0));
      return;
    }

    if (
      (dateType === 'DATE' || dateType === 'DATETIME') &&
      !value &&
      !fieldState
    ) {
      setValueField(null);
      return;
    }

    if (fieldState) {
      setValueField(
        moment(fieldState.value).isValid()
          ? moment(fieldState.value).toDate()
          : null
      );
      return;
    }
    if (value) {
      setValueField(moment(value).isValid() ? moment(value).toDate() : null);
      return;
    }
  };

  const FORMATS = () => {
    return {
      DATE: momentFormatter(format || dFormat()['DATE']),
      DATETIME: momentFormatter(`${format || dFormat()['DATETIME']}`),
      TIME: momentFormatter(dFormat()['TIME'])
    };
  };

  const dFormat = (): any => {
    return {
      DATE: 'MM/DD/YYYY',
      DATETIME: 'MM/DD/YYYY HH:mm:ss',
      TIME: 'HH:mm:ss'
    };
  };

  const changeDate = (date: any) => {
    if (
      moment(date, format || dFormat()[dateType]).isValid() ||
      date === null
    ) {
      if (fieldState) {
        fieldState.onChange(date);
      }
      if (onChange) {
        onChange(date);
      }
    }
  };

  const changedDate = (date: any) => {
    if (!!closeOnSelection || props.dateType === 'TIME') {
      changeDate(date);
    } else {
      setValueField(date);
    }
  };

  const onClosed = () => {
    if (!closeOnSelection && !closeOnSelection !== undefined) {
      changeDate(valueField);
    }
  };

  const iconJSX = () => {
    if (icon) {
      return (
        <IconDate
          backgroundColor={icon.backgroundColor}
          onClick={e => {
            e.stopPropagation();
            if (isFocused && !isFocused.current) {
              dateRef?.current?.focus();
            }
          }}
        >
          <Icon
            color={icon.color}
            icon={icon.iconName}
            iconSize={icon.size || 16}
          />
        </IconDate>
      );
    }
    return rightElement;
  };

  const modifiers: DatePickerModifiers = { toDateNotSelect };

  const closeOnSelection = useMemo(() => {
    if (props.closeOnSelection === undefined && props.dateType === 'DATETIME') {
      return false;
    }
    return props.closeOnSelection;
  }, [props.closeOnSelection, props.dateType]);

  return (
    <>
      <StyledDatePicker
        {...{
          className,
          disabled,
          inline,
          labelInfo,
          layer,
          fill,
          margin,
          noLabel
        }}
        intent={fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
      >
        <FormFieldContainer
          {...{ noLabel, label, fieldState, value, tooltip }}
          required={required || displayRequired}
        >
          {props.tipLabel && (
            <span className={'tipLabel'}>{props.tipLabel}</span>
          )}
          {dateType === 'DATETIME' || dateType === 'DATE' ? (
            <DateInputContainer
              {...FORMATS()[dateType]}
              {...{
                locale,
                disabled,
                defaultValue,
                canClearSelection,
                closeOnSelection,
                shortcuts,
                showActionsBar,
                modifiers,
                clearButtonText,
                todayButtonText
              }}
              localeUtils={MomentLocaleUtils}
              minDate={minTimeCalculate}
              popoverProps={{
                shouldReturnFocusOnClose: false,
                captureDismiss: true,
                minimal: true,
                ...popoverProps,
                onClosed
              }}
              maxDate={maxTimeCalculate}
              onChange={changedDate}
              value={valueField}
              timePrecision={dateType === 'DATETIME' ? precision : undefined}
              rightElement={iconJSX()}
              dayPickerProps={{
                fixedWeeks: true,
                ...dayPickerProps
              }}
              timePickerProps={
                dateType === 'DATETIME' ? { useAmPm } : undefined
              }
              inputProps={{
                inputRef: (element: any) => {
                  dateRef.current = element;
                },
                onFocus: () => {
                  isFocused.current = true;
                  if (props.onFocus) {
                    props.onFocus();
                  }
                },
                onBlur: () => {
                  isFocused.current = false;
                  if (props.onBlur) {
                    props.onBlur();
                  }
                }
              }}
            />
          ) : (
            <TimePicker
              value={valueField}
              useAmPm={useAmPm || false}
              precision={precision || 'second'}
              onChange={changedDate}
              disabled={disabled}
            />
          )}
        </FormFieldContainer>
      </StyledDatePicker>
    </>
  );
});
