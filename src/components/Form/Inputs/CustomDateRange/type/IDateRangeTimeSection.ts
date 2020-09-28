import { TimePrecision } from '@blueprintjs/datetime/src/timePicker';

export interface IDateRangeTimeSection {
  startTime: {
    value: Date;
    onChange: (date: Date) => void;
    useAmPm?: boolean;
    precision?: TimePrecision;
  };
  endTime: {
    value: Date;
    onChange: (date: Date) => void;
    useAmPm?: boolean;
    precision?: TimePrecision;
  };
  disabled?: boolean;
}
