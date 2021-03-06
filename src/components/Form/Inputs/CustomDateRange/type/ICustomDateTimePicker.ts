import {
  DateRange,
  IDateRangeShortcut,
  TimePrecision
} from '@blueprintjs/datetime';
import { IFieldProps } from '../../IFieldProps';
import { IDateType } from './ITypes';
import { DayPickerProps } from 'react-day-picker';
import { Modifiers as PopperModifiers } from 'popper.js';

export interface ICustomDateTimePicker extends IFieldProps {
  dateType: IDateType;
  fill?: boolean;
  format?: string;
  tipLabel?: string;
  maxTime?: Date;
  minTime?: Date;
  onChange?: (date: DateRange) => void;
  onShortcutChange?: (shortcut: IDateRangeShortcut, index: number) => void;
  shortcuts?: boolean | IDateRangeShortcut[];
  selectedShortcutIndex?: number;
  startTimeProps?: ITimeProps;
  endTimeProps?: ITimeProps;
  useAmPm?: boolean;
  precision?: TimePrecision;
  dayPickerProps?: DayPickerProps;
  popoverProps?: PopperModifiers;
  allowSingleDayRange?: boolean;
  upperCaseFormat?: boolean;
  subLabels?: ITipLabel;
}

export interface ITimeProps {
  initValue?: Date;
  useAmPm?: boolean;
  precision?: TimePrecision;
}

export interface ITipLabel {
  start: string;
  end: string;
}
