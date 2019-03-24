import React from 'react';

import { IVActionSortableTableProps } from './Table';
import { Column } from '@blueprintjs/table';
import { Menu, MenuItem } from '@blueprintjs/core';
import { ColumnHeaderCellStyled } from './style';
import { IVConfigTextAlign } from './type';

export type ICellLookup = (rowIndex: number, columnIndex: number) => any;

export interface ISortableColumn {
  getColumn(getCellData: ICellLookup): JSX.Element;
}

export interface IVConfigHeader extends IConfignHeader {
  column?: string ;
}

export interface IConfignHeader extends IVConfigTextAlign{
  backgroundColor: string;
  textColor: string;

}

export default class TableColumn implements ISortableColumn {
  constructor(
    protected name: string,
    protected index: number,
    protected columns: string[],
    protected header_config: IVConfigHeader[] | IVConfigHeader,
    protected columns_name?: { [key: string]: string },
    protected sortable?: IVActionSortableTableProps
  ) {}

  getColumn = (getCellData: ICellLookup) => {

    return (
      <Column

        cellRenderer={getCellData}
        columnHeaderCellRenderer={this.renderColumnHeader}
        key={this.index}
        name={this.name}
      />
    );
  };

  renderMenu = (index?: number) => {
    const sortAsc = () => this.sortable!.onSort!(index!, 'ASC');
    const sortDesc = () => this.sortable!.onSort!(index!, 'DESC');
    return (
      <Menu>
        <MenuItem icon="sort-asc" onClick={sortAsc} text="Sort Rank Asc" />
        <MenuItem icon="sort-desc" onClick={sortDesc} text="Sort Rank Desc" />
      </Menu>
    );
  };

  renderColumnHeader = (columnIndex: number) => {
    const menuRenderer = this.getMenu(columnIndex);
    const { backgroundColor, textColor, textAlign } = this.getConfigHeaderStyle(columnIndex);
    const columnName = this.getColumnName(columnIndex);

    return (
      <ColumnHeaderCellStyled
        backgroundColor={backgroundColor}
        textColor={textColor}
        textAlign = {textAlign}
        name={columnName}
        menuRenderer={menuRenderer as any}
      />
    );
  };

  private getMenu(columnIndex: number) {
    let menuRenderer = null;

    if (
      this.sortable &&
      this.sortable.columns.indexOf(this.columns[columnIndex]) !== -1
    ) {
      if (
        this.sortable.custom_render_menu &&
        this.sortable.custom_render_menu[this.columns[columnIndex]]
      ) {
        menuRenderer = this.sortable.custom_render_menu[
          this.columns[columnIndex]
          ];
      } else {
        menuRenderer = this.renderMenu;
      }
    }
    return menuRenderer;
  }

  private getConfigHeaderStyle(columnIndex: number) {
    let backgroundColor = '#f3f9fd';
    let textColor = 'black';
    let textAlign;

    let configHeader: IVConfigHeader[] | IConfignHeader | undefined =  this.header_config;

    if( Array.isArray(configHeader)){
      configHeader = configHeader.find(
        x => x.column === this.columns[columnIndex]
      );
    }

    if (configHeader) {
      backgroundColor = configHeader.backgroundColor;
      textColor = configHeader.textColor;
      textAlign = configHeader.textAlign;
    }
    return { backgroundColor, textColor, textAlign };
  }

  private getColumnName(columnIndex: number) {
    const columnName =
      this.columns_name &&
      this.columns_name.hasOwnProperty(this.columns[columnIndex])
        ? this.columns_name[this.columns[columnIndex]]
        : this.columns[columnIndex].replace(/\b\w/g, l => l.toUpperCase());
    return columnName;
  }


}
