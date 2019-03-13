import { ISetupEditToolbar, IVActionEditTableProps } from './Table';

export type EditColumns = 'ALL';
export type DefaultheightRow = 'SHORT' | 'HALF' | 'LONG';
export type CellSelectionType = 'FREE' | 'ENTIRE_ROW' | 'CELL';

export interface EditSetup {
  editToolbar?: ISetupEditToolbar;
  editColumn: IVActionEditTableProps;
  onSave: (data: any) => void;
  invalidDataMessage?: (invalidColumns: string[]) => void;
}

export interface IDataEdited {
  rowIndex: number;
  data: any;
}

export interface IActionSelection {
  onSelectionChange?: any;
  clearSelection?: boolean;
  onSelectionCleaned?: (isSelectionCleaned:boolean)=> any


}
