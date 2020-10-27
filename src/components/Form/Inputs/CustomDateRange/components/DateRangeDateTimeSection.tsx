import React from 'react';
import { IDateRangeDateTimeSection } from '../type/IDateRangeDateTimeSection';
import {
  DateRangeDateTimeSectionBody,
  DateRangePickerStyled,
  DateRangeTimeSectionDateTimeBody
} from '../styled/styles';
import { DateRangeTimeSection } from './DateRangeTimeSection';
import { DateRangeUtils } from '../utils/DateRangeUtils';

export const DateRangeDateTimeSection = (props: IDateRangeDateTimeSection) => {
  const {
    onShortcutChange,
    selectedShortcutIndex,
    shortcuts,
    minTime,
    maxTime,
    dateType,
    disabled,
    state,
    onChangeDate,
    onChangeTime,
    startTimeProps,
    endTimeProps,
    useAmPm,
    precision,
    dayPickerProps,
    allowSingleDayRange
  } = props;

  const {
    startDate,
    startTime,
    endDate,
    endTime
  } = DateRangeUtils.transformState(state);

  return (
    <DateRangeDateTimeSectionBody dateType={dateType}>
      <DateRangePickerStyled
        value={[startDate, endDate]}
        onChange={onChangeDate}
        dayPickerProps={{
          fixedWeeks: true,
          ...dayPickerProps
        }}
        maxDate={maxTime}
        minDate={minTime}
        onShortcutChange={onShortcutChange}
        selectedShortcutIndex={selectedShortcutIndex}
        shortcuts={shortcuts}
        disabled={disabled}
        allowSingleDayRange={allowSingleDayRange}
      />
      {dateType === 'DATETIME' && (
        <DateRangeTimeSectionDateTimeBody>
          <DateRangeTimeSection
            startTime={{
              value: startTime,
              onChange: onChangeTime('START'),
              useAmPm: startTimeProps?.useAmPm ?? useAmPm,
              precision: startTimeProps?.precision ?? precision
            }}
            endTime={{
              value: endTime,
              onChange: onChangeTime('END'),
              useAmPm: endTimeProps?.useAmPm ?? useAmPm,
              precision: endTimeProps?.precision ?? precision
            }}
            disabled={disabled}
          />
        </DateRangeTimeSectionDateTimeBody>
      )}
    </DateRangeDateTimeSectionBody>
  );
};
