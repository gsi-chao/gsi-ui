import React from 'react';

import { IconName, Menu, MenuItem } from '@blueprintjs/core';
import { IMenuContext } from '@blueprintjs/table';

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

export interface IVColumnsContextual {
  columns: string[] | 'ALL';
  actions?: IVContextualActionTableProps[];
  default_actions: DefaultActions[];
}

export interface IVContextualTableProps {
  columnsContextual?: IVColumnsContextual[];
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
  contextOptions: IVColumnsContextual;
  onDefaultActions: (action: DefaultActions, value: any) => void;
  hasCachedData: any;
  tableColsAndRowsTotals: any;
  getDataToCopy: any;
  getPivotCell: any;
  modeEdit: boolean;
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
      this.props.contextOptions &&
      this.props.contextOptions.default_actions
    ) {
      const default_actions = this.props.contextOptions!.default_actions;
      return default_actions.map((value: string, key: number) => {
        switch (value) {
          case 'copy':
            return (
              this.props.modeEdit && (
                <MenuItem
                  key={key}
                  icon="style"
                  text="Copy"
                  onClick={this.handleCopy}
                />
              )
            );
          case 'paste':
            return (
              this.props.modeEdit && (
                <MenuItem
                  disabled={!this.props.hasCachedData()}
                  key={key}
                  icon="cut"
                  text="Paste"
                  onClick={this.handlePaste}
                />
              )
            );
          case 'export':
            return <MenuItem key={key} icon="export" text="Export" />;
        }
      });
    }
  };

  renderActionsMenuItems = () => {
    if (this.props.contextOptions && this.props.contextOptions.actions) {
      // const actions = this.props.context_options.actions;
      const actions = this.props.contextOptions!.actions!;
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
    const { context } = this.props;
    const cellsArray = this.props.getDataToCopy(context);
    this.props.onDefaultActions('copy', cellsArray);
  };

  private handlePaste = () => {
    const { context } = this.props;
    const cells = context.getSelectedRegions();
    const pivotCell: ICell = this.props.getPivotCell(cells);
    this.props.onDefaultActions('paste', pivotCell);
  };
}
