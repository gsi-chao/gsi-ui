import React, { useEffect, useMemo, useState } from 'react';
import { DateRangeInputSectionStyled } from '../styled/styles';
import { DateRangeInput } from './DateRangeInput';
import { IDateRangeInputSection } from '../type/IDateRangeInputSection';
import { DateRangeUtils } from '../utils/DateRangeUtils';
import { DEFAULT_FORMAT } from '../type/ITypes';
import moment from 'moment';
import { Boundary } from '@blueprintjs/core';

export const DateRangeInputSection = (props: IDateRangeInputSection) => {
  const {
    state,
    format,
    disabled,
    dateType,
    onClick,
    upperCaseFormat,
    tipLabels,
    onBlurInputs,
    onFocusInputs,
    setUpdateOrder,
    updateOrder
  } = props;

  const [startDate, endDate] = useMemo(() => {
    const [date1, date2] = DateRangeUtils.buildRangeDate(state, dateType);
    const build = (date: Date | null) =>
      !!date && moment(date).isValid()
        ? DateRangeUtils.momentFormatter(date, format ?? DEFAULT_FORMAT)
        : '';
    const isValid =
      (!!date1 && moment(date1).isValid()) ||
      (!!date2 && moment(date2).isValid());
    return isValid ? [build(date1), build(date2)] : ['', ''];
  }, [state]);

  const [startDateVal, setStartDate] = useState<string>(startDate);
  const [endDateVal, setEndDate] = useState<string>(startDate);

  useEffect(() => {
    setStartDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setEndDate(endDate);
  }, [endDate]);

  useEffect(() => {
    if (updateOrder) {
      setStartDate(startDate);
      setEndDate(endDate);
      setUpdateOrder?.(false);
    }
  }, [updateOrder]);

  return (
    <DateRangeInputSectionStyled>
      <div style={{ flexGrow: 1, paddingRight: '2px' }}>
        <DateRangeInput
          id={'date-range-input-start-date'}
          format={format}
          valueField={startDateVal}
          onClick={onClick?.(Boundary.START)}
          disabled={disabled}
          upperCaseFormat={upperCaseFormat}
          tipLabel={tipLabels?.start}
          onBlur={onBlurInputs?.(Boundary.START)}
          onChange={setStartDate}
          onFocus={onFocusInputs?.(Boundary.START)}
        />
      </div>

      <div style={{ flexGrow: 1 }}>
        <DateRangeInput
          id={'date-range-input-end-date'}
          format={format}
          valueField={endDateVal}
          onClick={onClick?.(Boundary.END)}
          disabled={disabled}
          upperCaseFormat={upperCaseFormat}
          tipLabel={tipLabels?.end}
          onBlur={onBlurInputs?.(Boundary.END)}
          onChange={setEndDate}
          onFocus={onFocusInputs?.(Boundary.END)}
        />
      </div>
    </DateRangeInputSectionStyled>
  );
};
