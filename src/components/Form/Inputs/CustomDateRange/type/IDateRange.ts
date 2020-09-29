import {
  DateRange,
  IDateRangeShortcut,
  TimePrecision
} from '@blueprintjs/datetime';
import { IStateCustomDateRange } from './IStateCustomDateRange';
import { IDateType } from './ITypes';
import { ITimeProps } from './ICustomDateTimePicker';
import { FieldState } from 'formstate';
import { DayPickerProps } from 'react-day-picker';
import { Modifiers as PopperModifiers } from 'popper.js';

export interface IDateRange {
  state: IStateCustomDateRange;
  onChangeDate: (selectedDates: DateRange) => void;
  onChangeTime: (type: 'START' | 'END') => (value: Date) => void;
  dateType: IDateType;
  format?: string;
  maxTime?: Date;
  minTime?: Date;
  onChange?: (date: DateRange) => void;
  onShortcutChange?: (shortcut: IDateRangeShortcut, index: number) => void;
  shortcuts?: boolean | IDateRangeShortcut[];
  selectedShortcutIndex?: number;
  disabled?: boolean;
  startTimeProps?: ITimeProps;
  endTimeProps?: ITimeProps;
  fieldState?: FieldState<any>;
  onOpening?: () => void;
  useAmPm?: boolean;
  precision?: TimePrecision;
  dayPickerProps?: DayPickerProps;
  modifiers?: PopperModifiers;
}
