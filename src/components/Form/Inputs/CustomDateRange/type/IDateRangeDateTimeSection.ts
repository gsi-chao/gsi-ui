import { IDateRangeShortcut } from '@blueprintjs/datetime/src/shortcuts';
import { IStateCustomDateRange } from './IStateCustomDateRange';
import { DateRange } from '@blueprintjs/datetime';
import { IDateType } from './ITypes';
import { ITimeProps } from './ICustomDateTimePicker';
import { TimePrecision } from '@blueprintjs/datetime/src/timePicker';
import { DayPickerProps } from 'react-day-picker';

export interface IDateRangeDateTimeSection {
  state: IStateCustomDateRange;
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
}
