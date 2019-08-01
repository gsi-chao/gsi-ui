import React, { Component, ReactNode } from 'react';
import moment from 'moment';
import { IColorWidget } from './Field/ColorWidget/ColorWidget';
import DatetimeWidget from './Field/DatetimeWidget/DatetimeWidget';
import CheckboxWidget from './Field/CheckboxWidget/CheckboxWidget';
import DropdownWidget, { IOption } from './Field/DropdownWidget/DropdownWidget';
import { MaybeElement } from '@blueprintjs/core/src/common/props';
import { IconName, PopoverPosition, Tooltip } from '@blueprintjs/core';
import { CenterWidget, TooltipsWidgetsColor } from './style';
import InputWidget from './Field/InputWidget/InputWidget';
import {
  printErrorWidget,
  printErrorWidgetByType
} from './handleErrorSetupWidgets';
import { TextAlignProperty } from 'csstype';
import { InfoSelection } from '../type';

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
  onChange?(value: any, infoSelection?: InfoSelection): void;
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
  showTooltips?: (
    value: any,
    infoSelection?: InfoSelection
  ) => JSX.Element | string | undefined;
  positionTooltips?: PopoverPosition;
}

export interface IVDropdownCell {
  filterable?: boolean;
  options: IOption[];
}

export interface IVCustomerWidget {
  renderCustomer: (value: string, infoSelection?: InfoSelection) => ReactNode;
  width?: string;
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
              {this.props.showTooltips ? (
                <TooltipsWidgetsColor
                  usePortal
                  hoverCloseDelay={0}
                  content={
                    this.props.showTooltips(this.props.value, {
                      columnIndex: this.props.column,
                      rowIndex: this.props.row,
                      columnName: this.props.columns[this.props.column]
                    })!
                  }
                  position={
                    this.props.positionTooltips
                      ? this.props.positionTooltips
                      : 'left'
                  }
                >
                  {this.getCustomerWidget()}
                </TooltipsWidgetsColor>
              ) : (
                this.getCustomerWidget()
              )}
            </CenterWidget>
          );
        }
        break;
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
            onChange={this.throwOnChangeCell}
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

  throwOnChangeCell = (
    rowIndex: number,
    columnIndex: number,
    newValue: any
  ): void => {
    if (this.props.onChange) {
      const infoSelection: InfoSelection = {
        rowIndex: this.props.row,
        columnIndex: this.props.column,
        columnName: this.props.columns[this.props.column]
      };
      this.props.onChange(newValue, infoSelection);
    }
  };

  private getCustomerWidget = () => {
    return (
      <div
        style={{
          width: this.props.cusmtomerCell!.width
            ? this.props.cusmtomerCell!.width
            : 'auto',
          padding: ' 0px 11px',
          color: this.getColorSetting().color
        }}
      >
        {this.props.cusmtomerCell!.renderCustomer(this.props.value, {
          columnIndex: this.props.column,
          rowIndex: this.props.row,
          columnName: this.props.columns[this.props.column]
        })}
      </div>
    );
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

  private renderWidget(widget: any, backgroundColor?: string) {
    const backgroundColors = backgroundColor ? backgroundColor : 'transparent';

    return (
      <CenterWidget
        onDoubleClick={this.onDoubleClick}
        backgroundColor={backgroundColors}
      >
        {this.props.showTooltips ? (
          <Tooltip
            usePortal
            hoverCloseDelay={100}
            content={
              this.props.showTooltips(this.props.value, {
                columnIndex: this.props.column,
                rowIndex: this.props.row,
                columnName: this.props.columns[this.props.column]
              })!
            }
            position={
              this.props.positionTooltips ? this.props.positionTooltips : 'left'
            }
          >
            {widget ? widget : <p> {this.props.value}</p>}
          </Tooltip>
        ) : widget ? (
          widget
        ) : (
          <p> {this.props.value}</p>
        )}
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
    const infoSelection: InfoSelection = {
      rowIndex: this.props.row,
      columnIndex: this.props.column,
      columnName: this.props.columns[this.props.column]
    };
    const colorCell = this.props.colorCell;
    return colorCell!.printColor(this.props.value, infoSelection);
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
    const infoSelection: InfoSelection = {
      rowIndex: this.props.row,
      columnIndex: this.props.column,
      columnName: this.props.columns[this.props.column]
    };
    if (
      this.props.colorCell &&
      this.props.colorCell.printColor(this.props.value, infoSelection)
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
          {/*<TooltipsWidgetsColor*/}
          {/*usePortal*/}
          {/*hoverCloseDelay={0}*/}
          {/*content={'samplee'}*/}

          {/*>*/}
          {/*<div style={{ width: '100%' }}>*/}
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
          {/*</div>*/}
          {/*</TooltipsWidgetsColor>*/}
        </CenterWidget>
      ) : (
        <CenterWidget
          onDoubleClick={this.onDoubleClick}
          backgroundColor={backgroundColor}
        >
          {/*<Tooltip*/}
          {/*usePortal*/}
          {/*hoverCloseDelay={0}*/}
          {/*content={'samplee'}*/}
          {/*>*/}
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
          {/*</Tooltip>*/}
        </CenterWidget>
      );
    }

    return (
      <CenterWidget onDoubleClick={this.onDoubleClick}>
        {/*<Tooltip*/}
        {/*usePortal*/}
        {/*hoverCloseDelay={0}*/}
        {/*content={'samplee'}*/}
        {/*>*/}
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
        {/*</Tooltip>*/}
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
          onChange={this.throwOnChangeCell}
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
          onChange={this.throwOnChangeCell}
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
          onChange={this.throwOnChangeCell}
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
