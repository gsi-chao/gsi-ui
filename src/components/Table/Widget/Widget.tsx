import React, { Component } from 'react';
import { DropdownCell, CheckboxCell } from '../style';
import moment from 'moment';
import { IDateFormatProps } from '@blueprintjs/datetime';
import { FilmSelect, IFilm } from '../../../App';
import { Button, Checkbox } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer } from '@blueprintjs/select';
import ColorWidget, { IColorWidget } from './Field/ColorWidget/ColorWidget';
import DatetimeWidget from './Field/DatetimeWidget/DatetimeWidget';
import { ICellLookup } from '../TableColumn';

export interface IVWidgetTableProps {
  row: number;
  column: string;
  widget: IWidget;
}

export interface IWidget {
  type: TypeWidget;
  colorCell?: IColorWidget;
  dropdownCell?: IVDropdownCell[];
  dateTimeCell?: IVDateTimeCell;
  editCell?: IVDateTimeCell;
  cusmtomerCell?: IVDateTimeCell;
  value?: any;

}

export interface ActionClickWidget {
  onClick(rowIndex: number, columnIndex: number, newValue: string): void;
}

export interface IVWidget extends IWidget, ActionClickWidget{
  row: number;
  column: number;
}

export interface IVDropdownCell {
  key: string;
  text: string;
  value: string;
  content: string;
}

export interface IVDateTimeCell extends IDateFormatProps {
  defaultValue?: Date;
}

export type TypeWidget =
  | 'DEFAULT'
  | 'EDIT'
  | 'COLOR'
  | 'DROPDOWN'
  | 'DATETIME'
  | 'CUSTOMERCOMPONENT'
  | 'CHECKBOX';

class Widget extends Component<IVWidget> {

  constructor(props: IVWidget) {
    super(props);
  }

  render() {
    return this.tryRenderWidgetCell();
  }

  private tryRenderWidgetCell = () => {
    switch (this.props.type) {
      case 'COLOR': {
        return this.getColorCell();
      }
      case 'DROPDOWN': {
        return this.getDropdownCell();
      }
      case 'DATETIME': {
        return this.getDatetimeCell();
      }
      case 'CHECKBOX': {
        return this.getCheckboxCell();
      }
    }
    return null;
  };

  private getColorCell = () => {
    const color =
      this.props.colorCell &&
      this.props.colorCell.backgroundColor.toLowerCase();
    if (color) {
      return <ColorWidget backgroundColor={color} value={this.props.value} />;
    }
  };

  private getDropdownCell = () => {

      return null
    };

  private getDatetimeCell = () => {
    if (
      this.props &&
      this.props.dateTimeCell &&
      moment(this.props.value, 'M/D/YYYY', true).isValid()
    ) {
      this.props.dateTimeCell.defaultValue = new Date(this.props.value);
      return (
        <DatetimeWidget column={this.props.column} row={this.props.row} onClick={this.props.onClick} value={this.props.value} {...this.props.dateTimeCell} />
      );
    }
  };

  private getCheckboxCell = () => {
    if (typeof this.props.value === 'boolean') {
      const checkboxBlue = <Checkbox checked={true} />;
      return <CheckboxCell>{checkboxBlue}</CheckboxCell>;
    }
  };
}

export default Widget;
