import React, { useRef, useState } from 'react';
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
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
    onOpening,
    onClosing,
    useAmPm,
    precision,
    dayPickerProps,
    popoverProps,
    onChangeState
  } = props;
  const [isOpen, setOpen] = useState(false);

  const { startTime, endTime } = DateRangeUtils.transformState(state);

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

  const onClickInput = () => {
    !disabled && setOpen(true);
  };

  const onInteraction = (nextOpenState: boolean) => {
    if (!nextOpenState && !isNullDateRangeRef.current) setOpen(false);
    isNullDateRangeRef.current = false;
  };

  return (
    <Popover
      minimal
      interactionKind={PopoverInteractionKind.HOVER}
      isOpen={isOpen}
      onClosing={onClosing}
      onOpening={onOpening}
      position={Position.BOTTOM_LEFT}
      autoFocus={false}
      modifiers={{
        preventOverflow: { boundariesElement: 'viewport' },
        ...popoverProps
      }}
      onInteraction={onInteraction}
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
    >
      <DateRangeInputSection
        format={format ?? DEFAULT_FORMAT}
        state={state}
        dateType={dateType}
        disabled={disabled}
        onClick={onClickInput}
      />
    </Popover>
  );
};
