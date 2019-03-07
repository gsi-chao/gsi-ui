import { ISetupEditToolbar, IVActionEditTableProps } from './Table';

export type Edit = 'ALL';
export type DefaultheightRow = 'SHORT' | 'HALF' | 'LONG';
export type CellSelectionType = 'FREE' | 'ENTIRE_ROW';

export interface EditSetup {
  editToolbar?: ISetupEditToolbar;
  editColumn: IVActionEditTableProps | Edit;
  onSave: (data: any) => void;
}

export interface IDataEdited {
  rowIndex: number;
  data: any;
}
