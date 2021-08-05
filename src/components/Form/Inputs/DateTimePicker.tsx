import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import moment from 'moment';
/** Blueprint */
import { Icon, IconName, Intent, IPopoverProps } from '@blueprintjs/core';
import {
  IDateFormatProps,
  IDatePickerModifiers,
  TimePicker
} from '@blueprintjs/datetime';
/** FieldState */
import { DateInputContainer, IconDate, StyledDatePicker } from './style';
import { IFieldProps } from './IFieldProps';
import { FormFieldContainer } from './FormFieldContainer';
import { TimePrecision } from '@blueprintjs/datetime/lib/esm/timePicker';
import { Validators } from '../Validators';
import { DayPickerProps } from 'react-day-picker';

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
    showActionsBar
  } = props;

  const dateRef: any = useRef<HTMLElement>(null);
  const isFocused: any = useRef();
  const [minTimeCalculate, setMinTimeCalculate] = useState();
  const [maxTimeCalculate, setMaxTimeCalculate] = useState();
  const [defaultValue, setDefaultValue] = useState(toDate());
  const [valueField, setValueField] = useState();

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
      !value && !fieldState
    ) {
      setValueField(null);
      return;
    }

    if (fieldState) {
      setValueField(fieldState.value);
      return;
    }
    if (value) {
      setValueField(value);
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

  const changedDate = (date: any) => {
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

  const modifiers: IDatePickerModifiers = { toDateNotSelect };

  const closeOnSelection = useMemo(() => {
    if (props.closeOnSelection === undefined && dateType === 'DATETIME') {
      return false;
    }
    return props.closeOnSelection;
  }, [props.closeOnSelection, dateType]);

  return (
    <>
      <StyledDatePicker
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
          {props.tipLabel && (
            <span className={'tipLabel'}>{props.tipLabel}</span>
          )}
          {dateType === 'DATETIME' || dateType === 'DATE' ? (
            <DateInputContainer
              {...FORMATS()[dateType]}
              disabled={disabled}
              minDate={minTimeCalculate}
              maxDate={maxTimeCalculate}
              defaultValue={defaultValue}
              onChange={changedDate}
              value={valueField}
              timePrecision={dateType === 'DATETIME' ? precision : undefined}
              rightElement={iconJSX()}
              popoverProps={popoverProps}
              dayPickerProps={{
                fixedWeeks: true,
                ...dayPickerProps
              }}
              canClearSelection={canClearSelection}
              closeOnSelection={closeOnSelection}
              shortcuts={shortcuts}
              showActionsBar={showActionsBar}
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
              modifiers={modifiers}
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
