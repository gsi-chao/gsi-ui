import { IStateCustomDateRange } from './IStateCustomDateRange';
import {
  DateRange,
  IDateRangeShortcut,
  TimePrecision
} from '@blueprintjs/datetime';
import { IDateType } from './ITypes';
import { ITimeProps } from './ICustomDateTimePicker';
import { DayPickerProps } from 'react-day-picker';
import { Boundary } from '@blueprintjs/core';

export interface IDateRangeDateTimeSection {
  state: IStateCustomDateRange;
  boundary: Boundary;
  onChangeDate: (selectedDates: DateRange) => void;
  onChangeTime: (type: 'START' | 'END') => (value: Date) => void;
  dateType: IDateType;
  maxTime?: Date;
  minTime?: Date;
  onShortcutChange?: (shortcut: IDateRangeShortcut, index: number) => void;
  shortcuts?: boolean | IDateRangeShortcut[];
  selectedShortcutIndex?: number;
  disabled?: boolean;
  startTimeProps?: ITimeProps;
  endTimeProps?: ITimeProps;
  useAmPm?: boolean;
  precision?: TimePrecision;
  dayPickerProps?: DayPickerProps;
  allowSingleDayRange?: boolean;
  onHoverChange?: (
    hoveredDates: DateRange,
    hoveredDay: Date,
    hoveredBoundary: Boundary
  ) => void;
}
