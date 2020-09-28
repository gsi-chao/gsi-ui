import { IDateRangeShortcut } from '@blueprintjs/datetime/src/shortcuts';
import { DateRange } from '@blueprintjs/datetime';
import { TimePrecision } from '@blueprintjs/datetime/src/timePicker';
import { IFieldProps } from '../../IFieldProps';
import { IDateType } from './ITypes';
import { DayPickerProps } from 'react-day-picker';

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
}

export interface ITimeProps {
  value?: Date;
  useAmPm?: boolean;
  precision?: TimePrecision;
}
