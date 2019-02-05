import React from 'react';

import { IconName, Menu, MenuItem } from '@blueprintjs/core';
import { Clipboard, IMenuContext, Regions } from '@blueprintjs/table';

export type DefaultActions = 'copy' | 'paste' | 'export';

export interface IVContextualActionTableProps {
  action: (item: any) => void;
  text: string;
  icon: IconName;
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
    const { context, getCellData } = this.props;
    const cells = context.getUniqueCells();
    const sparse = Regions.sparseMapCells(cells, getCellData);
    const success = Clipboard.copyCells(sparse);
    console.log(sparse);
    console.log(context);
  };

  private handlePaste = () => {
    const { context, getCellData } = this.props;
  };
}
