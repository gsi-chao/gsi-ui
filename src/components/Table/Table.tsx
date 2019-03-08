import React, { Component } from 'react';
import {
  Cell,
  IMenuContext,
  IRegion,
  ITableProps,
  Table,
  Utils
} from '@blueprintjs/table';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';
import { IconName, Intent } from '@blueprintjs/core';
import TableColumn, { IVConfigHeader } from './TableColumn';
import { fromEvent } from 'rxjs';
import {
  ActionCellsMenuItem,
  DefaultActions,
  ICell,
  IVContextualTableProps
} from './ActionCellsMenuItem';

import { CellCenterText, CellDiv } from './style';
import Widget, { IVWidgetTableProps } from './Widget/Widget';
import * as utils from './utils';
import EditToolBar from './EditToolBar/EditToolBar';
import { MaybeElement } from '@blueprintjs/core/src/common/props';
import {
  CellSelectionType,
  DefaultheightRow,
  EditColumns,
  EditSetup,
  IDataEdited
} from './type';


export type IVTableOrder = 'ASC' | 'DESC';

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

export interface IVActionSortableTableProps extends IVActionsTableProps {
  custom_render_menu?: { [key: string]: IVCustomActionSortableTableProp };
  onSort?: (columnIndex: number, order: IVTableOrder) => void;
}

export interface ISetupEditToolbar {
  textSave?: string;
  textCancel?: string;
  iconSave?: IconName | MaybeElement;
  iconCancel?: IconName | MaybeElement;
  iconEdit?: IconName | MaybeElement;
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
  configColumnsHeader?: IVConfigHeader[];
  toolbar?: React.ReactNode;
  footer?: React.ReactNode;
  cellSelectionType?: CellSelectionType;
  onSelectionChange?: any;
  editSetup?: EditSetup;
}

interface IProps extends IVTableProps, ITableProps {}

export interface IVTableState {
  sparseCellData: any[];
  sparseCellInvalid?: { [key: string]: Intent };
  sparseCellUpdateData?: { [key: string]: string };
  columns: string[];
  widgetsCell?: IVWidgetTableProps[];
  cachedData: any[];
  selectedRegions: IRegion[];
  provisionalRegions: IRegion[];
  columnsWidth: any[];
  edit: boolean;
  dataBeforeEdit: any[];
  dateEdited: IDataEdited[];
  invalidColumns: number[];
}

export class VTable extends Component<IProps, IVTableState> {
  tableRef: any;

  constructor(props: IProps) {
    super(props);
    this.tableRef = React.createRef();
  }

  public static dataKey = (rowIndex: number, columnIndex: number) => {
    return `${rowIndex}-${columnIndex}`;
  };

  public state: IVTableState = {
    sparseCellData: this.props.data,
    sparseCellInvalid: {},
    sparseCellUpdateData: {},
    columns: this.props.columns,
    widgetsCell: this.props.widgetsCell,
    cachedData: [],
    selectedRegions: [],
    provisionalRegions: [],
    columnsWidth: this.initColumnsWidth(),
    edit: false,
    dataBeforeEdit: [],
    dateEdited: [],
    invalidColumns: []
  };

  static getDerivedStateFromProps(props: IProps, state: IVTableState) {
    if (props.data !== state.sparseCellData) {
      return { ...state, ...{ sparseCellData: props.data } };
    }

    // No state update necessary
    return null;
  }

