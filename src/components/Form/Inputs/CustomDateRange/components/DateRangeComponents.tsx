import React, { useRef, useState } from 'react';
import { Popover, PopoverInteractionKind } from '@blueprintjs/core';
import { IDateRange } from '../type/IDateRange';
import { DateRangeDateTimeSection } from './DateRangeDateTimeSection';
import { DateRangeInputSection } from './DateRangeInputSection';
import { DEFAULT_FORMAT } from '../type/ITypes';
import { DateRangeTimeSection } from './DateRangeTimeSection';
import { DateRangeTimeSectionWrapper } from '../styled/styles';
import { DateRangeUtils } from '../utils/DateRangeUtils';
import { IDateRangeShortcut } from '@blueprintjs/datetime';

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
    modifiers,
    onChangeState
  } = props;
  const [isOpen, setOpen] = useState(false);

  const { startTime, endTime } = DateRangeUtils.transformState(state);

  const onClosing = async () => await fieldState?.validate();

  const isNullDateRangeRef = useRef(false);

  const internalOnShortcutChange = (
    shortcut: IDateRangeShortcut,
    index: number
  ) => {
    const isNotNullRange = shortcut.dateRange.every(it => !!it);
    if (isNotNullRange) {
      onChangeState(shortcut.dateRange);
    } else {
      onChangeState([null, null]);
      isNullDateRangeRef.current = true;
    }

    onShortcutChange?.(shortcut, index);
  };

  const onFocusInput = () => {
    setOpen(!isOpen);
  };

  const onInteraction = (nextOpenState: boolean) => {
    if (!nextOpenState && !isNullDateRangeRef.current) setOpen(false);
    isNullDateRangeRef.current = false;
  };

  return (
    <Popover
      interactionKind={PopoverInteractionKind.HOVER}
      isOpen={isOpen}
      content={
        <div>
          {dateType === 'DATE' || dateType === 'DATETIME' ? (
            <DateRangeDateTimeSection
              state={state}
              onChangeDate={onChangeDate}
              onChangeTime={onChangeTime}
              dateType={dateType}
              shortcuts={shortcuts ? shortcuts : false}
              onShortcutChange={internalOnShortcutChange}
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
      onInteraction={onInteraction}
    >
      <DateRangeInputSection
        format={format ?? DEFAULT_FORMAT}
        state={state}
        dateType={dateType}
        onFocus={onFocusInput}
      />
    </Popover>
  );
};
