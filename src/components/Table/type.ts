import { ISetupEditToolbar, IVActionEditTableProps } from './Table';

export type EditColumns = 'ALL';
export type DefaultheightRow = 'SHORT' | 'HALF' | 'LONG';
export type CellSelectionType = 'FREE' | 'ENTIRE_ROW';


export interface EditSetup {
  editToolbar?: ISetupEditToolbar;
  editColumn: IVActionEditTableProps;
  onSave: (data: any) => void,
  invalidDataMessage?: (invalidColumns: string[]) => void
}

export interface IDataEdited {

  rowIndex: number;
  data: any;
}