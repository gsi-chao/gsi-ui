import React, { useMemo } from 'react';
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
    tipLabels
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

  return (
    <DateRangeInputSectionStyled>
      <div style={{ flexGrow: 1, paddingRight: '2px' }}>
        <DateRangeInput
          id={'date-range-input-start-date'}
          placeholder={format}
          valueField={startDate}
          onClick={onClick?.(Boundary.START)}
          disabled={disabled}
          upperCaseFormat={upperCaseFormat}
          tipLabel={tipLabels?.start}
        />
      </div>

      <div style={{ flexGrow: 1 }}>
        <DateRangeInput
          id={'date-range-input-end-date'}
          placeholder={format}
          valueField={endDate}
          onClick={onClick?.(Boundary.END)}
          disabled={disabled}
          upperCaseFormat={upperCaseFormat}
          tipLabel={tipLabels?.end}
        />
      </div>
    </DateRangeInputSectionStyled>
  );
};
