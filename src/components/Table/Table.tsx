import React, {Component} from 'react';
import {
    Cell,
    EditableCell,
    IMenuContext,
    ITableProps,
    Table,
    Utils
} from '@blueprintjs/table';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';
import {IconName, Intent} from '@blueprintjs/core';
import TableColumn from './TableColumn';
import {
    ActionCellsMenuItem,
    DefaultActions,
    IVContextualTableProps
} from './ActionCellsMenuItem';

export type IVTableOrder = 'ASC' | 'DESC';

export interface IVActionsTableProps {
    columns: string[];
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

export interface IVTableProps {
    edit?: IVActionEditTableProps;
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
    cachedData: any[];
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
        cachedData: [],
    };

    render() {
        const {sortable} = this.props;
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
        const {edit} = this.props;
        const columns = this.state.columns;
        const data = this.state.sparseCellData;
        const value = data[rowIndex][columns[columnIndex]];
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
                ...{[dataKey]: value}
            }
        });
    };

    private setSparseCellUpdateData = (dataKey: string, value: any) => {
        this.setState({
            sparseCellUpdateData: {
                ...this.state.sparseCellUpdateData,
                ...{[dataKey]: value}
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

    setCachedData = (cachedData: any[]) => {
        this.setState({...this.state, cachedData})
    };

    cachedData = () => {
        return this.state.cachedData;
    };

    private renderBodyContextMenu = (context: IMenuContext) => {
        return this.props.contextual ? (
            <ActionCellsMenuItem
                context={context}
                getCellData={this.getCellData}
                context_options={this.props.contextual!}
                onDefaultActions={this.onDefaultActions}
                setCachedData={this.setCachedData}
                cachedData={this.cachedData}
                setStateData={this.setStateData}
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
                console.log(value);
                break;
            case 'paste':
                console.log(value);
                break;
            case 'export':
                console.log(value);
                break;
        }
    };

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
        this.setState({columns: nextChildren});
    };
}