  render() {
    const { sortable, columns_name, toolbar, footer } = this.props;
    const { columns } = this.state;
    const columnsList = columns.map((name: string, index: number) => {
      const configColumnsHeader = this.props.configColumnsHeader
        ? this.props.configColumnsHeader
        : [];

      const col = new TableColumn(
        name,
        index,
        columns,
        configColumnsHeader,
        columns_name,
        sortable
      );
      return col.getColumn(this.renderCell);
    });

    const resizingProperties = this.getResizingProperties();
    let { enableColumnResizing } = resizingProperties;

    const columnWidths = this.state.columnsWidth;
    enableColumnResizing = columnWidths ? false : enableColumnResizing;

    let bodyContextMenuRenderer = {};
    if (this.state.edit) {
      bodyContextMenuRenderer = {
        bodyContextMenuRenderer: this.renderBodyContextMenu
      };
    }

    return (
      <React.Fragment>
        {toolbar && toolbar}

        {this.props.edit && (
          <EditToolBar
            edit={this.state.edit}
            onSave={this.saveEdit}
            onCancel={this.cancelEdit}
            onEdit={this.onEdit}
            setupEditToolbar={this.props.edit && this.props.edit.editToolbar}
          />
        )}

        <Table
          ref={this.tableRef}
          className={this.props.className}
          numRows={this.state.sparseCellData.length}
          onColumnsReordered={this._handleColumnsReordered}
          enableColumnReordering={this.props.reordering}
          onSelection={this.checkAndSetSelection}
          selectedRegions={this.state.selectedRegions}
          defaultColumnWidth={this.props.defaultColumnWidth}
          enableColumnResizing={enableColumnResizing}
          enableRowResizing={resizingProperties.enableRowResizing}
          enableRowHeader={resizingProperties.enableRowHeader}
          columnWidths={this.state.columnsWidth}
          defaultRowHeight={this.getDefaultRowHeight()}
          numFrozenColumns={this.props.numFrozenColumns}
          numFrozenRows={this.props.numFrozenRows}
          {...bodyContextMenuRenderer}
        >
          {columnsList}
        </Table>
        {footer && footer}
      </React.Fragment>
    );
  }

  onEdit = () => {
    this.setState({
      edit: true,
      dataBeforeEdit: utils.clone(this.state.sparseCellData)
    });
  };

  cancelEdit = () => {

    this.setState({
      edit: false,
      sparseCellData: this.state.dataBeforeEdit,
      cachedData: []
    });
  };

  saveEdit = () => {
    if (this.state.invalidColumns.length === 0) {
      this.props.edit!.onSave(this.state.dateEdited);
      this.setState({
        edit: false,
        dateEdited: [],
        dataBeforeEdit: [],
        invalidColumns: []
      });
    }

    const invalidColumnName = this.state.invalidColumns.map(colunmIndex => {
      return this.state.columns[colunmIndex];
    });

    if (this.props.edit && this.props.edit.invalidDataMessage) {
      this.props.edit.invalidDataMessage(invalidColumnName);
    }
  };

  getDefaultRowHeight = (): number => {
    if (this.props.typeHeightRow) {
      switch (this.props.typeHeightRow) {
        case 'SHORT':
          return 22;
        case 'HALF':
          return 50;
        default:
          return 100;
      }
    }
    return 22;
  };

  getResizingProperties = () => {
    const enableRowResizing = this.props.enableRowResizing
      ? this.props.enableRowResizing
      : false;

    const enableRowHeader = enableRowResizing
      ? true
      : this.props.enableRowHeader
        ? this.props.enableRowHeader
        : false;

    const enableColumnResizing = this.props.enableColumnResizing
      ? this.props.enableRowResizing
      : false;

    return { enableRowHeader, enableColumnResizing, enableRowResizing };
  };

  getColumnsWidths = () => {
    if (this.state.columnsWidth && this.state.columnsWidth.length > 0) {
      return this.state.columnsWidth;
    }
    if (
      this.props.columnWidths &&
      this.props.columnWidths.length === this.props.columns.length
    ) {
      return this.props.columnWidths;
    }
    if (this.props.columnWidths) {
      console.warn(
        'Gsi-vx-ui => [Violation] The last configuration to catch the width ' +
          'of the columns does not correspond to the column amount of the table'
      );
    }
    return [];
  };

  public renderCell = (rowIndex: number, columnIndex: number) => {
    const dataKey = VTable.dataKey(rowIndex, columnIndex);
    const { edit } = this.props;

    const columns = this.state.columns;
    const data = this.state.sparseCellData;
    const value = data[rowIndex][columns[columnIndex]];
    const widgetCell = this.getWidgetCell(rowIndex, columns[columnIndex]);

    if (widgetCell) widgetCell.widget.value = value;
    const isValid = this.isValid(columnIndex, value);
    this.updateInvalidColumns(isValid, columnIndex);

    const component = widgetCell && (
      <Widget
        row={rowIndex}
        column={columnIndex}
        onClick={this.handleOnClickWidget}
        {...widgetCell.widget}
        disable={!this.state.edit}
        isValid={isValid}
      />
    );

    if (component)
      return (
        <CellDiv isValid={isValid} as={Cell}>
          {component}
        </CellDiv>
      );

    if (edit && edit.editColumn.columns === 'ALL') {
      return (
        <CellDiv isValid={isValid} as={Cell}>
          {' '}
          <Widget
            row={rowIndex}
            column={columnIndex}
            onClick={this.handleOnClickWidget}
            type={'EDIT'}
            value={value}
            disable={!this.state.edit}
            isValid={isValid}
          />
        </CellDiv>
      );
    }
    return edit &&
      edit.editColumn.columns !== 'ALL' &&
      edit.editColumn.columns.indexOf(columns[columnIndex]) !== -1 ? (
      <CellDiv isValid={isValid} as={Cell}>
        {' '}
        <Widget
          row={rowIndex}
          column={columnIndex}
          onClick={this.handleOnClickWidget}
          type={'EDIT'}
          value={value}
          disable={!this.state.edit}
          isValid={isValid}
        />
      </CellDiv>
    ) : (
      <CellCenterText as={Cell}>{value}</CellCenterText>
    );
  };

