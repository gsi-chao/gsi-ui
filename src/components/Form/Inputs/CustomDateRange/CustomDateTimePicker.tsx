import React, { useEffect, useState } from 'react';
import { Intent } from '@blueprintjs/core';
import { ICustomDateTimePicker } from './type/ICustomDateTimePicker';
import { StyledDatePicker } from '../style';
import { FormFieldContainer } from '../FormFieldContainer';
import { IStateCustomDateRange } from './type/IStateCustomDateRange';
import { DateRangeUtils } from './utils/DateRangeUtils';
import { DateRange } from '@blueprintjs/datetime';
import { DateRangeComponents } from './components/DateRangeComponents';
import { Validators } from '../../Validators';
import { Observer } from 'mobx-react';
import moment from 'moment';

export const VCustomDateTimePicker = (props: ICustomDateTimePicker) => {
  const {
    className,
    disabled,
    inline,
    fieldState,
    id,
    labelInfo,
    layer,
    fill,
    margin,
    noLabel,
    required,
    displayRequired,
    label,
    value,
    tooltip,
    tipLabel,
    dateType,
    onChange,
    format,
    maxTime,
    minTime,
    validators,
    selectedShortcutIndex,
    shortcuts,
    onShortcutChange,
    startTimeProps,
    endTimeProps,
    useAmPm,
    precision,
    dayPickerProps,
    popoverProps,
    allowSingleDayRange,
    subLabels,
    upperCaseFormat
  } = props;

  const startValueTime = startTimeProps?.initValue;
  const endValueTime = endTimeProps?.initValue;

  const [state, setState] = useState<IStateCustomDateRange>({
    start: {
      date: null,
      time: DateRangeUtils.includeTimeToDate(moment().toDate(), 24, 0)
    },
    end: {
      date: null,
      time: DateRangeUtils.includeTimeToDate(moment().toDate(), 23, 59)
    }
  });

  const {
    startDate,
    startTime,
    endDate,
    endTime
  } = DateRangeUtils.transformState(state);

  const [updateOrder, setUpdateOrder] = useState<boolean>(false);

  useEffect(() => {
    initialState();
  }, []);

  useEffect(() => {
    setState(
      DateRangeUtils.initialDate(
        fieldState,
        value,
        startValueTime,
        endValueTime
      )
    );
    (async () => {
      if (fieldState?.value) {
        const [start, end] = fieldState.value;
        (start || end) && (await fieldState?.validate());
      }
    })();
  }, [fieldState?.value, value]);

  const initialState = () => {
    const hasValidators = !!validators?.length;
    const newValidators: any[] = hasValidators ? validators ?? [] : [];
    if (required) {
      newValidators.push(Validators.requiredDateRange);
    }

    if (fieldState && !!newValidators.length) {
      fieldState.validators(...newValidators);
    }
  };

  const onChangeDate = (selectedDates: DateRange) => {
    const [startDateSelected, endDateSelected] = selectedDates;
    const newState = {
      start: {
        date: startDateSelected,
        time: startTime
      },
      end: {
        date: endDateSelected,
        time: endTime
      }
    };
    setState(newState);
  };

  const onChangeTime = (type: 'START' | 'END') => (value: Date) => {
    const key = type === 'START' ? 'start' : 'end';
    const newState = {
      ...state,
      [`${key}`]: {
        date: type === 'START' ? startDate : endDate,
        time: value
      }
    };
    setState(newState);
  };

  const onChangeDateTime = (dateRange: DateRange) => {
    const [startDateSelected, endDateSelected] = dateRange;

    setState({
      start: {
        date: startDateSelected,
        time: startDateSelected
          ? startDateSelected
          : DateRangeUtils.includeTimeToDate(moment().toDate(), 24, 0)
      },
      end: {
        date: endDateSelected,
        time: endDateSelected
          ? endDateSelected
          : DateRangeUtils.includeTimeToDate(moment().toDate(), 23, 59)
      }
    });
  };

  const globalOnChange = async () => {
    const newDates: DateRange = DateRangeUtils.buildRangeDate(state, dateType);
    await onChangeState(newDates);
  };

  const onChangeState = async (dateRange: DateRange) => {
    fieldState?.onChange?.(dateRange);
    await fieldState?.validate();
    onChange?.(dateRange);
  };

  const onBlurInputs = (input: 'START_DATE' | 'END_DATE') => (event: any) => {
    const date = new Date(event?.target?.value);
    const newValue = fieldState?.value || value || [null, null];
    if (moment(date).isValid()) {
      if (input === 'START_DATE') {
        newValue[0] = date;
      } else {
        newValue[1] = date;
      }
      if (
        newValue[0] &&
        newValue[1] &&
        moment(newValue[0]).diff(newValue[1]) > 1
      ) {
        setUpdateOrder(true);
        return;
      }
      fieldState?.onChange(newValue);
      onChange?.(newValue);
      setState(
        DateRangeUtils.initialDate(
          fieldState,
          newValue,
          startValueTime,
          endValueTime
        )
      );
      return;
    }
    setUpdateOrder(true);
  };

  return (
    <Observer
      render={() => (
        <StyledDatePicker
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
            <DateRangeComponents
              state={state}
              onChangeDate={onChangeDate}
              onChangeTime={onChangeTime}
              onChangeDateTime={onChangeDateTime}
              dateType={dateType}
              format={format}
              minTime={minTime}
              maxTime={maxTime}
              shortcuts={shortcuts}
              selectedShortcutIndex={selectedShortcutIndex}
              onShortcutChange={onShortcutChange}
              disabled={disabled}
              startTimeProps={startTimeProps}
              endTimeProps={endTimeProps}
              useAmPm={useAmPm}
              precision={precision}
              dayPickerProps={dayPickerProps}
              popoverProps={popoverProps}
              onClosing={globalOnChange}
              allowSingleDayRange={allowSingleDayRange}
              upperCaseFormat={upperCaseFormat}
              tipLabels={subLabels}
              onBlurInputs={onBlurInputs}
              {...{ updateOrder, setUpdateOrder }}
            />
          </FormFieldContainer>
        </StyledDatePicker>
      )}
    />
  );
};
