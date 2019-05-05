import { IRegion } from '@blueprintjs/table';
import { ICell } from './ActionCellsMenuItem';
import { fill } from 'lodash';

/**
 * Return the first cell (top, left) and the last cell (bottom,right) of a given Region.
 * */
export const getStartAndEndCell = (region: IRegion) => {
  const startCell: ICell = {
    col: (region.cols && region.cols[0]) || 0,
    row: (region.rows && region.rows[0]) || 0
  };
  const endCell: ICell = {
    col: (region.cols && region.cols[1]) || 0,
    row: (region.rows && region.rows[1]) || 0
  };
  return { startCell, endCell };
};

export const getReservedWidthAndFixedCells = (columnWidths: any[]) => {
  let reservedWidth = 0;
  let fixedCellsTotal = 0;
  if (columnWidths && columnWidths.length > 0) {
    columnWidths.map(col => {
      reservedWidth += col || 0;
      if (col !== 0) {
        fixedCellsTotal++;
      }
    });
  }
  return { reservedWidth, fixedCellsTotal };
};

export const fillRemoveColumnsWidth = (
  columnWidths: any,
  columns: string[]
) => {
  if (columnWidths) {
    if (columns.length > columnWidths.length) {
      return columnWidths.concat(
        fill(Array(columns.length - columnWidths.length), 100)
      );
    }
    if (columns.length < columnWidths.length) {
      return columnWidths.splice(0, columns.length);
    }
  }

  return columnWidths;
};

export const dataKey = (rowIndex: number, columnIndex: number) => {
  return `${rowIndex}-${columnIndex}`;
};

export const getDefaultRowHeight = (typeHeightRow: any): number => {
  if (typeHeightRow) {
    switch (typeHeightRow) {
      case 'SHORT':
        return 35;
      case 'HALF':
        return 50;
      default:
        return 100;
    }
  }
  return 35;
};

