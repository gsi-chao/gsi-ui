import React from 'react';

import { IVActionSortableTableProps } from './Table';
import { Cell, Column, ColumnHeaderCell } from '@blueprintjs/table';
import { Menu, MenuItem } from '@blueprintjs/core';
import styled from 'styled-components';

export type ICellLookup = (rowIndex: number, columnIndex: number) => any;

export interface ISortableColumn {
  getColumn(getCellData: ICellLookup): JSX.Element;
}

export default class TableColumn implements ISortableColumn {
  constructor(
    protected name: string,
    protected index: number,
    protected columns: string[],
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

    const columnName =
      this.columns_name &&
      this.columns_name.hasOwnProperty(this.columns[columnIndex])
        ? this.columns_name[this.columns[columnIndex]]
        : this.columns[columnIndex].replace(/\b\w/g, l => l.toUpperCase());
    return (
      <ColumnHeaderCell name={columnName} menuRenderer={menuRenderer as any} />
    );
  };
}
