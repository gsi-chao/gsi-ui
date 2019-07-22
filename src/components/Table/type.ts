import { ISetupEditToolbar, IVActionEditTableProps } from './Table';
import { IRegion } from '@blueprintjs/table';

export type EditColumns = 'ALL';
export type DefaultheightRow = 'SHORT' | 'HALF' | 'LONG';
export type CellSelectionType = 'FREE' | 'ENTIRE_ROW' | 'CELL' | 'DISABLED' | 'MULTIPLE_ENTIRE_ROWS';
export type ResultDataEdited = 'ENTIRE_ROW' | 'CELL';

export interface EditSetup {
  editToolbar?: ISetupEditToolbar;
  editColumn: IVActionEditTableProps;
  onSave: (data: any) => void;
  onCancel?:()=>void;
  onChange?:(value:any,infoSelection?:InfoSelection)=>void
  resultDataEdited?: ResultDataEdited;
  invalidDataMessage?: (invalidColumns: string[]) => void;
}

export interface ITooltips {
  show: (
    value: any,
    infoSelection?: InfoSelection
  ) => JSX.Element | string | undefined;
}
export interface InfoSelection {
  rowIndex: number;
  columnIndex: number;
  columnName: string;
}

export interface IDataEdited {
  rowIndex: number;
  infoSelection?: InfoSelection;
  data: any;
}

export interface IActionSelection {
  onSelectionChange?: any;
  onDoubleClick?: (
    value: any,
    rowIndex: number,
    columnIndex: number,
    columnName: string
  ) => void;
  clearSelection?: boolean;
  onSelectionCleaned?: (isSelectionCleaned: boolean) => any;
  onRegionsChange?:(regions:IRegion[])=>void

}

export interface ITextAlignColumn {
  columns: string | 'ALL';
  textAlign: string | 'center' | 'end' | 'left';
}

export interface IVConfigTextAlign {
  textAlign?: string | 'center' | 'end' | 'left';
}
