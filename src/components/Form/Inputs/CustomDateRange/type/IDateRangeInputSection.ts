import { IStateCustomDateRange } from './IStateCustomDateRange';
import { IDateType } from './ITypes';
import { ITipLabel } from './ICustomDateTimePicker';
import { Boundary } from '@blueprintjs/core';

export interface IDateRangeInputSection {
  state: IStateCustomDateRange;
  disabled?: boolean;
  format: string;
  dateType: IDateType;
  onClick?: (type: Boundary) => () => void;
  tipLabels?: ITipLabel;
  upperCaseFormat?: boolean;
  onBlurInputs?: (input: 'START_DATE' | 'END_DATE') => (event: any) => void;
  onFocusInputs?: () => void;
  updateOrder?: boolean;
  setUpdateOrder?: (value: boolean) => void;
}
