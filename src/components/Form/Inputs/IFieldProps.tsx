import { FieldState } from 'formstate';
import { ILayer } from './ILayer';

/**
 * Field Props
 */
export interface IFieldProps {
  /** Any UI stuff you need */
  label?: string;
  labelInfo?: string;
  disabled?: boolean;
  inline?: boolean;
  size?: 'large' | 'small';
  type?: any;
  loading?: boolean;
  placeholder?: string;
  id: string;
  className?: string;
  noLabel?: boolean;
  layer?: ILayer;
  onChange?: (value: any) => void;
  onKeyPress?: (e: any) => void;
  required?: boolean;
  validators?: any[];
  minimal?: boolean;
  margin?: string;
  value?: any;

  /** The fieldState */
  fieldState?: FieldState<any>;
}
