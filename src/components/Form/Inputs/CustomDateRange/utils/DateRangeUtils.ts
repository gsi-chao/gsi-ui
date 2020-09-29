import moment from 'moment';
import { IStateCustomDateRange } from '../type/IStateCustomDateRange';
import { IDateType } from '../type/ITypes';
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

const isValidDate = (date: Date | null) => !!date && moment(date).isValid();

const buildRangeDate = (
  state: IStateCustomDateRange,
  dateType: IDateType
): DateRange => {
  const { start, end } = state;
  const { date: startDate, time: startTime } = start;
  const { date: endDate, time: endTime } = end;
  let responseDate: DateRange = [null, null];

  switch (dateType) {
    case 'TIME':
      responseDate = [startTime, endTime];
      break;
    case 'DATE':
      responseDate = [startDate, endDate];
      break;
    case 'DATETIME':
      const date1 = moment(`${startDate}`).format('MM-DD-YYYY');
      const date2 = moment(`${endDate}`).format('MM-DD-YYYY');
      const time1 = moment(`${startTime}`).format('hh:mm A');
      const time2 = moment(`${endTime}`).format('hh:mm A');

      const dateTime1 = moment(`${date1} ${time1}`).toDate();
      const dateTime2 = moment(`${date2} ${time2}`).toDate();

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
      date: moment(`${dateParse}`).toDate(),
      time: moment(`${dateParse} ${timeParse}`).toDate()
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
  buildRangeDate,
  isValidDate,
  initialDate,
  transformState
};
