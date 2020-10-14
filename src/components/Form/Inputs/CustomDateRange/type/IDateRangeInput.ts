export interface IDateRangeInput {
  id: string;
  placeholder: string;
  valueField: string;
  disabled?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  onClick?: () => void;
  upperCaseFormat?: boolean;
}
