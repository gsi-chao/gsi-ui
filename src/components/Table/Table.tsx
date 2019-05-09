import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Cell,
  IMenuContext,
  IRegion,
  ITableProps,
  Table,
  Utils
} from '@blueprintjs/table';
import '@blueprintjs/table/lib/css/table.css';
import { IconName, Intent } from '@blueprintjs/core';
import TableColumn, { FilterByColumn, IVConfigHeader } from './TableColumn';
import { fromEvent } from 'rxjs';
import {
  ActionCellsMenuItem,
  DefaultActions,
  ICell,
  IVColumnsContextual,
  IVContextualTableProps
} from './ActionCellsMenuItem';
import ReactResizeDetector from 'react-resize-detector';
import { cloneDeep } from 'lodash';

import { CellDiv, ISelectionStyle, TableContainer } from './style';
import Widget, { IVWidgetTableProps, IWidget } from './Widget/Widget';
import * as utils from './utils';
import EditToolBar from './EditToolBar/EditToolBar';
import { MaybeElement } from '@blueprintjs/core/src/common/props';
import {
  CellSelectionType,
  DefaultheightRow,
  EditColumns,
  EditSetup,
  IActionSelection,
  IDataEdited,
  ITextAlignColumn
} from './type';
import { IItemMultiple } from '../Form/Inputs/SelectMultipleField';
import EmptyData from './components/EmptyData';

export type IVTableOrder = 'ASC' | 'DESC' | 'NONE';

export interface IVActionsTableProps {
  columns: string[] | EditColumns;
}

export interface IVActionEditTableProps extends IVActionsTableProps {
  validation?: { [key: string]: (value: string) => boolean };
}

export interface IVCustomActionSortableTableProp {
  name: string;
  text: string;
  icon: IconName;
  callback: (value: any) => void;
}

export interface ISortResult {
  columnIndex: number;
  columnName: string;
  order: IVTableOrder;
}

export interface IVActionSortableTableProps extends IVActionsTableProps {
  custom_render_menu?: { [key: string]: IVCustomActionSortableTableProp };
  onSort?: (sortResult: ISortResult) => void;
  setupsOrden?: ISortResult[];
}

export interface ISetupEditToolbar {
  textSave?: string;
  textCancel?: string;
  iconSave?: IconName | MaybeElement;
  iconCancel?: IconName | MaybeElement;
  iconEdit?: IconName | MaybeElement;
}

export interface ISettingEmptyData {
  textSize?: number;
  iconSize?: number;
  color?: string;
  backgroundColor?: string;
  height?: string;
  text?: string;
  icon?: IconName | MaybeElement;
  customerIcon?: any;
}

export interface IVTableProps {
  edit?: EditSetup;
  widgetsCell?: IVWidgetTableProps[];
  search?: IVActionsTableProps;
  sortable?: IVActionSortableTableProps;
  contextual?: IVContextualTableProps;
  columns: string[];
  columns_name?: { [key: string]: string };
  data: any;
  reordering?: boolean;
  defaultColumnWidth?: number;
  enableColumnResizing?: boolean;
  enableRowResizing?: boolean;
  enableRowHeader?: boolean;
  className?: string;
  typeHeightRow?: DefaultheightRow;
  configColumnsHeader?: IVConfigHeader[] | IVConfigHeader;
  toolbar?: React.ReactNode;
  footer?: React.ReactNode;
  cellSelectionType?: CellSelectionType;
  onSelectionChange?: any;
  actionsSelection?: IActionSelection;
  tableHeight?: string;
  striped?: boolean;
  textAlignColumn?: ITextAlignColumn[] | ITextAlignColumn;
  selectionStyle?: ISelectionStyle;
  onOrderColumns?: (columns: string[]) => void;
  settingEmptyData?: ISettingEmptyData;
  filterByColumn?: FilterByColumn;
}

interface IProps extends IVTableProps, ITableProps {}

export interface IVTableState {
  sparseCellData: any[];
  sparseCellInvalid?: { [key: string]: Intent };
  sparseCellUpdateData?: { [key: string]: string };
  widgetsCell?: IVWidgetTableProps[];
  cachedData: any[];
  selectedRegions: IRegion[];
  provisionalRegions: IRegion[];
  columnsWidth: any[];
  edit: boolean;
  dataBeforeEdit: any[];
  dateEdited: IDataEdited[];
  invalidCells: { row: number; column: number }[];
}

