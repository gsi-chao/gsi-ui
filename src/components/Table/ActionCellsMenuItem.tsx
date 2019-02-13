import React from 'react';

import { IconName, Menu, MenuItem } from '@blueprintjs/core';
import { Clipboard, IMenuContext, Regions } from '@blueprintjs/table';

export type DefaultActions = 'copy' | 'paste' | 'export';

export interface IVContextualActionTableProps {
    action: (item: any) => void;
    text: string;
    icon: IconName;
}

export interface ICell {
    col: number;
    row: number;
}

export interface IVContextualTableProps {
    columns: string[];
    actions?: IVContextualActionTableProps[];
    default_actions: DefaultActions[];
}

export interface IActionCellMenuItemProps {
    /**
     * The `IMenuContext` that launched the menu.
     */
    context: IMenuContext;

    /**
     * A callback that returns the data for a specific cell. This need not
     * match the value displayed in the `<Cell>` component. The value will be
     * invisibly added as `textContent` into the DOM before copying.
     */
    getCellData: (row: number, col: number) => any;

    context_options: IVContextualTableProps;

    onDefaultActions: (action: DefaultActions, value: any) => void;
    setCachedData: any;
    cachedData: any;
    setStateData: any;
}

export class ActionCellsMenuItem extends React.PureComponent<
    IActionCellMenuItemProps
    > {
    render() {
        const default_items = this.renderDefaultMenuItems();
        const actions = this.renderActionsMenuItems();
        return (
            <Menu>
                {default_items}
                {actions}
            </Menu>
        );
    }

    renderDefaultMenuItems = () => {
        if (
            this.props.context_options &&
            this.props.context_options.default_actions
        ) {
            const default_actions = this.props.context_options.default_actions;
            return default_actions.map((value: string, key: number) => {
                switch (value) {
                    case 'copy':
                        return (
                            <MenuItem
                                key={key}
                                icon="style"
                                text="Copy"
                                onClick={this.handleCopy}
                            />
                        );
                    case 'paste':
                        return (
                            <MenuItem
                                key={key}
                                icon="cut"
                                text="Paste"
                                onClick={this.handlePaste}
                            />
                        );
                    case 'export':
                        return <MenuItem key={key} icon="export" text="Export" />;
                }
            });
        }
    };

    renderActionsMenuItems = () => {
        if (this.props.context_options && this.props.context_options.actions) {
            const actions = this.props.context_options.actions;
            return actions.map((value: IVContextualActionTableProps, key: number) => {
                return (
                    <MenuItem
                        key={key}
                        icon={value.icon}
                        text={value.text}
                        onClick={value.action}
                    />
                );
            });
        }
    };

    private handleCopy = () => {
        const {context} = this.props;
        this.getDataToCopy(context);
    };

    private handlePaste = () => {
        const {context} = this.props;
        const cells = context.getUniqueCells();
        const tempPivotCell: number[] = cells[0];
        const pivotCell: ICell = {
            col: tempPivotCell[1],
            row: tempPivotCell[0]
        };
        const cachedData = this.props.cachedData();
        if (cachedData) {
            cachedData.map( (cellData: any) => {
                const {value, colFromPivot, rowFromPivot} = cellData;
                const col = colFromPivot + pivotCell.col;
                const row = rowFromPivot + pivotCell.row;
                this.props.setStateData(row, col, value);
            });
            this.props.setCachedData(null);
        }
    };

    getDataToCopy = (context: IMenuContext) => {
        const regions = context.getRegions();
        const firstPivotCell: ICell = {
            col: regions[0].cols && regions[0].cols[0] || 0,
            row: regions[0].rows && regions[0].rows[0] || 0
        };
        const cellsArray: any[] = [];
        regions.map(region => {
            const startCell: ICell = {
                col: region.cols && region.cols[0] || 0,
                row: region.rows && region.rows[0] || 0
            };
            const endCell: ICell = {
                col: region.cols && region.cols[1] || 0,
                row: region.rows && region.rows[1] || 0
            };
            let rowFromPivot = startCell.row - firstPivotCell.row;
            let colFromPivot = startCell.col - firstPivotCell.col;
            for (let index = startCell.col; index <= endCell.col; index++) {
                for (let indexY = startCell.row; indexY <= endCell.row; indexY++) {
                    const value = this.props.getCellData(indexY, index);
                    cellsArray.push(this.createCellForCopy(colFromPivot, rowFromPivot, value));
                    rowFromPivot++;
                }
                rowFromPivot = 0;
                colFromPivot++;
            }
        });
        this.props.setCachedData(cellsArray);
    };

    createCellForCopy = (colFromPivot: number, rowFromPivot: number, value: any) => {
        return {
            colFromPivot, rowFromPivot, value
        }
    }
}
