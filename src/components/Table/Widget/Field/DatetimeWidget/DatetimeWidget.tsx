import React, { Component } from 'react';
import { DateInput, IDateFormatProps } from '@blueprintjs/datetime';

import moment from 'moment';
import { DatetimeCell } from './styles';
import { ActionClickWidget } from '../../Widget';
import { Icon } from '@blueprintjs/core';
import { MaybeElement } from '@blueprintjs/core/src/common/props';
import { IconName } from '@blueprintjs/icons';
export interface IDatetimeWidget {
  icon?: IconName | MaybeElement;
  value: string;
}

export interface IProps extends IDatetimeWidget, ActionClickWidget {
  row: number;
  column: number;
}

class DatetimeWidget extends Component<IProps, IDatetimeWidget> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: this.props.value,
      icon: this.props.icon
    };
  }

  render() {
    if (this.isValidValueProps()) {
      return <DatetimeCell>{this.getDatetime()}</DatetimeCell>;
    }
    return null;
  }

  private getDatetime = () => {
    const jsDateFormatter: IDateFormatProps = this.momentFormatter('MM/DD/YYYY');
    const defaultValue = new Date(this.state.value);

    return this.state.icon ? (
      <DateInput
        rightElement={<Icon icon={this.state.icon} />}
        defaultValue={defaultValue}
        {...jsDateFormatter}
        onChange={this.handleDateChange}
      />
    ) : (
      <DateInput
        onChange={this.handleDateChange}
        defaultValue={defaultValue}
        rightElement={<Icon icon={'calendar'} />}
        {...jsDateFormatter}
      />
    );
  };

  private handleDateChange = (date: Date) => {
    this.props.onClick(
      this.props.row,
      this.props.column,
      moment(date).format('M/D/YYYY')
    );
  };

  isValidValueProps = () => {
    return (
      this.state.value && moment(this.state.value, 'MM/DD/YYYY', true).isValid()
    );
  };

  momentFormatter = (format?: string): IDateFormatProps => {
    return format?
     {
      formatDate: date => moment(date).format(format),
      parseDate: str => moment(str, format).toDate(),
      placeholder: `${format} (moment)`
    } : {
        formatDate: date => date.toLocaleDateString(),
        parseDate: str => new Date(str),
        placeholder: 'M/D/YYYY'
      };
  };
}

export default DatetimeWidget;