  private updateInvalidColumns(isValid: boolean, columnIndex: number) {
    const invalidColumns = this.state.invalidColumns;
    !isValid &&
      invalidColumns.find(x => x === columnIndex) === undefined &&
      invalidColumns.push(columnIndex);
  }

  private isValid(columnIndex: number, value: string) {
    let isValid = true;
    if (this.props.edit && this.state.edit) {
      isValid = this.isValidValue(columnIndex, value);
    }
    return isValid;
  }

  private getWidgetCellValid = (): IVWidgetTableProps[] => {
    const { columns } = this.state;
    const widgetsValid: IVWidgetTableProps[] = [];

    this.state.widgetsCell &&
      this.state.widgetsCell.forEach((widget: IVWidgetTableProps) => {
        if (columns.filter(x => x === widget.column).length === 1) {
          widgetsValid.push(widget);
        }
      });

    return widgetsValid;
  };

  private getWidgetCell = (rowIndex: number, columnName: string) => {
    const widgetCellValid =
      this.state.widgetsCell &&
      this.state.widgetsCell.length > 0 &&
      this.getWidgetCellValid();

    return (
      widgetCellValid && widgetCellValid.find(x => x.column === columnName)
    );
  };

  handleOnClickWidget = (
    rowIndex: number,
    columnIndex: number,
    newValue: string
  ) => {
    const dataKey = VTable.dataKey(rowIndex, columnIndex);
    this.setSparseCellUpdateData(dataKey, newValue);
    this.setStateData(rowIndex, columnIndex, newValue);
    this.setDataEdited(rowIndex);
  };

  private setDataEdited(rowIndex: number) {
    const dataEdited = this.state.dateEdited;
    const rowEdited = dataEdited.find(x => x.rowIndex === rowIndex);
    if (rowEdited) {
      rowEdited.data = this.state.sparseCellData[rowIndex];
    } else {
      dataEdited.push({ rowIndex, data: this.state.sparseCellData[rowIndex] });
    }
  }

  private isValidValue = (columnIndex: number, value: string) => {
    if (
      this.props.edit &&

      this.props.edit.editColumn.validation &&
      this.props.edit.editColumn.validation[this.state.columns[columnIndex]]
    ) {
      return this.props.edit.editColumn.validation[
        this.state.columns[columnIndex]
        ](value);
    }
    return true;
  };

  makeResponsiveTable = () => {
    const rowNumber = this.props.enableRowHeader ? 30 : 0;
    const tableWidth = this.tableRef.current.rootTableElement.clientWidth;
    const { columns, columnWidths } = this.props;
    const {
      fixedCellsTotal,
      reservedWidth
    } = this.getReservedWidthAndFixedCells(columnWidths || []);
    const sizePerColumn =
      columns.length > 0 && columns.length > fixedCellsTotal
        ? (tableWidth - reservedWidth - rowNumber) /
          (columns.length - fixedCellsTotal)
        : 0;
    const columnsWidth: number[] = [];
    if (columns && columns.length > 0) {
      columns.map((el, index) => {
        if (columnWidths && index <= columnWidths.length - 1) {
          columnsWidth.push(columnWidths[index] || sizePerColumn);
        } else {
          columnsWidth.push(sizePerColumn);
        }
      });
      this.setColumnsWidth(columnsWidth);
    }
  };

  setColumnsWidth = (columnsWidth: any[]) => {
    this.setState({ ...this.state, columnsWidth });
  };

  initColumnsWidth() {
    const { columns, columnWidths } = this.props;
    const colsWidth = columnWidths || [];
    while (colsWidth.length < columns.length) {
      colsWidth.push(0);
    }
    return colsWidth;
  }

