import React, { Component } from 'react';
import { Cell, EditableCell, IMenuContext, ITableProps, Table, Utils } from '@blueprintjs/table';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';
import { IconName, Intent } from '@blueprintjs/core';
import TableColumn from './TableColumn';
import { ActionCellsMenuItem, DefaultActions, IVContextualTableProps } from './ActionCellsMenuItem';
import { Checkbox, Dropdown, Icon } from 'semantic-ui-react';
import { DateInput, IDateFormatProps } from '@blueprintjs/datetime';
import styled from 'styled-components';
import { DropdownCell,DatetimeCell,CheckboxCell } from './style';
import moment from 'moment';
import Widget from './fields-widget/Widget';

export type IVTableOrder = 'ASC' | 'DESC';

export interface IVActionsTableProps {
  columns: string[];
}

export interface IVActionEditTableProps extends IVActionsTableProps {
  validation?: { [key: string]: (value: string) => boolean };
}

export interface IDropdownValue {
  key: string,
  text: string,
  value: string,
  content: string
}

export type TypeWidget = 'DEFAULT' | 'EDIT' | 'COLOR' | 'DROPDOWN' | 'DATETIME' | 'CUSTOMERCOMPONENT' | 'CHECKBOX';

export interface IVDropdownCell {
  key: string,
  text: string,
  value: string,
  content: string
}

export interface IVColorCell {
  color: string
}


export interface IVDateTimeCell extends IDateFormatProps {
  defaultValue?: Date
}

export interface IWidget {
  type: TypeWidget;
  colorCell?: IVColorCell;
  dropdownCell?: IVDropdownCell[];
  dateTimeCell?: IVDateTimeCell;
  editCell?: IVDateTimeCell;
  cusmtomerCell?: IVDateTimeCell;

}

export interface IVWidgetTableProps {
  row: number;
  column: string,
  widget: IWidget;
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

export interface IVTableProps {
  edit?: IVActionEditTableProps;
  widgetsCell?: IVWidgetTableProps[];
  search?: IVActionsTableProps;
  sortable?: IVActionSortableTableProps;
  contextual?: IVContextualTableProps;
  columns: string[];
  data: any;
  reordering?: boolean;
}

interface IProps extends IVTableProps, ITableProps {
}

export interface IVTableState {
  sparseCellData: any[];
  sparseCellInvalid?: { [key: string]: Intent };
  sparseCellUpdateData?: { [key: string]: string };
  columns: string[];
  widgetsCell?: IVWidgetTableProps[];
}

export class VTable extends Component<IProps, IVTableState> {
  constructor(props: IProps) {
    super(props);
  }

  public static dataKey = (rowIndex: number, columnIndex: number) => {
    return `${rowIndex}-${columnIndex}`;
  };

  public state: IVTableState = {
    sparseCellData: this.props.data,
    sparseCellInvalid: {},
    sparseCellUpdateData: {},
    columns: this.props.columns,
    widgetsCell: this.props.widgetsCell
  };

  render() {
    const { sortable } = this.props;
    const columns = this.state.columns;
    const columnsList = columns.map((name: string, index: number) => {
      const col = new TableColumn(name, index, columns, sortable);
      return col.getColumn(this.renderCell);
    });

    return (
      <Table
        numRows={this.state.sparseCellData.length}
        onColumnsReordered={this._handleColumnsReordered}
        enableColumnReordering={this.props.reordering}
        bodyContextMenuRenderer={this.renderBodyContextMenu}
      >
        {columnsList}
      </Table>
    );
  }

