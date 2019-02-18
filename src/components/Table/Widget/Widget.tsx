import React, { Component } from 'react';
import moment from 'moment';
import { IDateFormatProps } from '@blueprintjs/datetime';
import ColorWidget, { IColorWidget } from './Field/ColorWidget/ColorWidget';
import DatetimeWidget from './Field/DatetimeWidget/DatetimeWidget';
import CheckboxWidget from './Field/CheckboxWidget/CheckboxWidget';
import DropdownWidget, {
  IOption,
  IProps
} from './Field/DropdownWidget/DropdownWidget';

export interface IVWidgetTableProps {
  row: number;
  column: string;
  widget: IWidget;
}

export interface IWidget {
  type: TypeWidget;
  colorCell?: IColorWidget;
  dropdownCell?: IVDropdownCell;
  dateTimeCell?: IVDateTimeCell;
  cusmtomerCell?: IVDateTimeCell;
  checkboxCell?: IVCheckboxCell;
  value?: any;
}

export interface ActionClickWidget {
  onClick(
    rowIndex: number,
    columnIndex: number,
    newValue: string | boolean
  ): void;
  isRenderized(isRender:boolean) :boolean;
}

export interface IVWidget extends IWidget, ActionClickWidget {
  row: number;
  column: number;
}

export interface IVDropdownCell {
  filterable?: boolean;
  options: IOption[];
}

export interface IVCheckboxCell {
  label?: string;
  backgroundColor?: string;
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
    if (this.props.colorCell) {
      const backgroundColor = this.props.colorCell.backgroundColor.toLowerCase();
      const color =
        this.props.colorCell.color && this.props.colorCell.color.toLowerCase();

      return backgroundColor && color ? (
        <ColorWidget
          backgroundColor={backgroundColor}
          color={color}
          value={this.props.value}
        />
      ) : (
        <ColorWidget
          backgroundColor={backgroundColor}
          value={this.props.value}
        />
      );
    }
  };

  private getDropdownCell = () => {
    if (
      this.props.dropdownCell &&
      this.props.dropdownCell.options &&
      this.exitsValueSelected(this.props.dropdownCell.options)
    ) {
      return (
        <DropdownWidget
          filterable={this.props.dropdownCell.filterable}
          options={this.props.dropdownCell.options}
          valueSelected={this.props.value}
          onClick={this.props.onClick}
          row={this.props.row}
          column={this.props.column}
          isRenderized={this.props.isRenderized}
        />
      );
    }
    return null;
  };



  private exitsValueSelected(options: IOption[]): boolean {
    return options.find(x => x.value === this.props.value) !== undefined;
  }

  private getDatetimeCell = () => {
    if (
      this.props &&
      this.props.dateTimeCell &&
      moment(this.props.value, 'M/D/YYYY', true).isValid()
    ) {
      this.props.dateTimeCell.defaultValue = new Date(this.props.value);
      return (
        <DatetimeWidget
          column={this.props.column}
          row={this.props.row}
          onClick={this.props.onClick}
          value={this.props.value}
          isRenderized={this.props.isRenderized}
          {...this.props.dateTimeCell}
        />
      );
    }
  };

  private getCheckboxCell = () => {
    if (typeof this.props.value === 'boolean') {
      return (
        <CheckboxWidget
          column={this.props.column}
          row={this.props.row}
          onClick={this.props.onClick}
          value={this.props.value}
          isRenderized={this.props.isRenderized}
          {...this.props.checkboxCell}
        />
      );
    }
  };
}

export default Widget;
