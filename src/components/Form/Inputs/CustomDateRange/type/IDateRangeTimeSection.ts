import { TimePrecision } from '@blueprintjs/datetime';

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
