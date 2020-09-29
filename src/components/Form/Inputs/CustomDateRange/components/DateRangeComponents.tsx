import React from 'react';
import { Popover } from '@blueprintjs/core';
import { IDateRange } from '../type/IDateRange';
import { DateRangeDateTimeSection } from './DateRangeDateTimeSection';
import { DateRangeInputSection } from './DateRangeInputSection';
import { DEFAULT_FORMAT } from '../type/ITypes';
import { DateRangeTimeSection } from './DateRangeTimeSection';
import { DateRangeTimeSectionWrapper } from '../styled/styles';
import { DateRangeUtils } from '../utils/DateRangeUtils';

export const DateRangeComponents = (props: IDateRange) => {
  const {
    dateType,
    minTime,
    maxTime,
    shortcuts,
    onShortcutChange,
    selectedShortcutIndex,
    format,
    disabled,
    state,
    onChangeDate,
    onChangeTime,
    startTimeProps,
    endTimeProps,
    fieldState,
    onOpening,
    useAmPm,
    precision,
    dayPickerProps,
    modifiers
  } = props;

  const { startTime, endTime } = DateRangeUtils.transformState(state);

  const onClosing = async () => await fieldState?.validate();

  return (
    <Popover
      content={
        <div>
          {dateType === 'DATE' || dateType === 'DATETIME' ? (
            <DateRangeDateTimeSection
              state={state}
              onChangeDate={onChangeDate}
              onChangeTime={onChangeTime}
              dateType={dateType}
              shortcuts={shortcuts ? shortcuts : false}
              onShortcutChange={onShortcutChange}
              selectedShortcutIndex={selectedShortcutIndex}
              minTime={minTime}
              maxTime={maxTime}
              disabled={disabled}
              startTimeProps={startTimeProps}
              endTimeProps={endTimeProps}
              useAmPm={useAmPm}
              precision={precision}
              dayPickerProps={dayPickerProps}
            />
          ) : (
            <DateRangeTimeSectionWrapper>
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
            </DateRangeTimeSectionWrapper>
          )}
        </div>
      }
      minimal
      onClosing={onClosing}
      onOpening={onOpening}
      modifiers={{
        preventOverflow: { boundariesElement: 'viewport' },
        ...modifiers
      }}
    >
      <DateRangeInputSection
        format={format ?? DEFAULT_FORMAT}
        state={state}
        dateType={dateType}
      />
    </Popover>
  );
};
