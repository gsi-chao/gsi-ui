import { IStateCustomDateRange } from './IStateCustomDateRange';
import { IDateType } from './ITypes';

export interface IDateRangeInputSection {
  state: IStateCustomDateRange;
  format: string;
  dateType: IDateType;
  onClick?: () => void;
}
