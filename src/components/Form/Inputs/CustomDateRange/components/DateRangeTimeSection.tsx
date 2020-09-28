import React from 'react';
import { DateRangeTimeSectionBody } from '../styled/styles';
import { TimePicker } from '@blueprintjs/datetime';
import { IDateRangeTimeSection } from '../type/IDateRangeTimeSection';

export const DateRangeTimeSection = (props: IDateRangeTimeSection) => {
  const { startTime, endTime, disabled } = props;
  const {
    value: startValue,
    onChange: startOnChange,
    useAmPm: startUseAmPm,
    precision: startPrecision
  } = startTime;
  const {
    value: endValue,
    onChange: endOnChange,
    useAmPm: endUseAmPm,
    precision: endPrecision
  } = endTime;

  return (
    <DateRangeTimeSectionBody>
      <TimePicker
        value={startValue}
        useAmPm={startUseAmPm || false}
        precision={startPrecision || 'second'}
        onChange={startOnChange}
        disabled={disabled}
      />
      <TimePicker
        value={endValue}
        useAmPm={endUseAmPm || false}
        precision={endPrecision || 'second'}
        onChange={endOnChange}
        disabled={disabled}
      />
    </DateRangeTimeSectionBody>
  );
};
