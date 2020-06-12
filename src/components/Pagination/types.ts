import { PaginationProps } from 'rc-pagination';

export interface IPagination extends PaginationProps {
  buttonColor?: string;
  position?: 'start' | 'center' | 'end';
  local?: string;
  disabled?: boolean
}
