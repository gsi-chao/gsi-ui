import React, { Component } from 'react';

import styled from 'styled-components';
import { Cell } from '@blueprintjs/table';
import { DropdownCell, DatetimeCell, CheckboxCell } from '../style';
import { Checkbox, Dropdown, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { DateInput, IDateFormatProps } from '@blueprintjs/datetime';

export interface IVWidgetTableProps {
  row: number;
  column: string,
  widget: IWidget;
}

export interface IWidget{
  type: TypeWidget;
  colorCell?: IVColorCell;
  dropdownCell?: IVDropdownCell[];
  dateTimeCell?: IVDateTimeCell;
  editCell?: IVDateTimeCell;
  cusmtomerCell?: IVDateTimeCell;
  value?: any
}

export interface IVColorCell {
  color: string
}

export interface IVDropdownCell {
  key: string,
  text: string,
  value: string,
  content: string
}

export interface IVDateTimeCell extends IDateFormatProps {
  defaultValue?: Date
}

export interface IProps extends IWidget{

}

export type TypeWidget = 'DEFAULT' | 'EDIT' | 'COLOR' | 'DROPDOWN' | 'DATETIME' | 'CUSTOMERCOMPONENT' | 'CHECKBOX';

class Widget extends Component <IProps> {

  constructor(props: IProps) {
    super(props);

  }

  render() {
    return <Cell>{this.props.value}</Cell>;
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
        case  'CHECKBOX':{
          return this.getCheckboxCell();
        }
      }
      return null;
  };

  private getColorCell = ()=>{
    const color = this.props.colorCell && this.props.colorCell.color.toLowerCase();
    const CellColor = styled(Cell)`background:${color}; `;
    return <CellColor as={Cell}>{this.props.value}</CellColor>;
  }

  private getDropdownCell = ()=>{
    const options = this.props.dropdownCell;
    if (options && options.length !== 0) {
      return (
        <DropdownCell as={Cell}>
          <Dropdown
            inline
            options={options}
            defaultValue={options[0].value}
          />
        </DropdownCell>);
    }
  }

  private getDatetimeCell = ()=>{
    if (this.props && this.props.dateTimeCell && moment(this.props.value, 'M/D/YYYY', true).isValid()) {
      this.props.dateTimeCell.defaultValue = new Date(this.props.value);
      return (
        <DatetimeCell as={Cell} >
          <DateInput rightElement={(<Icon name='calendar alternate outline'/>)}  {...this.props.dateTimeCell} />
        </DatetimeCell>);
    }
  }

  private getCheckboxCell = ()=>{
    return (<CheckboxCell as={Cell}>
      <Checkbox checked={true} as={Cell}  label={this.props.value} />
    </CheckboxCell>)
    }
  }



export default Widget;