export const VTable = (props: IProps) => {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerKeyDown = fromEvent(window, 'keydown').subscribe(event => {
      handleCtrlCAndV(event);
    });
    return () => {
      observerKeyDown.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setStateTable({
      ...stateTable,
      ...{ sparseCellData: cloneDeep(props.data) }
    });
  }, [props.data]);

  const initColumnsWidth = useMemo(() => {
    const { columns, columnWidths } = props;
    const colsWidth = cloneDeep(columnWidths) || [];
    while (colsWidth.length < columns.length) {
      colsWidth.push(0);
    }
    return colsWidth;
  }, [props.columnWidths, props.columns]);

  const [stateTable, setStateTable] = useState<IVTableState>({
    sparseCellData: cloneDeep(props.data),
    sparseCellInvalid: {},
    sparseCellUpdateData: {},
    widgetsCell: cloneDeep(props.widgetsCell),
    cachedData: [],
    selectedRegions: [],
    provisionalRegions: [],
    columnsWidth: initColumnsWidth,
    edit: false,
    dataBeforeEdit: [],
    dateEdited: [],
    invalidCells: []
  });

  const onColWidthChanged = (index: number, size: number) => {
    setColumnsWidth(makeResponsiveTable({ index, size }));
  };

  const makeResponsiveTable = (columnsResized?: {
    index: number;
    size: number;
  }) => {
    const rowNumber = props.enableRowHeader ? 30 : 0;
    let tableWidth = window.innerWidth;
    if (tableRef.current) {
      tableWidth = tableRef.current.clientWidth;
    }

    const { columns } = props;
    const columnWidths = stateTable.columnsWidth.splice(0, columns.length - 1);
    const {
      fixedCellsTotal,
      reservedWidth
    } = utils.getReservedWidthAndFixedCells(columnWidths || []);
    let sizePerColumn = 100;
    if (columns.length > 0 && columns.length > fixedCellsTotal) {
      const w =
        (tableWidth - reservedWidth - rowNumber) /
        (columns.length - fixedCellsTotal);
      if (w >= 80) {
        sizePerColumn = w;
      }
    }

    const colw: number[] = [];
    if (columns && columns.length > 0) {
      columns.forEach((el, index) => {
        if (columnWidths && index <= columnWidths.length - 1) {
          colw.push(columnWidths[index] || sizePerColumn);
        } else {
          colw.push(sizePerColumn);
        }
      });
    }
    if (columnsResized && colw.length - 1 >= columnsResized.index) {
      colw[columnsResized.index] = columnsResized.size;
    }
    return colw;
  };

  const setStateData = (
    rowIndex: number,
    columnIndex: number,
    value: string
  ) => {
    const data = stateTable.sparseCellData;
    if (data.length > rowIndex && rowIndex >= 0) {
      data[rowIndex][props.columns[columnIndex]] = value;

      setStateTable({
        ...stateTable,
        ...{
          sparseCellData: data
        }
      });
    }
  };

  const onEdit = () => {
    setStateTable({
      ...stateTable,
      ...{
        edit: true,
        dataBeforeEdit: cloneDeep(stateTable.sparseCellData)
      }
    });
  };

  const cancelEdit = () => {
    setStateTable({
      ...stateTable,
      ...{
        edit: false,
        sparseCellData: stateTable.dataBeforeEdit,
        cachedData: [],
        invalidCells: []
      }
    });
  };

  const saveEdit = () => {
    if (stateTable.invalidCells.length === 0) {
      props.edit!.onSave(stateTable.dateEdited);
      setStateTable({
        ...stateTable,
        ...{
          edit: false,
          dateEdited: [],
          dataBeforeEdit: []
        }
      });
    } else {
      const columnsInvalid = getInvalidColumns();

      if (props.edit && props.edit.invalidDataMessage) {
        props.edit.invalidDataMessage(columnsInvalid);
      }
    }
  };

  const getCellSelectionRegions = (argsRegions: IRegion[]) => {
    let regions: IRegion[] = getFreeSelectionRegions(argsRegions);
    if (regions[0] && regions[0].cols && regions[0].rows) {
      const row = regions[0].rows[1];
      const column = regions[0].cols[1];
      regions = [
        {
          cols: [column, column],
          rows: [row, row]
        }
      ];
      if (props.actionsSelection && props.actionsSelection.onSelectionChange) {
        if (
          regions &&
          regions.length > 0 &&
          regions[0].rows &&
          regions[0].rows.length > 0
        ) {
          const data = stateTable.sparseCellData;
          const value = data[row][props.columns[column]];
          props.actionsSelection.onSelectionChange({
            value,
            row,
            column
          });
        }
      }
    }
    return regions;
  };

  const getElementData = (rowIndex: number): any => {
    const data = stateTable.sparseCellData;
    if (data && data.length > rowIndex) {
      return data[rowIndex];
    }
    return undefined;
  };

  const getFreeSelectionRegions = (argsRegions: IRegion[]): IRegion[] => {
    return createSelectedRegions(
      validateMissingRegion,
      getRegionsWithMissingRowsOrCols,
      ifAlreadySelectedThenDeselect,
      deleteRegionRemain
    )(argsRegions);
  };

  const getEntireRowsRegions = (argsRegions: IRegion[]): IRegion[] => {
    const pivotRegion: IRegion = argsRegions[argsRegions.length - 1];
    const { numCols } = getRowAndColsTotals();
    const { rows } = pivotRegion;
    if (rows && Number.isFinite(rows[1])) {
      return [
        {
          cols: [0, numCols - 1],
          rows: [rows[1], rows[1]]
        }
      ];
    }
    return [];
  };

  /**
   ** @param fns: Array of functions
   ** @description realize a several functions to a passed region array and return the value of the processed regions.
   **/
  const createSelectedRegions = (...fns: any[]) => (
    regions: IRegion[]
  ): IRegion[] => fns.reduce((v, f) => f(v), regions);

  /**
   ** @param argsRegions: the regions of the table context
   ** @description check if a region is missing in the current selection and is an error add the region to the selection.
   ** @return the fixed regions.
   **/
  const validateMissingRegion = (argsRegions: IRegion[]) => {
    const regions = cloneDeep(argsRegions);
    if (regions && regions.length > 1) {
      const lastRegion = regions[regions.length - 1];
      const { selectedRegions } = stateTable;
      selectedRegions.map(region => {
        if (
          (!regionExistence(region, regions) && !isSingleCell(region)) ||
          (!regionExistence(region, regions) &&
            isSingleCell(region) &&
            isContainedRegion(region, lastRegion))
        ) {
          regions.splice(regions.length - 1, 1, region, lastRegion);
        }
      });
    }
    return regions;
  };

  /**
   ** @param argsRegions: the regions of the table context
   ** @description check if a region don'onEdit have rows or cols , this happens when a full column or row is selected
   ** and add the missing param.
   ** @return the fixed regions.
   **/
  const getRegionsWithMissingRowsOrCols = (
    argsRegions: IRegion[]
  ): IRegion[] => {
    const regions = cloneDeep(argsRegions);
    const { numRows, numCols } = getRowAndColsTotals();

    if (regions.length > 0 && regions[regions.length - 1].rows === undefined) {
      regions[regions.length - 1]['rows'] = [0, numRows - 1];
    }
    if (regions.length > 0 && regions[regions.length - 1].cols === undefined) {
      regions[regions.length - 1]['cols'] = [0, numCols - 1];
    }
    return regions;
  };

  /**
   ** @param argsRegions: the regions of the table context
   ** @description check if a the last region is a single cell and if is selected deselect the region
   ** if this region is contained inside other bigger region split the bigger one in several regions.
   ** @return the regions with the actions applied.
   **/
  const ifAlreadySelectedThenDeselect = (argsRegions: IRegion[]): IRegion[] => {
    let regions: IRegion[] = cloneDeep(argsRegions);
    const lastRegion = regions[regions.length - 1];
    if (
      lastRegion &&
      lastRegion.cols &&
      lastRegion.rows &&
      isSingleCell(lastRegion)
    ) {
      const checkRegion: ICell = {
        col: lastRegion.cols[0],
        row: lastRegion.rows[0]
      };
      let alreadySplitted = false;
      let singleCellFounded = false;
      regions.map((region, index) => {
        if (
          index < regions.length - 1 &&
          isContainedRegion(region, lastRegion) &&
          isSingleCell(region)
        ) {
          regions.splice(index, 1);
          singleCellFounded = true;
        }
      });
      if (!singleCellFounded) {
        regions.map((region, index) => {
          if (
            !alreadySplitted &&
            isContainedRegion(region, lastRegion, index, regions.length - 1)
          ) {
            const splittedRegion = splitRegion(region, checkRegion);
            regions.splice(index, 1);
            const newRegions = regions.filter(
              innerRegion =>
                (innerRegion.rows &&
                  (innerRegion.rows[0] !== checkRegion.row ||
                    innerRegion.rows[1] !== checkRegion.row)) ||
                (innerRegion.cols &&
                  (innerRegion.cols[0] !== checkRegion.col ||
                    innerRegion.cols[1] !== checkRegion.col))
            );
            regions = [...newRegions, ...splittedRegion];
            alreadySplitted = true;
          }
        });
      }
    } else {
      if (
        regions.length > 2 &&
        isContainedRegion(lastRegion, regions[regions.length - 2])
      ) {
        regions.splice(regions.length - 2, 1);
      } else if (
        regions.length > 2 &&
        isContainedRegion(regions[regions.length - 2], lastRegion)
      ) {
        regions.splice(regions.length - 2, 1);
      }
    }
    return regions;
  };

  /**
   ** @param argsRegions: the regions of the table context
   ** @description check if the last region has some remain when resizing it , a remain appear when go from a 2 cells
   ** region to a one cell region, if some remain is founded it will be deleted.
   ** @return the regions with the actions applied.
   **/
  const deleteRegionRemain = (argsRegions: IRegion[]): IRegion[] => {
    const regions = cloneDeep(argsRegions);
    const lastRegion = regions[regions.length - 1];
    if (isSingleCell(lastRegion)) {
      const { selectedRegions } = stateTable;
      if (selectedRegions.length > 0) {
        const lastRegionInState: IRegion =
          selectedRegions[selectedRegions.length - 1];
        if (lastRegionInState.cols && lastRegionInState.rows) {
          if (
            ((lastRegionInState.cols[1] - lastRegionInState.cols[0] === 1 &&
              lastRegionInState.rows[1] - lastRegionInState.rows[0] === 0) ||
              (lastRegionInState.rows[1] - lastRegionInState.rows[0] === 1 &&
                lastRegionInState.cols[1] - lastRegionInState.cols[0] === 0)) &&
            isContainedRegion(lastRegionInState, lastRegion)
          ) {
            regions.splice(regions.length - 1, 1);
          }
        }
      }
    }
    return regions;
  };

  /**
   ** @param containerRegion: the region that may contain the other region
   ** @param checkRegion: the possible contained region.
   ** @param from: a value to avoid compare a region with it self in an array default 0.
   ** @param to: a value to avoid compare a region with it self in an array default 1.
   ** @return the if the checkRegion is contained by the containerRegion.
   **/
  const isContainedRegion = (
    containerRegion: IRegion,
    checkRegion: IRegion,
    from: number = 0,
    to: number = 1
  ): boolean => {
    if (from < to) {
      if (
        containerRegion.rows &&
        checkRegion.rows &&
        containerRegion.cols &&
        checkRegion.cols
      ) {
        if (
          containerRegion.rows[0] <= checkRegion.rows[0] &&
          containerRegion.rows[1] >= checkRegion.rows[1] &&
          (containerRegion.cols[0] <= checkRegion.cols[0] &&
            containerRegion.cols[1] >= checkRegion.cols[1])
        ) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   ** @param argsRegion: the region to split
   ** @param cellToDeselect: the cell to split the region.
   ** @return an array of regions split by the cellToDeselect first selected by columns and then by rows.
   **/
  const splitRegion = (
    argsRegion: IRegion,
    cellToDeselect: ICell
  ): IRegion[] => {
    const region = cloneDeep(argsRegion);
    const { endCell, startCell } = utils.getStartAndEndCell(region);
    const splittedRegion = [];
    for (let col = startCell.col; col <= endCell.col; col++) {
      if (col !== cellToDeselect.col) {
        const newRegion: IRegion = {
          rows: [startCell.row, endCell.row],
          cols: [col, col]
        };
        splittedRegion.push(newRegion);
      } else {
        if (startCell.row < cellToDeselect.row) {
          const aboveRegion: IRegion = {
            rows: [startCell.row, cellToDeselect.row - 1],
            cols: [col, col]
          };
          splittedRegion.push(aboveRegion);
        }
        if (endCell.row > cellToDeselect.row) {
          const bellowRegion: IRegion = {
            rows: [cellToDeselect.row + 1, endCell.row],
            cols: [col, col]
          };
          splittedRegion.push(bellowRegion);
        }
      }
    }
    return splittedRegion;
  };

  /**
   ** @param region: the region
   ** @param regions: the regions to realize the check.
   ** @return if exist a region with that exacts rows and cols.
   **/
  const regionExistence = (region: IRegion, regions: IRegion[]): boolean => {
    return regions.some(
      innerRegion =>
        !!(
          innerRegion.cols &&
          region.cols &&
          (innerRegion.cols[0] === region.cols[0] &&
            innerRegion.cols[1] === region.cols[1]) &&
          innerRegion.rows &&
          region.rows &&
          (innerRegion.rows[0] === region.rows[0] &&
            innerRegion.rows[1] === region.rows[1])
        )
    );
  };

  /**
   ** @param region: the region
   ** @return if exist a region is a single cell.
   **/
  const isSingleCell = (region: IRegion): boolean => {
    return !!(
      region &&
      region.rows &&
      region.rows[0] === region.rows[1] &&
      region.cols &&
      region.cols[0] === region.cols[1]
    );
  };

  /**
   ** @param selectedRegions: the region
   ** @return set the selected regions in the state.
   **/
  const setSelectedRegions = (selectedRegions: IRegion[]) => {
    setStateTable({ ...stateTable, selectedRegions });
  };

  /**
   ** @return set the total of cols and rows of the table
   **/
  const getRowAndColsTotals = (): any => {
    const numRows = stateTable.sparseCellData.length || 0;
    const numCols = (props.columns && props.columns.length) || 0;
    return { numRows, numCols };
  };

  /**
   ** End select regions Table Fixture
   **/

  const cellValidator = (rowIndex: number, columnIndex: number) => {
    const dataKey = utils.dataKey(rowIndex, columnIndex);
    return (value: string) => {
      if (!isValidValue(columnIndex, value)) {
        setSparseCellInvalid(dataKey, Intent.DANGER);
      } else {
        clearSparseCellInvalid(dataKey);
      }
      setSparseCellUpdateData(dataKey, value);
      setStateData(rowIndex, columnIndex, value);
    };
  };

  const cellSetter = (rowIndex: number, columnIndex: number) => {
    const dataKey = utils.dataKey(rowIndex, columnIndex);
    return (value: string) => {
      if (!isValidValue(columnIndex, value)) {
        setSparseCellInvalid(dataKey, Intent.DANGER);
      } else {
        clearSparseCellInvalid(dataKey);
      }
      setSparseCellUpdateData(dataKey, value);
      setStateData(rowIndex, columnIndex, value);
    };
  };

  const setSparseCellInvalid = (dataKey: string, value: any) => {
    setStateTable({
      ...stateTable,
      ...{
        sparseCellInvalid: {
          ...stateTable.sparseCellInvalid,
          ...{ [dataKey]: value }
        }
      }
    });
  };

  const setSparseCellUpdateData = (dataKey: string, value: any) => {
    setStateTable({
      ...stateTable,
      ...{
        sparseCellUpdateData: {
          ...stateTable.sparseCellUpdateData,
          ...{ [dataKey]: value }
        }
      }
    });
  };

  const clearSparseCellInvalid = (dataKey: string) => {
    if (stateTable.sparseCellInvalid![dataKey]) {
      const state = stateTable;
      delete state.sparseCellInvalid![dataKey];
      setStateTable(state);
    }
  };

  const setCachedData = (cachedData: any[]) => {
    setStateTable({ ...stateTable, cachedData });
  };

  const hasCachedData = () => {
    return !!stateTable.cachedData && stateTable.cachedData.length > 0;
  };

  const cachedData = () => {
    return stateTable.cachedData;
  };

  const getContextualMenuByColumn = (
    canCopy: boolean,
    regionSelected: IRegion
  ) => {
    let columnContextual: IVColumnsContextual | undefined = undefined;
    if (canCopy) {
      const { columns } = props;
      const columnName = columns[regionSelected!.cols![0]];

      if (props.contextual && props.contextual.columnsContextual) {
        const haveConfigAll = props.contextual.columnsContextual.some(
          x => x.columns === 'ALL'
        );
        if (haveConfigAll && props.contextual.columnsContextual.length === 1) {
          columnContextual = props.contextual.columnsContextual.find(
            x => x.columns === 'ALL'
          );
        } else {
          columnContextual = props.contextual.columnsContextual.find(
            x => x.columns !== 'ALL' && x.columns.some(y => y === columnName)
          );

          if (columnContextual === undefined) {
            columnContextual = props.contextual.columnsContextual.find(
              x => x.columns === 'ALL'
            );
          }
        }
      }
    }
    return columnContextual!;
  };

  const renderBodyContextMenu = (context: IMenuContext) => {
    let canCopy = true;
    const target = context && context.getTarget();
    if (target && target.cols && target.cols.length > 0) {
      canCopy = canCellExecuteAction(target.cols[0]);
    }

    const columnContextual = getContextualMenuByColumn(canCopy, target);

    return props.contextual && canCopy ? (
      <ActionCellsMenuItem
        modeEdit={stateTable.edit}
        context={context}
        getCellData={getCellData}
        contextOptions={columnContextual}
        onDefaultActions={onDefaultActions}
        hasCachedData={hasCachedData}
        tableColsAndRowsTotals={getRowAndColsTotals}
        getDataToCopy={getDataToCopy}
        getPivotCell={getPivotCell}
      />
    ) : (
      <div />
    );
  };

  const getCellData = (rowIndex: number, columnIndex: number) => {
    const data = stateTable.sparseCellData[rowIndex];
    return data[props.columns[columnIndex]];
  };

  const onDefaultActions = (action: DefaultActions, value: any) => {
    switch (action) {
      case 'copy':
        setCachedData(value);
        break;
      case 'paste':
        handlePaste(value);
        break;
      case 'export':
        console.log(value);
        break;
    }
  };

  /**
   ** Copy and paste Table Fixture
   **/

  /**
   ** @param context: The table context
   *  @return the result of the getRegionsData function applied to the regions of the context
   **/
  const getDataToCopy = (context: IMenuContext) => {
    const regions = context.getRegions();
    return getRegionsData(regions);
  };

  /**
   ** @param regions: the selected regions of the table context
   *  @return an array of cells with the distance of rows and columns of the regions first pivot and the value of the cell
   **/
  const getRegionsData = (regions: IRegion[]) => {
    const firstPivotCell = getPivotCell(regions);
    const cellsArray: any[] = [];
    regions.map(region => {
      const { startCell, endCell } = utils.getStartAndEndCell(region);
      let rowFromPivot = startCell.row - firstPivotCell.row;
      let colFromPivot = startCell.col - firstPivotCell.col;
      for (let index = startCell.col; index <= endCell.col; index++) {
        for (let indexY = startCell.row; indexY <= endCell.row; indexY++) {
          const value = getCellData(indexY, index);
          if (canCellExecuteAction(index, 'copy')) {
            cellsArray.push(
              createCellForCopy(colFromPivot, rowFromPivot, value)
            );
          }
          rowFromPivot++;
        }
        rowFromPivot = startCell.row - firstPivotCell.row;
        colFromPivot++;
      }
    });
    return cellsArray;
  };

  /**
   ** @param regions: The table context regions
   *  @return the pivot cell of all regions which is the first row of the first column (left, top)
   **/
  const getPivotCell = (regions: IRegion[]): ICell => {
    const { numRows, numCols } = getRowAndColsTotals();
    let firstPivotCell: ICell = {
      col: numRows - 1,
      row: numCols - 1
    };
    regions.map(region => {
      if (region && region.cols && region.rows) {
        if (region.cols[0] < firstPivotCell.col) {
          firstPivotCell = {
            col: region.cols[0],
            row: region.rows[0]
          };
        } else if (region.cols[0] === firstPivotCell.col) {
          if (region.rows[0] < firstPivotCell.row) {
            firstPivotCell = {
              col: region.cols[0],
              row: region.rows[0]
            };
          }
        }
      }
    });
    return firstPivotCell;
  };

  /**
   ** @param colFromPivot: distance of the cell with the regions pivot cell column
   *  @param rowFromPivot: distance of the cell with the regions pivot cell row
   *  @param value: the value of the current cell
   *  @return an object with colFromPivot, rowFromPivot and value
   **/
  const createCellForCopy = (
    colFromPivot: number,
    rowFromPivot: number,
    value: any
  ) => {
    return {
      colFromPivot,
      rowFromPivot,
      value
    };
  };

  /**
   ** @param pivotCell: the pivot cell to make the paste action
   *  @description obtain the cached data to copy and set the value of the data of the table for each of the cached cells
   **/
  const handlePaste = (pivotCell: ICell): void => {
    const cache = cachedData();
    if (cache) {
      cache.map((cellData: any) => {
        const { value, colFromPivot, rowFromPivot } = cellData;
        const col = colFromPivot + pivotCell.col;
        const row = rowFromPivot + pivotCell.row;
        if (canCellExecuteAction(col, 'paste')) {
          const dataKey = utils.dataKey(row, col);
          setSparseCellUpdateData(dataKey, value);
          setStateData(row, col, value);
          setDataEdited(row, col, value);
        }
      });
    }
  };

  const canCellExecuteAction = (
    columnIndex: number,
    action?: DefaultActions
  ) => {
    const { columns } = props;
    if (columnIndex < columns.length) {
      const columnName = columns[columnIndex];
      if (props.contextual && props.contextual.columnsContextual) {
        const { columnsContextual } = props.contextual;
        let hasColumn = false;
        const haveConfigAll = columnsContextual.some(
          col => col.columns === 'ALL'
        );
        if (haveConfigAll && columnsContextual.length === 1) {
          hasColumn = true;
        } else {
          hasColumn = columnsContextual.some(
            col =>
              col.columns !== 'ALL' && col.columns.some(x => x === columnName)
          );

          if (hasColumn === false && haveConfigAll) {
            hasColumn = true;
          }
        }

        const hasAction = columnsContextual.some(
          col =>
            col.default_actions !== undefined &&
            col.default_actions.some(defaultAction => defaultAction === action)
        );
        return (hasAction && hasColumn) || (!action && hasColumn);
      }
    }
    return false;
  };

  /**
   *  @description capture the key actions of CTRL + C and CTRL + V and execute the appropriate function.
   **/
  const handleCtrlCAndV = (event: any) => {
    const charCode = String.fromCharCode(event.which).toLowerCase();
    if (event.ctrlKey || event.metaKey) {
      if (event.ctrlKey && charCode === 'c') {
        if (
          stateTable.selectedRegions &&
          stateTable.selectedRegions.length > 0
        ) {
          const cellsToCopy = getRegionsData(stateTable.selectedRegions);
          setCachedData(cellsToCopy);
        }
      } else if (event.ctrlKey && charCode === 'v') {
        if (
          stateTable.selectedRegions &&
          stateTable.selectedRegions.length > 0
        ) {
          const pivotCell = getPivotCell(stateTable.selectedRegions);
          handlePaste(pivotCell);
        }
      }
    }
  };

  /**
   ** End copy and paste Table Fixture
   **/

  const handleColumnsReordered = (
    oldIndex: number,
    newIndex: number,
    length: number
  ) => {
    if (oldIndex === newIndex) {
      return;
    }
    const nextChildren = Utils.reorderArray(
      props.columns,
      oldIndex,
      newIndex,
      length
    );
    if (props.onOrderColumns) {
      props.onOrderColumns(nextChildren);
    }
  };

  const getInvalidColumns = () => {
    const columnsInvalid: string[] = [];

    stateTable.invalidCells.forEach(invalidCell => {
      const nameColumn = getInvalidColumnName(invalidCell);

      if (columnsInvalid.filter(x => x === nameColumn).length === 0) {
        columnsInvalid.push(nameColumn);
      }
    });
    return columnsInvalid;
  };

  const getInvalidColumnName = (invalidCell: { column: number }) => {
    let nameColumn = props.columns[invalidCell.column];
    if (props.columns_name) {
      Object.keys(props.columns_name).map(key => {
        if (key === nameColumn) {
          nameColumn = props.columns_name![key];
        }
      });
    }
    return nameColumn;
  };

  const getSelectedRegion = () => {
    if (props.actionsSelection && props.actionsSelection.clearSelection) {
      return [];
    }
    return stateTable.selectedRegions;
  };

  const checkAndSetSelection = (argsRegions: IRegion[]) => {
    const { cellSelectionType } = props;

    if (cellSelectionType === 'DISABLED') {
      return;
    }

    if (props.actionsSelection && props.actionsSelection.clearSelection) {
      cleanSelection();
      return;
    }

    if (argsRegions && argsRegions.length === 0) {
      cleanSelection();
      return;
    }

    let regions: IRegion[] = [];
    if (
      cellSelectionType === 'ENTIRE_ROW' &&
      argsRegions &&
      argsRegions.length > 0
    ) {
      regions = getEntireRowsRegions(argsRegions);
      if (props.actionsSelection && props.actionsSelection.onSelectionChange) {
        if (
          regions &&
          regions.length > 0 &&
          regions[0].rows &&
          regions[0].rows.length > 0
        ) {
          const data = getElementData(regions[0].rows[0]);
          props.actionsSelection.onSelectionChange(data);
        }
      }
    } else if (!cellSelectionType || cellSelectionType === 'FREE') {
      regions = getFreeSelectionRegions(argsRegions);
    } else if (!cellSelectionType || cellSelectionType === 'CELL') {
      regions = getCellSelectionRegions(argsRegions);
    }

    setSelectedRegions(regions);
  };

  const cleanSelection = () => {
    setSelectedRegions([]);
    if (props.actionsSelection && props.actionsSelection.onSelectionCleaned) {
      props.actionsSelection.onSelectionCleaned(true);
    }
  };

  const onDoubleClick = (value: any, rowIndex: number, columnIndex: number) => {
    if (props.actionsSelection && props.actionsSelection.onDoubleClick) {
      const columnName = props.columns[columnIndex];
      if (props.cellSelectionType === 'ENTIRE_ROW') {
        props.actionsSelection.onDoubleClick(
          stateTable.sparseCellData[rowIndex],
          rowIndex,
          columnIndex,
          columnName
        );
        return;
      }
      props.actionsSelection.onDoubleClick(
        value,
        rowIndex,
        columnIndex,
        columnName
      );
    }
  };

  const setColumnsWidth = (columnsWidth: any[]) => {
    setStateTable({ ...stateTable, columnsWidth });
  };

  const isValid = (columnIndex: number, value: string) => {
    let isValid = true;
    if (props.edit && stateTable.edit) {
      isValid = isValidValue(columnIndex, value);
    }
    return isValid;
  };

  const getTextAlignColumn = (columnIndex: number): ITextAlignColumn => {
    let textAlignColumnConfig: ITextAlignColumn | undefined = {
      columns: 'ALL',
      textAlign: 'center'
    };

    if (Array.isArray(props.textAlignColumn)) {
      const restTextAlignColumnConfig = props.textAlignColumn.find(
        x => x.columns === 'ALL'
      );
      const textAlignColumn = props.textAlignColumn.find(
        x => x.columns === props.columns[columnIndex]
      );

      if (textAlignColumn) {
        textAlignColumnConfig = textAlignColumn;
      } else if (restTextAlignColumnConfig) {
        textAlignColumnConfig = restTextAlignColumnConfig;
      }
    } else {
      if (props.textAlignColumn) {
        textAlignColumnConfig = props.textAlignColumn;
      }
    }
    return textAlignColumnConfig;
  };

  const updateInvalidColumns = (
    isValid: boolean,
    columnIndex: number,
    rowIndex: number
  ) => {
    const invalidCells = stateTable.invalidCells;

    const exitsInvalidCells = invalidCells.find(
      x => x.row === rowIndex && x.column === columnIndex
    );

    if (!isValid && exitsInvalidCells === undefined) {
      invalidCells.push({ column: columnIndex, row: rowIndex });
    } else if (isValid && exitsInvalidCells) {
      const index = invalidCells.indexOf(exitsInvalidCells, 0);
      if (index > -1) {
        invalidCells.splice(index, 1);
      }
    }
  };

  const getWidgetCellValid = (): IVWidgetTableProps[] => {
    const { columns } = props;
    const widgetsValid: IVWidgetTableProps[] = [];

    stateTable.widgetsCell &&
      stateTable.widgetsCell.forEach((widget: IVWidgetTableProps) => {
        if (widget.column) {
          if (columns.filter(x => x === widget.column).length === 1) {
            widgetsValid.push(widget);
          }
        } else if (
          widget.column === undefined &&
          widget.row &&
          widget.row <= stateTable.sparseCellData.length
        ) {
          widgetsValid.push(widget);
        }
      });

    return widgetsValid;
  };

  const getWidgetCell = (rowIndex: number, columnName: string) => {
    const widgetCellValid =
      stateTable.widgetsCell &&
      stateTable.widgetsCell.length > 0 &&
      getWidgetCellValid();

    if (widgetCellValid) {
      const widgetRowCol = widgetCellValid.find(
        x => x.column === columnName && x.row === rowIndex
      );
      const widgetRows = widgetCellValid.find(
        x => x.column === undefined && x.row === rowIndex
      );
      const widgetCol = widgetCellValid.find(x => x.column === columnName);

      if (widgetRowCol) {
        return widgetRowCol;
      }

      if (widgetCol) {
        return widgetCol;
      }

      return widgetRows;
    }
  };

  const handleOnClickWidget = (
    rowIndex: number,
    columnIndex: number,
    newValue: string
  ) => {
    const dataKey = utils.dataKey(rowIndex, columnIndex);
    setSparseCellUpdateData(dataKey, newValue);
    setStateData(rowIndex, columnIndex, newValue);
    setDataEdited(rowIndex, columnIndex, newValue);
  };

  const getInfoSelection = (rowIndex: number, columnIndex: number) => {
    return {
      rowIndex,
      columnIndex: columnIndex!,
      columnName: props.columns[columnIndex!]
    };
  };

  const setRowDataEdited = (rowIndex: number, columnIndex: number) => {
    const dataEdited = stateTable.dateEdited;
    const rowEdited = dataEdited.find(x => x.rowIndex === rowIndex);
    if (rowEdited) {
      rowEdited.data = stateTable.sparseCellData[rowIndex];
    } else {
      dataEdited.push({
        rowIndex,
        infoSelection: getInfoSelection(rowIndex, columnIndex),
        data: stateTable.sparseCellData[rowIndex]
      });
    }
  };

  const setRowColDataEdited = (
    rowIndex: number,
    columnIndex: number,
    newValue: string
  ) => {
    const dataEdited = stateTable.dateEdited;
    const rowColEdited = dataEdited.find(
      x =>
        x.infoSelection!.rowIndex === rowIndex &&
        x.infoSelection!.columnIndex === columnIndex
    );

    if (rowColEdited) {
      rowColEdited.data = { value: newValue };
    } else {
      dataEdited.push({
        rowIndex,
        infoSelection: getInfoSelection(rowIndex, columnIndex),
        data: { value: newValue }
      });
    }
    return;
  };

  const setDataEdited = (
    rowIndex: number,
    columnIndex: number,
    newValue: string
  ) => {
    if (props.edit && props.edit.resultDataEdited === 'CELL') {
      setRowColDataEdited(rowIndex, columnIndex, newValue);
      return;
    }
    setRowDataEdited(rowIndex, columnIndex);
  };

  const isValidValue = (columnIndex: number, value: string) => {
    if (
      props.edit &&
      props.edit.editColumn.validation &&
      props.edit.editColumn.validation[props.columns[columnIndex]]
    ) {
      return props.edit.editColumn.validation[props.columns[columnIndex]](
        value
      );
    }
    return true;
  };

  const getResizingProperties = () => {
    const enableRowResizing = props.enableRowResizing
      ? props.enableRowResizing
      : false;

    const enableRowHeader = enableRowResizing
      ? true
      : props.enableRowHeader
      ? props.enableRowHeader
      : false;

    const enableColumnResizing = props.enableColumnResizing
      ? props.enableRowResizing
      : false;

    return { enableRowHeader, enableColumnResizing, enableRowResizing };
  };

  const renderCell = (rowIndex: number, columnIndex: number) => {
    const { edit } = props;

    const columns = props.columns;
    const data = stateTable.sparseCellData;
    const value = data[rowIndex][columns[columnIndex]];
    const widgetCell = getWidgetCell(rowIndex, columns[columnIndex]);

    if (widgetCell) widgetCell.widget.value = value;
    const valid = isValid(columnIndex, value);
    updateInvalidColumns(valid, columnIndex, rowIndex);
    const textAlignColumn = getTextAlignColumn(columnIndex);

    if (widgetCell && widgetCell.column && widgetCell.row) {
      if (widgetCell.row === rowIndex) {
        return renderWidget(
          widgetCell.widget,
          valid,
          rowIndex,
          columnIndex,
          textAlignColumn.textAlign,
          value
        );
      }
    } else if (
      widgetCell &&
      widgetCell.column &&
      widgetCell.row === undefined
    ) {
      return renderWidget(
        widgetCell.widget,
        valid,
        rowIndex,
        columnIndex,
        textAlignColumn.textAlign,
        value
      );
    } else if (
      widgetCell &&
      widgetCell.column === undefined &&
      widgetCell.row
    ) {
      if (widgetCell.row === rowIndex) {
        return renderWidget(
          widgetCell.widget,
          valid,
          rowIndex,
          columnIndex,
          textAlignColumn.textAlign,
          value
        );
      }
    }

    if (edit && edit.editColumn.columns === 'ALL') {
      return (
        <CellDiv isValid={valid} as={Cell}>
          {' '}
          <Widget
            row={rowIndex}
            column={columnIndex}
            onClick={handleOnClickWidget}
            type={'EDIT'}
            value={value}
            disable={!stateTable.edit}
            isValid={valid}
            textAlign={textAlignColumn.textAlign}
            columns={props.columns}
            onDoubleClick={() => {
              onDoubleClick(value, rowIndex, columnIndex);
            }}
          />
        </CellDiv>
      );
    }

    return edit &&
      edit.editColumn.columns !== 'ALL' &&
      edit.editColumn.columns.some(
        (x: string) => x === columns[columnIndex]
      ) ? (
      <CellDiv isValid={valid} as={Cell}>
        {' '}
        <Widget
          row={rowIndex}
          column={columnIndex}
          onClick={handleOnClickWidget}
          type={'EDIT'}
          value={value}
          disable={!stateTable.edit}
          isValid={valid}
          textAlign={textAlignColumn.textAlign}
          columns={props.columns}
          onDoubleClick={() => {
            onDoubleClick(value, rowIndex, columnIndex);
          }}
        />
      </CellDiv>
    ) : (
      <CellDiv isValid={valid} as={Cell}>
        <Widget
          row={rowIndex}
          column={columnIndex}
          onClick={() => {}}
          type={'DEFAULT'}
          value={value}
          disable={stateTable.edit}
          isValid={valid}
          textAlign={textAlignColumn.textAlign}
          columns={props.columns}
          onDoubleClick={() => {
            onDoubleClick(value, rowIndex, columnIndex);
          }}
        />
      </CellDiv>
    );
  };

  const renderWidget = (
    widget: IWidget,
    isValid: boolean,
    rowIndex: number,
    columnIndex: number,
    textAlign: string | 'center' | 'end' | 'left',
    value: any
  ) => {
    return (
      <CellDiv isValid={isValid} as={Cell}>
        <Widget
          row={rowIndex}
          column={columnIndex}
          onClick={handleOnClickWidget}
          {...widget}
          disable={!stateTable.edit}
          isValid={isValid}
          textAlign={textAlign}
          columns={props.columns}
          onDoubleClick={() => {
            onDoubleClick(value, rowIndex, columnIndex);
          }}
        />
      </CellDiv>
    );
  };

  const columnsList = props.columns.map((name: string, index: number) => {
    const configColumnsHeader = props.configColumnsHeader
      ? props.configColumnsHeader
      : [];
    const options: IItemMultiple[] = [];
    if (
      props.filterByColumn &&
      props.filterByColumn.filterable &&
      props.filterByColumn.filterType === 'SELECT'
    ) {
      props.data.forEach((item: any) => {
        if (
          !options.some(element => element.value === item[props.columns[index]])
        ) {
          options.push({
            value: item[props.columns[index]],
            label: item[props.columns[index]]
          });
        }
      });
    }
    const col = new TableColumn(
      name,
      index,
      props.columns,
      configColumnsHeader,
      props.filterByColumn,
      props.columns_name,
      props.sortable,
      options
    );
    return col.getColumn(renderCell);
  });

  const resizingProperties = getResizingProperties();
  const colWidth =
    stateTable.columnsWidth.length === props.columns.length
      ? stateTable.columnsWidth
      : makeResponsiveTable();

  return props.data.length === 0 || props.columns.length === 0 ? (
    <EmptyData settings={props.settingEmptyData} />
  ) : (
    <ReactResizeDetector
      handleHeight
      handleWidth
      onResize={() => setColumnsWidth(makeResponsiveTable())}
    >
      <TableContainer
        isEdit={props.edit}
        ref={tableRef}
        tableHeight={props.tableHeight}
        striped={props.striped}
        selection={props.selectionStyle}
      >
        {props.toolbar && props.toolbar}

        {props.edit && (
          <EditToolBar
            edit={stateTable.edit}
            onSave={saveEdit}
            onCancel={cancelEdit}
            onEdit={onEdit}
            setupEditToolbar={props.edit && props.edit.editToolbar}
          />
        )}

        <Table
          className={props.className}
          numRows={stateTable.sparseCellData.length}
          onColumnsReordered={handleColumnsReordered}
          enableColumnReordering={props.reordering}
          onSelection={checkAndSetSelection}
          selectedRegions={getSelectedRegion()}
          defaultColumnWidth={props.defaultColumnWidth}
          enableColumnResizing={resizingProperties.enableColumnResizing}
          enableRowResizing={resizingProperties.enableRowResizing}
          enableRowHeader={resizingProperties.enableRowHeader}
          columnWidths={colWidth}
          defaultRowHeight={utils.getDefaultRowHeight(props.typeHeightRow)}
          numFrozenColumns={props.numFrozenColumns}
          numFrozenRows={props.numFrozenRows}
          bodyContextMenuRenderer={renderBodyContextMenu}
          onColumnWidthChanged={onColWidthChanged}
        >
          {columnsList}
        </Table>
        {props.footer && props.footer}
      </TableContainer>
    </ReactResizeDetector>
  );
};
