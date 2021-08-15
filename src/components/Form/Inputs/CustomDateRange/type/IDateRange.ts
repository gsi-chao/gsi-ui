import {
  DateRange,
  IDateRangeShortcut,
  TimePrecision
} from '@blueprintjs/datetime';
import { IStateCustomDateRange } from './IStateCustomDateRange';
import { IDateType } from './ITypes';
import { ITimeProps, ITipLabel } from './ICustomDateTimePicker';
import { DayPickerProps } from 'react-day-picker';
import { Modifiers as PopperModifiers } from 'popper.js';

export interface IDateRange {
  state: IStateCustomDateRange;
  onChangeDate: (selectedDates: DateRange) => void;
  onChangeTime: (type: 'START' | 'END') => (value: Date) => void;
  onChangeDateTime: (selectedDates: DateRange) => void;
  dateType: IDateType;
  format?: string;
  maxTime?: Date;
  minTime?: Date;
  onShortcutChange?: (shortcut: IDateRangeShortcut, index: number) => void;
  shortcuts?: boolean | IDateRangeShortcut[];
  selectedShortcutIndex?: number;
  disabled?: boolean;
  startTimeProps?: ITimeProps;
  endTimeProps?: ITimeProps;
  onOpening?: () => void;
  onClosing?: () => void;
  useAmPm?: boolean;
  precision?: TimePrecision;
  dayPickerProps?: DayPickerProps;
  popoverProps?: PopperModifiers;
  allowSingleDayRange?: boolean;
  tipLabels?: ITipLabel;
  upperCaseFormat?: boolean;
  onBlurInputs?: (input: 'START_DATE' | 'END_DATE') => (event: any) => void;
  updateOrder?: boolean;
  setUpdateOrder?: (value: boolean) => void;
}
