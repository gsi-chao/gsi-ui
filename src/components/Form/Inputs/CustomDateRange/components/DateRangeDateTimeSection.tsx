import React from 'react';
import { DateRangePicker } from '@blueprintjs/datetime';
import { IDateRangeDateTimeSection } from '../type/IDateRangeDateTimeSection';
import {
  DateRangeDateTimeSectionBody,
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
    dayPickerProps
  } = props;

  const {
    startDate,
    startTime,
    endDate,
    endTime
  } = DateRangeUtils.transformState(state);

  return (
    <DateRangeDateTimeSectionBody dateType={dateType}>
      <DateRangePicker
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
