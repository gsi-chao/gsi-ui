import moment from 'moment';
import { IStateCustomDateRange } from '../type/IStateCustomDateRange';
import {
  FormatDefaultDate,
  FormatDefaultDateTime,
  FormatDefaultTime,
  IDateType
} from '../type/ITypes';
import { DateRange } from '@blueprintjs/datetime';
import { FieldState } from 'formstate';
import { ITransformState } from '../type/ITransformState';

const includeTimeToDate = (date: Date, hour: number, minute: number) => {
  return moment(date)
    .set({
      hour,
      minute
    })
    .toDate();
};

const momentFormatter = (str: Date, format: string): string => {
  return !moment(str, format, true).isValid()
    ? ''
    : moment(str, format).format(format);
};

const momentTwoFormatter = (
  str: Date | null,
  format1: string,
  format2: string
): string => {
  if (!str) return '';

  return !moment(str, format1, true).isValid()
    ? ''
    : moment(str, format1).format(format2);
};

const isValidDate = (date: Date | null) => !!date && moment(date).isValid();

const buildRangeDate = (
  state: IStateCustomDateRange,
  dateType: IDateType
): DateRange => {
  const { start, end } = state;
  const { date: startDate, time: startTime } = start;
  const { date: endDate, time: endTime } = end;
  let responseDate: DateRange = [null, null];

  const formatExpression = (date: Date | null, isDate: boolean) =>
    momentTwoFormatter(
      date,
      moment.defaultFormat,
      isDate ? FormatDefaultDate : FormatDefaultTime
    );

  switch (dateType) {
    case 'TIME':
      responseDate = [startTime, endTime];
      break;
    case 'DATE':
      responseDate = [startDate, endDate];
      break;
    case 'DATETIME':
      const date1 = formatExpression(startDate, true);
      const date2 = formatExpression(endDate, true);
      const time1 = formatExpression(startTime, false);
      const time2 = formatExpression(endTime, false);

      const dateTime1 = moment(
        `${date1} ${time1}`,
        FormatDefaultDateTime
      ).toDate();
      const dateTime2 = moment(
        `${date2} ${time2}`,
        FormatDefaultDateTime
      ).toDate();

      responseDate = [
        moment(dateTime1).isValid() ? dateTime1 : null,
        moment(dateTime2).isValid() ? dateTime2 : null
      ];
  }

  return responseDate;
};

const initialDate = (
  fieldState?: FieldState<any>,
  value?: any,
  startValueTime?: Date,
  endValueTime?: Date
): IStateCustomDateRange => {
  const defaultConfig = {
    start: {
      date: null,
      time: startValueTime
        ? startValueTime
        : DateRangeUtils.includeTimeToDate(moment().toDate(), 24, 0)
    },
    end: {
      date: null,
      time: endValueTime
        ? endValueTime
        : DateRangeUtils.includeTimeToDate(moment().toDate(), 23, 59)
    }
  };

  const buildState = (range: any) => {
    if (range.length === 2 && range.some((it: any) => !!it)) {
      const [start, end] = range;
      const {
        start: defaultConfigStart,
        end: defaultConfigEnd
      } = defaultConfig;

      return {
        start: getTimeAndDate(
          moment(start).isValid() ? start : null,
          defaultConfigStart
        ),
        end: getTimeAndDate(
          moment(end).isValid() ? end : null,
          defaultConfigEnd
        )
      };
    }
    return defaultConfig;
  };

  if (fieldState) {
    return buildState(fieldState.value);
  }

  if (value) {
    return buildState(value);
  }

  return defaultConfig;
};

const getTimeAndDate = (
  date: Date | null,
  defaultConfig: { date: Date | null; time: Date }
) => {
  if (date) {
    const dateParse = moment(`${date}`).format('MM-DD-YYYY');
    const timeParse = moment(`${date}`).format('hh:mm A');

    return {
      date: moment(`${dateParse}`, FormatDefaultDate).toDate(),
      time: moment(`${dateParse} ${timeParse}`, FormatDefaultDateTime).toDate()
    };
  }

  return defaultConfig;
};

const transformState = (state: IStateCustomDateRange): ITransformState => {
  const { start, end } = state;
  const { date: startDate, time: startTime } = start;
  const { date: endDate, time: endTime } = end;
  return { startDate, startTime, endDate, endTime };
};

export const DateRangeUtils = {
  includeTimeToDate,
  momentFormatter,
  momentTwoFormatter,
  buildRangeDate,
  isValidDate,
  initialDate,
  transformState
};
