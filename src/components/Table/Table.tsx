import React, { Component } from "react";
import {
  Cell,
  Column,
  ColumnHeaderCell,
  EditableCell,
  ITableProps,
  Table
} from "@blueprintjs/table";

import "@blueprintjs/table/lib/css/table.css";
import { Intent, Menu, MenuItem } from "@blueprintjs/core";
import TableColumn from "./TableColumn";

export type IVTableOrder = "ASC" | "DESC";

export interface IVActionsTableProps {
  columns: string[];
}

export interface IVActionEditTableProps extends IVActionsTableProps {
  validation?: { [key: string]: (value: string) => boolean };
}

export interface IVActionSortableTableProps extends IVActionsTableProps {
  custom_render_menu?: { [key: string]: (value: string) => boolean };
  onSort: (columnIndex: number, order: IVTableOrder) => void;
}

export interface IVContextualItemTableProps {
  action: (item: any) => void;
}

export interface IVContextualTableProps extends IVActionsTableProps {
  item: IVContextualItemTableProps;
}

export interface IVTableProps {
  edit?: IVActionEditTableProps;
  search?: IVActionsTableProps;
  sortable?: IVActionSortableTableProps;
  sort?: IVActionsTableProps;
  contextual?: IVContextualTableProps;
  columns: string[];
  data: any;
}

interface IProps extends IVTableProps, ITableProps {}

export interface IVTableEditableState {
  sparseCellData: any[];
  sparseCellInvalid?: { [key: string]: Intent };
  sparseCellUpdateData?: { [key: string]: string };
}

export class VTable extends Component<IProps, IVTableEditableState> {
  constructor(props: IProps) {
    super(props);
  }

  public static dataKey = (rowIndex: number, columnIndex: number) => {
    return `${rowIndex}-${columnIndex}`;
  };

  public state: IVTableEditableState = {
    sparseCellData: this.props.data,
    sparseCellInvalid: {},
    sparseCellUpdateData: {}
  };

  render() {
    const { columns, sortable } = this.props;
    const columnsList = columns.map((name: string, index: number) => {
      let col = new TableColumn(name, index, columns, sortable);
      return col.getColumn(this.renderCell);
    });

    return (
      <Table numRows={this.state.sparseCellData.length}>{columnsList}</Table>
    );
  }

  public renderCell = (rowIndex: number, columnIndex: number) => {
    const dataKey = VTable.dataKey(rowIndex, columnIndex);
    const { edit, columns } = this.props;
    const data = this.state.sparseCellData;
    const value = data[rowIndex][columns[columnIndex]];
    return edit && edit.columns.indexOf(columns[columnIndex]) != -1 ? (
      <EditableCell
        value={value == null ? "" : value}
        intent={this.state.sparseCellInvalid![dataKey]}
        onCancel={this.cellValidator(rowIndex, columnIndex)}
        onChange={this.cellValidator(rowIndex, columnIndex)}
        onConfirm={this.cellSetter(rowIndex, columnIndex)}
      />
    ) : (
      <Cell>{value}</Cell>
    );
  };

  private isValidValue = (columnIndex: number, value: string) => {
    if (
      this.props.edit &&
      this.props.edit.validation &&
      this.props.edit.validation[this.props.columns[columnIndex]]
    ) {
      return this.props.edit.validation[this.props.columns[columnIndex]](value);
    } else {
      return true;
    }
  };

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
      let state = this.state;
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
    data[rowIndex][this.props.columns[columnIndex]] = value;
    this.setState({
      sparseCellData: data
    });
  };
}
