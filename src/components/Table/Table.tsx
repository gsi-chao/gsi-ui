import React, {Component} from 'react';
import {
    Cell,
    EditableCell,
    IMenuContext,
    IRegion,
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
    DefaultActions, ICell,
    IVContextualTableProps
} from './ActionCellsMenuItem';
import * as utils from './utils';

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
    selectedRegions: IRegion[];
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
        selectedRegions: []
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
                onSelection={this.checkAndSetSelection}
                selectedRegions={this.state.selectedRegions}
            >
                {columnsList}
            </Table>
        );
    }

    checkAndSetSelection = (regions: IRegion[]) => {
        let validRegions = this.getRegionsWithMissingRowsOrCols(regions);
        const selectedRegions = this.ifAlreadySelectedThenDeselect(validRegions);
        this.setSelectedRegions(selectedRegions);
    };

    ifAlreadySelectedThenDeselect(regions: IRegion[]): IRegion[] {
        const lastRegion = regions[regions.length - 1];
        if( lastRegion && lastRegion.rows && lastRegion.rows[0] === lastRegion.rows[1]
            && lastRegion.cols && lastRegion.cols[0] === lastRegion.cols[1] ) {
            const checkRegion: ICell = {
                col: lastRegion.cols[0],
                row: lastRegion.rows[0]
            };
            regions.map((region, index) => {
                if (this.isContainedRegion(index, regions.length - 1, region, checkRegion)) {
                    const splittedRegion = this.splitRegion(region, checkRegion);
                    regions.splice(index, 1, ...splittedRegion);
                    regions = regions.filter(region =>
                        region.rows && (
                            region.rows[0] !== checkRegion.row || region.rows[1] !== checkRegion.row
                        )
                    );
                }
            });
        }
        return regions;
    }

    isContainedRegion = (index: number, length: number, region: IRegion, checkRegion: ICell): boolean => {
        if (index < length) {
            if (region.rows && (region.rows[0] <= checkRegion.row && region.rows[1] >= checkRegion.row) &&
                region.cols && (region.cols[0] <= checkRegion.col && region.cols[1] >= checkRegion.col)
            ) {
                return true;
            }
        }
        return false;
    };

    splitRegion = ( region: IRegion, cellToDeselect: ICell ): IRegion[] => {
        const { endCell, startCell } = utils.getStartAndEndCell(region);
        const splittedRegion = [];
        for(let col = startCell.col; col <= endCell.col; col++) {
            if (col !== cellToDeselect.col) {
                const newRegion: IRegion = {
                    rows: [startCell.row, endCell.row],
                    cols: [col , col]
                };
                splittedRegion.push(newRegion);
            } else {
               if (startCell.row < cellToDeselect.row) {
                   const aboveRegion: IRegion = {
                       rows: [startCell.row, cellToDeselect.row - 1],
                       cols: [col , col]
                   };
                   splittedRegion.push(aboveRegion)
               }
               if (endCell.row > cellToDeselect.row) {
                   const bellowRegion: IRegion = {
                       rows: [cellToDeselect.row + 1, endCell.row],
                       cols: [col , col]
                   };
                   splittedRegion.push(bellowRegion)
               }
            }
        }
        return splittedRegion;
    }

    setSelectedRegions = (selectedRegions: IRegion[]) => {
        this.setState({...this.state, selectedRegions})
    }

    getRowAndColsTotals = (): any => {
        const numRows = this.state.sparseCellData.length || 0;
        const numCols = Object.keys(this.state.sparseCellData[0]).length || 0;
        return { numRows, numCols }
    };

    getRegionsWithMissingRowsOrCols = (regions: IRegion[]): IRegion[] => {
        const { numRows, numCols } = this.getRowAndColsTotals();

        if(regions.length > 0 && regions[regions.length - 1].rows === undefined) {
            regions[regions.length - 1]['rows'] = [0, numRows - 1];
        }
        if(regions.length > 0 && regions[regions.length - 1].cols === undefined) {
            regions[regions.length - 1]['cols'] = [0, numCols - 1];
        }
        return regions;
    };

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
        if (data.length > rowIndex) {
            data[rowIndex][this.state.columns[columnIndex]] = value;
            this.setState({
                sparseCellData: data
            });
        }
    };

    setCachedData = (cachedData: any[]) => {
        this.setState({...this.state, cachedData})
    };

    cachedData = () => {
        return this.state.cachedData;
    };

    hasCachedData = () => {
        return !!this.state.cachedData && this.state.cachedData.length > 0;
    };

    private renderBodyContextMenu = (context: IMenuContext) => {
        return this.props.contextual ? (
            <ActionCellsMenuItem
                context={context}
                getCellData={this.getCellData}
                context_options={this.props.contextual!}
                onDefaultActions={this.onDefaultActions}
                hasCachedData={this.hasCachedData}
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

    handlePaste(pivotCell: ICell) {
        const cachedData = this.cachedData();
        if (cachedData) {
            cachedData.map( (cellData: any) => {
                const {value, colFromPivot, rowFromPivot} = cellData;
                const col = colFromPivot + pivotCell.col;
                const row = rowFromPivot + pivotCell.row;
                this.setStateData(row, col, value);
            });
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
        this.setState({columns: nextChildren});
    };
}
