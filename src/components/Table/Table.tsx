import React, {Component} from "react";
import {
    Cell,
    Column,
    ColumnHeaderCell,
    EditableCell,
    ITableProps,
    Table
} from "@blueprintjs/table";

import "@blueprintjs/table/lib/css/table.css";
import {Intent} from "@blueprintjs/core";

export interface IVActionsTableProps {
    columns: string[];
}

export interface IVActionEditTableProps extends IVActionsTableProps {
    validation?: any[];
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
    order?: IVActionsTableProps;
    sort?: IVActionsTableProps;
    contextual?: IVContextualTableProps;
    columns: string[];
    data: any;
}

interface IProps extends IVTableProps, ITableProps {
}

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
        sparseCellInvalid: {
            "1-0": Intent.DANGER
        },
        sparseCellUpdateData: {}
    };

    render() {
        const {columns} = this.props;
        const columnsList = columns.map((_: string, index: number) => {
            return (
                <Column
                    key={index}
                    cellRenderer={this.renderCell}
                    columnHeaderCellRenderer={this.renderColumnHeader}
                />
            );
        });
        return (
            <Table numRows={this.state.sparseCellData.length}>{columnsList}</Table>
        );
    }

    public renderCell = (rowIndex: number, columnIndex: number) => {
        const dataKey = VTable.dataKey(rowIndex, columnIndex);
        const {edit, columns} = this.props;
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

    public renderColumnHeader = (columnIndex: number) => {
        return (
            <ColumnHeaderCell
                name={this.props.columns[columnIndex].replace(/\b\w/g, l =>
                    l.toUpperCase()
                )}
            />
        );
    };

    private isValidValue(value: string) {
        return false //return /^[a-zA-Z]*$/.test(value);
    }

    private cellValidator = (rowIndex: number, columnIndex: number) => {
        const dataKey = VTable.dataKey(rowIndex, columnIndex);
        return (value: string) => {
            if (!this.isValidValue(value)) {
                this.setSparseCellInvalid(dataKey, Intent.DANGER);
            }
            this.setSparseCellUpdateData(dataKey, value);
            this.setStateData(rowIndex, columnIndex, value);
        };
    };

    private cellSetter = (rowIndex: number, columnIndex: number) => {
        const dataKey = VTable.dataKey(rowIndex, columnIndex);
        return (value: string) => {
            if (!this.isValidValue(value)) {
                this.setSparseCellInvalid(dataKey, Intent.DANGER);

            }
            this.setSparseCellUpdateData(dataKey, value);
            this.setStateData(rowIndex, columnIndex, value);
        };
    };

    private setSparseCellInvalid(dataKey: string, value: any) {
        this.setState({sparseCellInvalid: {...this.state.sparseCellInvalid, ...{[dataKey]: value}}});
    }

    private setSparseCellUpdateData(dataKey: string, value: any) {
        this.setState({sparseCellUpdateData: {...this.state.sparseCellUpdateData, ...{[dataKey]: value}}});
    }

    private setStateData(rowIndex: number, columnIndex: number, value: string) {
        const data = this.state.sparseCellData;
        data[rowIndex][this.props.columns[columnIndex]] = value;
        this.setState({
            sparseCellData: data
        });
    }
}
