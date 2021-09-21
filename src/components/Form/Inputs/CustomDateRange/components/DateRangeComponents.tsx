import React, { useRef, useState } from 'react';
import {
  Boundary,
  Popover,
  PopoverInteractionKind,
  Position
} from '@blueprintjs/core';
import { IDateRange } from '../type/IDateRange';
import { DateRangeDateTimeSection } from './DateRangeDateTimeSection';
import { DateRangeInputSection } from './DateRangeInputSection';
import { DEFAULT_FORMAT } from '../type/ITypes';
import { DateRangeTimeSection } from './DateRangeTimeSection';
import { DateRangeTimeSectionWrapper } from '../styled/styles';
import { DateRangeUtils } from '../utils/DateRangeUtils';
import { DateRange, DateRangeShortcut } from '@blueprintjs/datetime';
import moment from 'moment';
import { useClickAway } from 'react-use';

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
    onChangeDateTime,
    allowSingleDayRange,
    tipLabels,
    upperCaseFormat,
    setUpdateOrder,
    updateOrder
  } = props;
  const [isOpen, setOpen] = useState(false);
  const { startTime, endTime } = DateRangeUtils.transformState(state);
  const isNullDateRangeRef = useRef(false);
  const [boundary, setBoundary] = useState<Boundary>(Boundary.START);

  const onFocusInputs = (bound: Boundary) => () => {
    setBoundary(bound);
    if (!disabled && !isOpen) {
      setOpen(true);
    }
  };
  const onBlurInputs = (bound: Boundary) => (event: any) => {
    props.onBlurInputs?.(bound)(event);
  };

  const internalOnShortcutChange = (
    shortcut: DateRangeShortcut,
    index: number
  ) => {
    const isNotNullRange = shortcut.dateRange.every(it => !!it);
    const newValue: DateRange = isNotNullRange
      ? shortcut.dateRange
      : [null, null];
    if (shortcut?.includeTime) {
      onChangeDateTime(newValue);
    } else {
      onChangeDate(newValue);
      if (!isNotNullRange) {
        const toDay = moment().toDate();
        onChangeTime('START')(DateRangeUtils.includeTimeToDate(toDay, 24, 0));
        onChangeTime('END')(DateRangeUtils.includeTimeToDate(toDay, 23, 59));
      }
    }
    isNullDateRangeRef.current = true;
    onShortcutChange?.(shortcut, index);
  };

  const onClickInput = (type: Boundary) => () => {
    setBoundary(type);
  };

  const handleDateRangePickerChange = (selectedDates: DateRange) => {
    const { startDate } = DateRangeUtils.transformState(state);
    const [selectedStart, selectedEnd] = selectedDates;
    const nextBoundary =
      selectedStart &&
      startDate &&
      moment(startDate).format('MM/DD/YYYY') ===
        moment(selectedStart).format('MM/DD/YYYY')
        ? Boundary?.START
        : Boundary.END;
    setBoundary(
      !selectedStart
        ? Boundary.START
        : !selectedEnd
        ? Boundary.END
        : nextBoundary
    );

    if (selectedStart && selectedEnd) {
      if (moment(selectedEnd).diff(selectedStart, 'day') < 1) {
        onChangeDate([selectedEnd, selectedStart]);
        return;
      }
    }
    onChangeDate(selectedDates);
  };

  const ref = useRef<null | HTMLDivElement>(null);
  useClickAway(ref, () => setOpen(false));

  return (
    <Popover
      minimal
      enforceFocus={false}
      interactionKind={PopoverInteractionKind.HOVER}
      isOpen={isOpen}
      onClosing={onClosing}
      onOpening={onOpening}
      usePortal
      position={Position.BOTTOM_LEFT}
      autoFocus={false}
      modifiers={{
        preventOverflow: { boundariesElement: 'viewport' },
        ...popoverProps
      }}
      shouldReturnFocusOnClose={false}
      content={
        <div ref={ref}>
          {dateType === 'DATE' || dateType === 'DATETIME' ? (
            <DateRangeDateTimeSection
              state={state}
              boundary={boundary}
              onChangeDate={handleDateRangePickerChange}
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
              allowSingleDayRange={allowSingleDayRange}
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
        upperCaseFormat={upperCaseFormat}
        tipLabels={tipLabels}
        onBlurInputs={onBlurInputs}
        onFocusInputs={onFocusInputs}
        {...{ updateOrder, setUpdateOrder }}
      />
    </Popover>
  );
};
