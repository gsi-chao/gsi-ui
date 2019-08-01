import { InfoSelection } from '../../../type';

export interface IColorWidget {
  row?: number;
  column?: string;
  backgroundColor: string;
  color?: string;
  value?: string;
  printColor: (value: string, infoSelection?: InfoSelection) => boolean;
}
