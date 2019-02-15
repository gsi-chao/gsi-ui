import React, { Component } from 'react';
import { DropdownCell,  CheckboxCell } from '../style';
import moment from 'moment';
import {  IDateFormatProps } from '@blueprintjs/datetime';
import { FilmSelect, IFilm } from '../../../App';
import { Button, Checkbox } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer } from '@blueprintjs/select';
import ColorWidget, { IColorWidget } from './Field/ColorWidget/ColorWidget';
import DatetimeWidget from './Field/DatetimeWidget/DatetimeWidget';

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

class Widget extends Component<IWidget> {
  constructor(props: IWidget) {
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
    const color = this.props.colorCell && this.props.colorCell.backgroundColor.toLowerCase();
    if (color) {
      return <ColorWidget backgroundColor={color} value={this.props.value}/>;
    }
  };

  private getDropdownCell = () => {
    const options = this.props.dropdownCell;
    if (options && options.length !== 0) {
      const TOP_100_FILMS: IFilm[] = [
        { rank: 1, title: 'otro', year: 2019 },
        { rank: 2, title: 'otro', year: 2019 },
        { rank: 3, title: 'otro', year: 2019 },
        { rank: 4, title: 'otro', year: 2019 }
      ];

      return (<FilmSelect
        items={TOP_100_FILMS}
        itemPredicate={this.filterFilm}
        itemRenderer={this.renderFilm}
        onItemSelect={this.handleValueChange}
        popoverProps={{ usePortal: true }}
      >

        <Button
          icon="film"
          rightIcon="caret-down"
          text={'(No selection)'}

        />

      </FilmSelect>);

    }
  };

  filterFilm: ItemPredicate<IFilm> = (query, film) => {
    return `${film.rank}. ${film.title.toLowerCase()} ${film.year}`.indexOf(query.toLowerCase()) >= 0;
  };

  renderFilm: ItemRenderer<IFilm> = (film, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    const text = `${film.rank}. ${film.title}`;
    return (
      <p>{text}</p>
    );
  };

  handleValueChange = (film: IFilm) => {
    console.log('cambio el combobox');
  };

  private getDatetimeCell = () => {
    if (
      this.props &&
      this.props.dateTimeCell &&
      moment(this.props.value, 'M/D/YYYY', true).isValid()
    ) {
      this.props.dateTimeCell.defaultValue = new Date(this.props.value);
      return (

          <DatetimeWidget
            value={this.props.value}
            {...this.props.dateTimeCell}
          />

      );
    }
  };

  private getCheckboxCell = () => {
    if (typeof this.props.value === 'boolean') {
      const checkboxBlue = <Checkbox checked={true}/>;
      return <CheckboxCell>{checkboxBlue}</CheckboxCell>;
    }
  };
}

export default Widget;
