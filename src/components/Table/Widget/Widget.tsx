import React, { Component, ReactNode } from 'react';
import moment from 'moment';
import ColorWidget, { IColorWidget } from './Field/ColorWidget/ColorWidget';
import DatetimeWidget from './Field/DatetimeWidget/DatetimeWidget';
import CheckboxWidget from './Field/CheckboxWidget/CheckboxWidget';
import DropdownWidget, { IOption } from './Field/DropdownWidget/DropdownWidget';
import { MaybeElement } from '@blueprintjs/core/src/common/props';
import { IconName   } from '@blueprintjs/core';
import { CenterWidget } from './style';
import InputWidget from './Field/InputWidget/InputWidget';

export interface IVWidgetTableProps {
  column: string;
  widget: IWidget;
}

export interface IWidget {
  type: TypeWidget;
  colorCell?: IColorWidget;
  dropdownCell?: IVDropdownCell;
  dateTimeCell?: IVDateTimeCell;
  cusmtomerCell?: IVCustomerWidget;
  checkboxCell?: IVCheckboxCell;
  value?: any;
  disable?:boolean;
  isValid?:boolean;
}

export interface ActionClickWidget {
  onClick(
    rowIndex: number,
    columnIndex: number,
    newValue: string | boolean
  ): void;
}

export interface IPropsWidgets{
  row: number;
  column: number;
  disable:boolean;
  isValid?:boolean;
}

export interface IVWidget extends IWidget, ActionClickWidget {
  row: number;
  column: number;
}

export interface IVDropdownCell {
  filterable?: boolean;
  options: IOption[];
}

export interface IVCustomerWidget {
  renderCustomer: (value: string) => ReactNode;
}

export interface IVCheckboxCell {
  label?: string;
  backgroundColor?: string;
}

export interface IVDateTimeCell {
  defaultValue?: Date;
  icon?: IconName | MaybeElement;
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
        return <CenterWidget>{this.getDropdownCell()}</CenterWidget>;
      }
      case 'DATETIME': {
        return <CenterWidget> {this.getDatetimeCell()}</CenterWidget>;
      }
      case 'CHECKBOX': {
        return <CenterWidget>{this.getCheckboxCell()}</CenterWidget>;
      }
      case 'CUSTOMERCOMPONENT': {
        if (this.props.cusmtomerCell) {
          this.props.cusmtomerCell.renderCustomer(this.props.value);
          return (
            <CenterWidget>
              <div style={{ padding: ' 0px 11px' }}>
                {this.props.cusmtomerCell.renderCustomer(this.props.value)}
              </div>
            </CenterWidget>
          );
        }
        }
      case 'EDIT' :{
        return  <CenterWidget>
          <InputWidget
            onClick={this.props.onClick}
            value={this.props.value}
            row={this.props.row}
            column={this.props.column}
            disable={this.getDisable()}
            isValid={this.props.isValid}
          />
          </CenterWidget>
      }
    }
    return null;
  };



  private getColorCell = () => {
    if (
      this.props.colorCell &&
      this.props.colorCell.printColor(this.props.value)
    ) {
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
    return (
      <ColorWidget backgroundColor={'transparent'} value={this.props.value} />
    );

    return null;
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
          disable={this.getDisable()}
          isValid={this.props.isValid}
        />
      );
    }
    return null;
  };

  private exitsValueSelected(options: IOption[]): boolean {

    return options.find(x => x.value === this.props.value) !== undefined;
  }

  private getDatetimeCell = () => {
    if (this.props && moment(this.props.value, 'MM/DD/YYYY', true).isValid()) {
      return (
        <DatetimeWidget
          column={this.props.column}
          row={this.props.row}
          onClick={this.props.onClick}
          value={this.props.value}
          {...this.props.dateTimeCell}
          disable={this.getDisable()}
          isValid={this.props.isValid}

        />
      );
    }
    return null;
  };

  private getCheckboxCell = () => {
    if (typeof this.props.value === 'boolean') {
      return (
        <CheckboxWidget
          column={this.props.column}
          row={this.props.row}
          onClick={this.props.onClick}
          value={this.props.value}
          {...this.props.checkboxCell}
          disable={this.getDisable()}
        />
      );
    }
    return null;
  };

  getDisable = (): boolean => {
    return this.props.disable !== undefined ? this.props.disable : true;
  };
}

export default Widget;