  public renderCell = (rowIndex: number, columnIndex: number) => {


    const dataKey = VTable.dataKey(rowIndex, columnIndex);
    const { edit } = this.props;

    const columns = this.state.columns;
    const data = this.state.sparseCellData;
    const value = data[rowIndex][columns[columnIndex]];

    const widgetCell = this.getWidgetCell(rowIndex, columns[columnIndex]);
    const cellWidget = widgetCell && this.tryeRenderWidgetCell(widgetCell.widget, value);
    const componetn = widgetCell && <Widget { ...widgetCell.widget} />;
    // console.log('componete wdget',componetn);
    // console.log('componete desde la tablrat',cellWidget);
    if (cellWidget) return cellWidget;

    return edit && edit.columns.indexOf(columns[columnIndex]) !== -1 ? (
      <EditableCell
        value={value == null ? '' : value}
        intent={this.state.sparseCellInvalid![dataKey]}
        onCancel={this.cellValidator(rowIndex, columnIndex)}
        onChange={this.cellValidator(rowIndex, columnIndex)}
        onConfirm={this.cellSetter(rowIndex, columnIndex)}
      />
    ) : (
      <Cell>{value}</Cell>
    );
  };

  private getWidgetCellValid = (): IVWidgetTableProps[] => {
    const { columns, sparseCellData } = this.state;
    const widgetsValid: IVWidgetTableProps[] = [];

    this.state.widgetsCell && this.state.widgetsCell.forEach((widget: IVWidgetTableProps) => {
      if (columns.indexOf(widget.column) !== -1 &&
        widget.row < sparseCellData.length) {
        widgetsValid.push(widget);
      }
    });

    return widgetsValid;
  };

  private getWidgetCell = (rowIndex: number, columnName: string) => {
    const widgetCellValid = this.state.widgetsCell && this.state.widgetsCell.length > 0 && this.getWidgetCellValid();
    return widgetCellValid && widgetCellValid.find(x => x.row === rowIndex && x.column === columnName);
  };

  private tryeRenderWidgetCell = (widget: IWidget, value: any) => {
    if (widget) {
      switch (widget.type) {
        case 'COLOR': {
          const color = widget.colorCell && widget.colorCell.color.toLowerCase();
          const CellColor = styled(Cell)`background:${color}; `;
          return <CellColor as={Cell}>{value}</CellColor>;
        }
        case 'DROPDOWN': {
          const options = widget.dropdownCell;
          if (options && options.length !== 0) {
            return (
              <DropdownCell >
                <Dropdown
                  inline
                  options={options}
                  defaultValue={options[0].value}
                />
              </DropdownCell>);
          }
        }
        case 'DATETIME': {

          if (widget && widget.dateTimeCell && moment(value, 'M/D/YYYY', true).isValid()) {
            widget.dateTimeCell.defaultValue = new Date(value);

            return (
              <DatetimeCell as={Cell}>
                <DateInput rightElement={(<Icon name='calendar alternate outline'/>)}  {...widget.dateTimeCell} />
              </DatetimeCell>);
          }
        }
        case  'CHECKBOX':{

          return (<CheckboxCell as={Cell}>
            <Checkbox checked={true} as={Cell}  label={value} />
          </CheckboxCell>)
        }
      }

    }

  };

  private isValidValue = (columnIndex: number, value: string) => {
    if (
      this.props.edit &&
      this.props.edit.validation &&
      this.props.edit.validation[this.state.columns[columnIndex]]
    ) {
      return this.props.edit.validation[this.state.columns[columnIndex]](value);
    }
    return true;
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
    data[rowIndex][this.state.columns[columnIndex]] = value;
    this.setState({
      sparseCellData: data
    });
  };

  private renderBodyContextMenu = (context: IMenuContext) => {
    return this.props.contextual ? (
      <ActionCellsMenuItem
        context={context}
        getCellData={this.getCellData}
        context_options={this.props.contextual!}
        onDefaultActions={this.onDefaultActions}
      />
    ) : (
      <div/>
    );
  };

  private getCellData = (rowIndex: number, columnIndex: number) => {
    const data = this.state.sparseCellData[rowIndex];
    return data[this.state.columns[columnIndex]];
  };

  private onDefaultActions(action: DefaultActions, value: any) {
    switch (action) {
      case 'copy':
        console.log(value);
        break;
      case 'paste':
        console.log(value);
        break;
      case 'export':
        console.log(value);
        break;
    }
  }

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