  getReservedWidthAndFixedCells = (columnWidths: any[]) => {
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

  componentDidMount() {
    this.makeResponsiveTable();
    const observer = fromEvent(window, 'keydown');
    observer.subscribe(event => {
      this.handleCtrlCAndV(event);
    });
    const observerResize = fromEvent(window, 'resize');
    observerResize.subscribe(event => {
      this.makeResponsiveTable();
    });
  }

  /**
   ** Select regions Table Fixture
   **/

  /**
   ** @param argsRegions: The table context selected regions
   ** @description set the current selected regions of the table after of process the regions in order of validate
   ** the loss of regions , set the missing params of rows or cols, deselect the desired cells, and delete unnecessary
   ** regions remains
   **/
  checkAndSetSelection = (argsRegions: IRegion[]) => {
    const { cellSelectionType, onSelectionChange } = this.props;
    let regions: IRegion[] = [];
    if (
      cellSelectionType === 'ENTIRE_ROW' &&
      argsRegions &&
      argsRegions.length > 0
    ) {
      regions = this.getEntireRowsRegions(argsRegions);
      if (onSelectionChange) {
        console.log(regions);
        if (
          regions &&
          regions.length > 0 &&
          regions[0].rows &&
          regions[0].rows.length > 0
        ) {
          const data = this.getElementData(regions[0].rows[0]);
          onSelectionChange(data);
        }
      }
    } else if (!cellSelectionType || cellSelectionType === 'FREE') {
      regions = this.getFreeSelectionRegions(argsRegions);
    }
    this.setSelectedRegions(regions);
  };

  getElementData = (rowIndex: number): any => {
    const { data } = this.props;
    if (data && data.length > rowIndex) {
      return data[rowIndex];
    }
    return undefined;
  };

  getFreeSelectionRegions = (argsRegions: IRegion[]): IRegion[] => {
    return this.createSelectedRegions(
      this.validateMissingRegion,
      this.getRegionsWithMissingRowsOrCols,
      this.ifAlreadySelectedThenDeselect,
      this.deleteRegionRemain
    )(argsRegions);
  };
  getEntireRowsRegions = (argsRegions: IRegion[]): IRegion[] => {
    const pivotRegion: IRegion = argsRegions[argsRegions.length - 1];
    const { numCols } = this.getRowAndColsTotals();
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
  createSelectedRegions = (...fns: any[]) => (regions: IRegion[]): IRegion[] =>
    fns.reduce((v, f) => f(v), regions);

  /**
   ** @param argsRegions: the regions of the table context
   ** @description check if a region is missing in the current selection and is an error add the region to the selection.
   ** @return the fixed regions.
   **/
  validateMissingRegion = (argsRegions: IRegion[]) => {
    const regions = utils.clone(argsRegions);
    if (regions && regions.length > 1) {
      const lastRegion = regions[regions.length - 1];
      const { selectedRegions } = this.state;
      selectedRegions.map(region => {
        if (
          (!this.regionExistence(region, regions) &&
            !this.isSingleCell(region)) ||
          (!this.regionExistence(region, regions) &&
            this.isSingleCell(region) &&
            this.isContainedRegion(region, lastRegion))
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
  getRegionsWithMissingRowsOrCols = (argsRegions: IRegion[]): IRegion[] => {
    const regions = utils.clone(argsRegions);
    const { numRows, numCols } = this.getRowAndColsTotals();

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
  ifAlreadySelectedThenDeselect = (argsRegions: IRegion[]): IRegion[] => {
    let regions: IRegion[] = utils.clone(argsRegions);
    const lastRegion = regions[regions.length - 1];
    if (
      lastRegion &&
      lastRegion.cols &&
      lastRegion.rows &&
      this.isSingleCell(lastRegion)
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
          this.isContainedRegion(region, lastRegion) &&
          this.isSingleCell(region)
        ) {
          regions.splice(index, 1);
          singleCellFounded = true;
        }
      });
      if (!singleCellFounded) {
        regions.map((region, index) => {
          if (
            !alreadySplitted &&
            this.isContainedRegion(
              region,
              lastRegion,
              index,
              regions.length - 1
            )
          ) {
            const splittedRegion = this.splitRegion(region, checkRegion);
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
        this.isContainedRegion(lastRegion, regions[regions.length - 2])
      ) {
        regions.splice(regions.length - 2, 1);
      } else if (
        regions.length > 2 &&
        this.isContainedRegion(regions[regions.length - 2], lastRegion)
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
  deleteRegionRemain = (argsRegions: IRegion[]): IRegion[] => {
    const regions = utils.clone(argsRegions);
    const lastRegion = regions[regions.length - 1];
    if (this.isSingleCell(lastRegion)) {
      const { selectedRegions } = this.state;
      if (selectedRegions.length > 0) {
        const lastRegionInState: IRegion =
          selectedRegions[selectedRegions.length - 1];
        if (lastRegionInState.cols && lastRegionInState.rows) {
          if (
            ((lastRegionInState.cols[1] - lastRegionInState.cols[0] === 1 &&
              lastRegionInState.rows[1] - lastRegionInState.rows[0] === 0) ||
              (lastRegionInState.rows[1] - lastRegionInState.rows[0] === 1 &&
                lastRegionInState.cols[1] - lastRegionInState.cols[0] === 0)) &&
            this.isContainedRegion(lastRegionInState, lastRegion)
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
  isContainedRegion = (
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
  splitRegion = (argsRegion: IRegion, cellToDeselect: ICell): IRegion[] => {
    const region = utils.clone(argsRegion);
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
  regionExistence = (region: IRegion, regions: IRegion[]): boolean => {
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
  isSingleCell = (region: IRegion): boolean => {
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
  setSelectedRegions = (selectedRegions: IRegion[]) => {
    this.setState({ ...this.state, selectedRegions });
  };

  /**
   ** @return set the total of cols and rows of the table
   **/
  getRowAndColsTotals = (): any => {
    const numRows = this.state.sparseCellData.length || 0;
    const numCols = (this.props.columns && this.props.columns.length) || 0;
    return { numRows, numCols };
  };

  /**
   ** End select regions Table Fixture
   **/

  private cellValidator = (rowIndex: number, columnIndex: number) => {
    const dataKey = VTable.dataKey(rowIndex, columnIndex);
    return (value: string) => {
      if (!this.isValidValue(columnIndex, value)) {
        this.setSparseCellInvalid(dataKey, Intent.DANGER);
      } else {
        this.clearSparseCellInvalid(dataKey);
      }
      this.setSparseCellUpdateData(dataKey, value);
      this.setStateData(rowIndex, columnIndex, value);
    };
  };

  private cellSetter = (rowIndex: number, columnIndex: number) => {
    const dataKey = VTable.dataKey(rowIndex, columnIndex);
    return (value: string) => {
      if (!this.isValidValue(columnIndex, value)) {
        this.setSparseCellInvalid(dataKey, Intent.DANGER);
      } else {
        this.clearSparseCellInvalid(dataKey);
      }
      this.setSparseCellUpdateData(dataKey, value);
      this.setStateData(rowIndex, columnIndex, value);
    };
  };

  private setSparseCellInvalid = (dataKey: string, value: any) => {
    this.setState({
      sparseCellInvalid: {
        ...this.state.sparseCellInvalid,
        ...{ [dataKey]: value }
      }
    });
  };

  private setSparseCellUpdateData = (dataKey: string, value: any) => {
    this.setState({
      sparseCellUpdateData: {
        ...this.state.sparseCellUpdateData,
        ...{ [dataKey]: value }
      }
    });
  };

  private clearSparseCellInvalid = (dataKey: string) => {
    if (this.state.sparseCellInvalid![dataKey]) {
      const state = this.state;
      delete state.sparseCellInvalid![dataKey];
      this.setState(state);
    }
  };

  private setStateData = (
    rowIndex: number,
    columnIndex: number,
    value: string
  ) => {
    const data = this.state.sparseCellData;
    if (data.length > rowIndex && rowIndex >= 0) {
      data[rowIndex][this.state.columns[columnIndex]] = value;
      this.setState({
        sparseCellData: data
      });
    }
  };

  setCachedData = (cachedData: any[]) => {
    this.setState({ ...this.state, cachedData });
  };

  hasCachedData = () => {
    return !!this.state.cachedData && this.state.cachedData.length > 0;
  };

  cachedData = () => {
    return this.state.cachedData;
  };

  private renderBodyContextMenu = (context: IMenuContext) => {
    let canCopy = true;
    const target = context && context.getTarget();
    if (target && target.cols && target.cols.length > 0) {
      canCopy = this.canCellExecuteAction(target.cols[0]);
    }
    return this.props.contextual && canCopy ? (
      <ActionCellsMenuItem
        context={context}
        getCellData={this.getCellData}
        context_options={this.props.contextual!}
        onDefaultActions={this.onDefaultActions}
        hasCachedData={this.hasCachedData}
        tableColsAndRowsTotals={this.getRowAndColsTotals}
        getDataToCopy={this.getDataToCopy}
        getPivotCell={this.getPivotCell}
      />
    ) : (
      <div/>
    );
  };

  private getCellData = (rowIndex: number, columnIndex: number) => {
    const data = this.state.sparseCellData[rowIndex];
    return data[this.state.columns[columnIndex]];
  };

  private onDefaultActions = (action: DefaultActions, value: any) => {
    switch (action) {
      case 'copy':
        this.setCachedData(value);
        break;
      case 'paste':
        this.handlePaste(value);
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
  getDataToCopy = (context: IMenuContext) => {
    const regions = context.getRegions();
    return this.getRegionsData(regions);
  };

  /**
   ** @param regions: the selected regions of the table context
   *  @return an array of cells with the distance of rows and columns of the regions first pivot and the value of the cell
   **/
  getRegionsData(regions: IRegion[]) {
    const firstPivotCell = this.getPivotCell(regions);
    const cellsArray: any[] = [];
    regions.map(region => {
      const { startCell, endCell } = utils.getStartAndEndCell(region);
      let rowFromPivot = startCell.row - firstPivotCell.row;
      let colFromPivot = startCell.col - firstPivotCell.col;
      for (let index = startCell.col; index <= endCell.col; index++) {
        for (let indexY = startCell.row; indexY <= endCell.row; indexY++) {
          const value = this.getCellData(indexY, index);
          if (this.canCellExecuteAction(index, 'copy')) {
            cellsArray.push(
              this.createCellForCopy(colFromPivot, rowFromPivot, value)
            );
          }
          rowFromPivot++;
        }
        rowFromPivot = startCell.row - firstPivotCell.row;
        colFromPivot++;
      }
    });
    return cellsArray;
  }

  /**
   ** @param regions: The table context regions
   *  @return the pivot cell of all regions which is the first row of the first column (left, top)
   **/
  getPivotCell = (regions: IRegion[]): ICell => {
    const { numRows, numCols } = this.getRowAndColsTotals();
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
  createCellForCopy = (
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
  handlePaste(pivotCell: ICell): void {
    const cachedData = this.cachedData();
    if (cachedData) {
      cachedData.map((cellData: any) => {
        const { value, colFromPivot, rowFromPivot } = cellData;
        const col = colFromPivot + pivotCell.col;
        const row = rowFromPivot + pivotCell.row;
        if (this.canCellExecuteAction(col, 'paste')) {
          const dataKey = VTable.dataKey(row, col);
          this.setSparseCellUpdateData(dataKey, value);
          this.setStateData(row, col, value);
        }
      });
    }
  }

  canCellExecuteAction = (columnIndex: number, action?: DefaultActions) => {
    const { columns } = this.state;
    if (columnIndex < columns.length) {
      const column = columns[columnIndex];
      if (this.props.contextual) {
        const { columns, default_actions } = this.props.contextual;
        const hasColumn = columns.some(col => col === column);
        const hasAction = default_actions.some(act => act === action);
        return (hasAction && hasColumn) || (!action && hasColumn);
      }
    }
    return false;
  };

  /**
   *  @description capture the key actions of CTRL + C and CTRL + V and execute the appropriate function.
   **/
  handleCtrlCAndV = (event: any) => {
    const charCode = String.fromCharCode(event.which).toLowerCase();
    if (event.ctrlKey || event.metaKey) {
      if (event.ctrlKey && charCode === 'c') {
        if (
          this.state.selectedRegions &&
          this.state.selectedRegions.length > 0
        ) {
          const cellsToCopy = this.getRegionsData(this.state.selectedRegions);
          this.setCachedData(cellsToCopy);
        }
      } else if (event.ctrlKey && charCode === 'v') {
        if (
          this.state.selectedRegions &&
          this.state.selectedRegions.length > 0
        ) {
          const pivotCell = this.getPivotCell(this.state.selectedRegions);
          this.handlePaste(pivotCell);
        }
      }
    }
  };

  /**
   ** End copy and paste Table Fixture
   **/

  private _handleColumnsReordered = (
    oldIndex: number,
    newIndex: number,
    length: number
  ) => {
    if (oldIndex === newIndex) {
      return;
    }
    const nextChildren = Utils.reorderArray(
      this.state.columns,
      oldIndex,
      newIndex,
      length
    );
    this.setState({ columns: nextChildren });
  };
}
