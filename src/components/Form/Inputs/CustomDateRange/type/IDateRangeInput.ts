export interface IDateRangeInput {
  id: string;
  format: string;
  valueField: string;
  disabled?: boolean;
  onBlur?: (event: any) => void;
  onChange?: (event: any) => void;
  onFocus?: () => void;
  onClick?: () => void;
  upperCaseFormat?: boolean;
  tipLabel?: string;
}
