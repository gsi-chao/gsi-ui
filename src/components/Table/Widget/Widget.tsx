import React, { Component, ReactNode } from 'react';
import moment from 'moment';
import { IColorWidget } from './Field/ColorWidget/ColorWidget';
import DatetimeWidget from './Field/DatetimeWidget/DatetimeWidget';
import CheckboxWidget from './Field/CheckboxWidget/CheckboxWidget';
import DropdownWidget, { IOption } from './Field/DropdownWidget/DropdownWidget';
import { MaybeElement } from '@blueprintjs/core/src/common/props';
import { IconName } from '@blueprintjs/core';
import { CenterWidget } from './style';
import InputWidget from './Field/InputWidget/InputWidget';
import {
  printErrorWidget,
  printErrorWidgetByType
} from './handleErrorSetupWidgets';
import { TextAlignProperty } from 'csstype';

export interface IVWidgetTableProps {
  column?: string;
  row?: number;
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
  disable?: boolean;
  isValid?: boolean;
  textAlign?: string;
}

export interface ActionClickWidget {
  onClick(
    rowIndex: number,
    columnIndex: number,
    newValue: string | boolean | number
  ): void;
}

export interface IPropsWidgets {
  row: number;
  column: number;
  disable: boolean;
  isValid?: boolean;
}

export interface IVWidget extends IWidget, ActionClickWidget {
  row: number;
  column: number;
  columns: string[];
  onDoubleClick?: any;
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
      case 'DEFAULT': {
        const defaultCell = this.getDefaultCell();
        return this.renderWidget(defaultCell);
      }
      case 'DROPDOWN': {
        const dropdownWidget = this.getDropdownCell();
        return this.renderWidget(
          dropdownWidget,
          this.getColorSetting().backgroundColor
        );
      }
      case 'DATETIME': {
        const dateTimeWidget = this.getDatetimeCell();
        return this.renderWidget(
          dateTimeWidget,
          this.getColorSetting().backgroundColor
        );
      }
      case 'CHECKBOX': {
        const checkboxWidget = this.getCheckboxCell();

        return this.renderWidget(
          checkboxWidget,
          this.getColorSetting().backgroundColor
        );
      }
      case 'CUSTOMERCOMPONENT': {
        if (this.props.cusmtomerCell) {
          this.props.cusmtomerCell.renderCustomer(this.props.value);
          const colorSetting = this.getColorSetting();
          return (
            <CenterWidget
              onDoubleClick={this.onDoubleClick}
              backgroundColor={colorSetting.backgroundColor}
            >
              <div style={{ padding: ' 0px 11px', color: colorSetting.color }}>
                {this.props.cusmtomerCell.renderCustomer(this.props.value)}
              </div>
            </CenterWidget>
          );
        }
      }
      case 'EDIT': {
        const editWidget = (
          <InputWidget
            onClick={this.props.onClick}
            value={this.props.value}
            row={this.props.row}
            column={this.props.column}
            disable={this.getDisable()}
            isValid={this.props.isValid}
            textAlign={this.props.textAlign}
          />
        );

        return this.renderWidget(
          editWidget,
          this.getColorSetting().backgroundColor
        );
      }
    }
    return null;
  };

  private getTextAlign() {
    const supported: TextAlignProperty[] = [
      '-moz-initial',
      'inherit',
      'initial',
      'revert',
      'unset',
      'center',
      'end',
      'justify',
      'left',
      'match-parent',
      'right',
      'start'
    ];

    const textAlign = supported.find(
      (x: TextAlignProperty) => x === this.props.textAlign
    );
    return textAlign ? textAlign : 'center';
  }

  private getDefaultCell = () => {
    return (
      <p
        style={{
          margin: '0px 11px',
          width: '100%',
          textAlign: this.getTextAlign()
        }}
      >
        {' '}
        {this.props.value}
      </p>
    );
  };

  private renderWidget(widget: any, backgroundColor?: string, color?: string) {
    const backgroundColors = backgroundColor ? backgroundColor : 'transparent';

    return (
      <CenterWidget
        onDoubleClick={this.onDoubleClick}
        backgroundColor={backgroundColors}
      >
        {widget ? widget : <p> {this.props.value}</p>}
      </CenterWidget>
    );
  }

  private getColorSetting = () => {
    if (this.isFullRowColumn() && this.isValidPaintCell()) {
      return this.getBackgroundAndColor();
    }

    if (this.isFullColumn() && this.isValidPaintCell()) {
      return this.getBackgroundAndColor();
    }

    if (this.isFullRow() && this.isValidPaintCell()) {
      return this.getBackgroundAndColor();
    }
    return {
      backgroundColor: 'transparent',
      color: 'black'
    };
  };

  private isValidPaintCell = () => {
    const colorCell = this.props.colorCell;
    return colorCell!.printColor(this.props.value);
  };

  private getBackgroundAndColor() {
    const colorCell = this.props.colorCell;
    return {
      backgroundColor: colorCell!.backgroundColor || 'transparent',
      color: colorCell!.color || 'black'
    };
  }

  private isFullRowColumn = () => {
    const colorCell = this.props.colorCell;
    return (
      colorCell &&
      colorCell.row &&
      colorCell.column &&
      this.props.column === this.props.columns.indexOf(colorCell.column) &&
      colorCell.row === this.props.row
    );
  };

  private isFullRow = () => {
    const colorCell = this.props.colorCell;
    return (
      colorCell &&
      colorCell.row &&
      colorCell.column === undefined &&
      colorCell.row === this.props.row
    );
  };

  private isFullColumn = () => {
    const colorCell = this.props.colorCell;
    return (
      colorCell &&
      colorCell.column &&
      colorCell.row === undefined &&
      this.props.column === this.props.columns.indexOf(colorCell.column)
    );
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
        <CenterWidget
          onDoubleClick={this.onDoubleClick}
          backgroundColor={backgroundColor}
          color={color}
        >
          <p
            style={{
              margin: '0px 11px',
              width: '100%',
              textAlign: this.getTextAlign()
            }}
          >
            {' '}
            {this.props.value}
          </p>
        </CenterWidget>
      ) : (
        <CenterWidget
          onDoubleClick={this.onDoubleClick}
          backgroundColor={backgroundColor}
        >
          <p
            style={{
              margin: '0px 11px',
              width: '100%',
              textAlign: this.getTextAlign()
            }}
          >
            {' '}
            {this.props.value}
          </p>
        </CenterWidget>
      );
    }

    return (
      <CenterWidget onDoubleClick={this.onDoubleClick}>
        <p
          style={{
            margin: '0px 11px',
            width: '100%',
            textAlign: this.getTextAlign()
          }}
        >
          {' '}
          {this.props.value}
        </p>
      </CenterWidget>
    );
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
          color={this.getColorSetting().color}
        />
      );
    }
    this.printErrorByType('DROPDOWN');

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
          color={this.getColorSetting().color}
        />
      );
    }
    this.printErrorByType('DATETIME');
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
    this.printErrorByType('CHECKBOX');
    return null;
  };

  onDoubleClick = () => {
    if (this.props.onDoubleClick) {
      this.props.onDoubleClick();
    }
  };

  getDisable = (): boolean => {
    return this.props.disable !== undefined ? this.props.disable : true;
  };

  printErrorByType = (type: TypeWidget) => {
    printErrorWidget(
      this.props.row,
      this.props.column,
      this.props.dropdownCell,
      printErrorWidgetByType(
        this.props.row,
        this.props.column,
        this.props.value,
        type,
        this.props.dropdownCell
      )
    );
  };
}

export default Widget;
