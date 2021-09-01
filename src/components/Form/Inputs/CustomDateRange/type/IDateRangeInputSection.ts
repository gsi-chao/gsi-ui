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
  onBlurInputs?: (input: Boundary) => (event: any) => void;
  onFocusInputs?: (input: Boundary) => () => void;
  updateOrder?: boolean;
  setUpdateOrder?: (value: boolean) => void;
}
