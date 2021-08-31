import { FieldState } from 'formstate';
import moment from 'moment';
import { DateRange } from '@blueprintjs/datetime';

export interface IVCustomDateRangeV2 {
  defaultEndTimeWithEndDay?: boolean;
  format?: FormatType;
  fieldState?: FieldState<DateRange>;
  shortcuts?: IDateRangeShortcut[];
  onChange?: (range: DateRange) => void;
  value?: DateRange;
  id?: string;
  onChangeShortcut?: (shortcut: IDateRangeShortcut) => void;
}

export type FormatType =
  | 'MM/DD/YYYY hh:mm a'
  | 'MM/DD/YYYY'
  | 'MM/DD/YYYY HH:mm';

export interface IDateRangeShortcut {
  dateRange: [Date | null, Date | null];
  label: string;
  includeTime: boolean;
}

export const DEFAULT_SHORTCUTS: IDateRangeShortcut[] = [
  {
    dateRange: [
      moment(`${moment().format('MM/DD/YYYY')} 12:00 am`).toDate(),
      moment(`${moment().format('MM/DD/YYYY')} 11:59 pm`).toDate()
    ],
    label: 'Today',
    includeTime: true
  },
  {
    dateRange: [
      moment(`${moment().format('MM/DD/YYYY')} 12:00 am`)
        .subtract(1, 'day')
        .toDate(),
      moment(`${moment().format('MM/DD/YYYY')} 11:59 pm`)
        .subtract(1, 'day')
        .toDate()
    ],
    label: 'Yesterday',
    includeTime: true
  },
  {
    dateRange: [
      moment(
        `${moment()
          .startOf('week')
          .add(1, 'day')
          .format('MM/DD/YYYY')} 12:00 am`
      )
        .subtract(1, 'day')
        .toDate(),
      moment(
        `${moment()
          .endOf('week')
          .add(1, 'day')
          .format('MM/DD/YYYY')} 11:59 pm`
      )
        .subtract(1, 'day')
        .toDate()
    ],
    label: 'This week',
    includeTime: true
  },
  {
    dateRange: [
      moment(
        `${moment()
          .startOf('week')
          .subtract(6, 'day')
          .format('MM/DD/YYYY')} 12:00 am`
      )
        .subtract(1, 'day')
        .toDate(),
      moment(
        `${moment()
          .endOf('week')
          .subtract(6, 'day')
          .format('MM/DD/YYYY')} 11:59 pm`
      )
        .subtract(1, 'day')
        .toDate()
    ],
    label: 'Past week',
    includeTime: true
  },
  {
    dateRange: [
      moment(
        `${moment()
          .startOf('month')
          .subtract(1, 'month')
          .format('MM/DD/YYYY')} 12:00 am`
      ).toDate(),
      moment(
        `${moment()
          .endOf('month')
          .subtract(1, 'month')
          .format('MM/DD/YYYY')} 11:59 pm`
      ).toDate()
    ],
    label: 'Last month',
    includeTime: true
  },
  {
    dateRange: [
      moment(
        `${moment()
          .startOf('month')
          .format('MM/DD/YYYY')} 12:00 am`
      ).toDate(),
      moment(
        `${moment()
          .endOf('month')
          .format('MM/DD/YYYY')} 11:59 pm`
      ).toDate()
    ],
    label: 'This month',
    includeTime: true
  },
  {
    dateRange: [null, null],
    label: 'User Define',
    includeTime: true
  }
];
