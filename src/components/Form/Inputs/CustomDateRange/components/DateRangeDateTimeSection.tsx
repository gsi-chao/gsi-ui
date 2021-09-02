import React from 'react';
import { IDateRangeDateTimeSection } from '../type/IDateRangeDateTimeSection';
import {
  DateRangeDateTimeSectionBody,
  DateRangePickerStyled,
  DateRangeTimeSectionDateTimeBody
} from '../styled/styles';
import { DateRangeTimeSection } from './DateRangeTimeSection';
import { DateRangeUtils } from '../utils/DateRangeUtils';
import { Boundary } from '@blueprintjs/core';
import { DateRange } from '@blueprintjs/datetime';

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
    allowSingleDayRange,
    boundary,
    onHoverChange
  } = props;

  const {
    startDate,
    startTime,
    endDate,
    endTime
  } = DateRangeUtils.transformState(state);

  const onDayClick = (
    day: Date,
    modifiers: any,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const dateToSend: DateRange =
      boundary === Boundary.START ? [day, endDate] : [startDate, day];
    props?.dayPickerProps?.onDayClick?.(day, modifiers, e);
    onChangeDate(dateToSend);
  };

  return (
    <DateRangeDateTimeSectionBody dateType={dateType}>
      <DateRangePickerStyled
        value={[startDate, endDate]}
        dayPickerProps={{
          ...dayPickerProps,
          onDayClick,
          fixedWeeks: true
        }}
        boundaryToModify={boundary}
        maxDate={maxTime}
        minDate={minTime}
        onShortcutChange={onShortcutChange}
        selectedShortcutIndex={selectedShortcutIndex}
        shortcuts={shortcuts}
        disabled={disabled}
        allowSingleDayRange={allowSingleDayRange}
        onHoverChange={onHoverChange}
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
