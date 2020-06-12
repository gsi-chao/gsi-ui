import React from 'react';

import { IconName, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { IMenuContext } from '@blueprintjs/table';

export type DefaultActions = 'copy' | 'paste' | 'export';

export interface IVContextualActionTableProps {
  action: (item: any) => void;
  text: string;
  icon?: IconName;
  disabled?: (item: any) => boolean;
  isMenuDivider?: boolean;
  label?: string;
  labelElement?: React.ReactNode;
  actions?: IVContextualActionTableProps[];
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
  selectionData?: any;
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
        return this.renderContextual(value, key);
      });
    }
  };

  getDisabled = (contextual: IVContextualActionTableProps): boolean => {
    if (contextual.disabled) {
      return contextual.disabled!(this.props.selectionData)!;
    }

    return false;
  };

  renderContextual = (
    contextual: IVContextualActionTableProps,
    key: number
  ) => {
    if (contextual.actions === undefined) {
      return !contextual.isMenuDivider ? (
        <MenuItem
          key={key}
          icon={contextual.icon}
          text={contextual.text}
          label={contextual.label}
          labelElement={contextual.labelElement}
          disabled={this.getDisabled(contextual)}
          onClick={() => {
            contextual.action(this.props.selectionData);
          }}
        />
      ) : (
        <MenuDivider key={key} title={contextual.text} />
      );
    }
    return (
      <MenuItem
        key={key}
        icon={contextual.icon}
        text={contextual.text}
        label={contextual.label}
        labelElement={contextual.labelElement}
        disabled={this.getDisabled(contextual)}
        onClick={() => {
          contextual.action(this.props.selectionData);
        }}
      >
        {contextual.actions.map(
          (value: IVContextualActionTableProps, key: number) => {
            return this.renderContextual(value, key);
          }
        )}
      </MenuItem>
    );
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
