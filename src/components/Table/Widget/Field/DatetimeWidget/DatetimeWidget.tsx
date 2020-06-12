import React, { Component } from 'react';
import { DateInput, IDateFormatProps } from '@blueprintjs/datetime';

import moment from 'moment';
import { DatetimeCell } from './styles';
import { ActionClickWidget, IPropsWidgets } from '../../Widget';
import { Icon } from '@blueprintjs/core';
import { MaybeElement } from '@blueprintjs/core/src/common/props';
import { IconName } from '@blueprintjs/icons';

export interface IDatetimeWidget {
  icon?: IconName | MaybeElement;
  value: string;
}

export interface IProps
  extends IDatetimeWidget,
    ActionClickWidget,
    IPropsWidgets {
  color: string;
  onChange?(
    rowIndex: number,
    columnIndex: number,
    newValue: string | boolean | number
  ): void;
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
      return (
        <DatetimeCell color={this.props.color} isValid={this.props.isValid!}>
          {this.getDatetime()}
        </DatetimeCell>
      );
    }
    return null;
  }

  private getDatetime = () => {
    const jsDateFormatter: IDateFormatProps = this.momentFormatter(
      'MM/DD/YYYY'
    );
    const defaultValue = new Date(this.props.value);

    return (
      <DateInput
        rightElement={<Icon icon={this.state.icon || 'calendar'} />}
        value={defaultValue}
        {...jsDateFormatter}
        disabled={this.props.disable}
        onChange={this.handleDateChange}
        popoverProps={{ minimal: true, position: 'bottom' }}
      />
    );
  };

  private handleDateChange = (date: Date) => {
    this.props.onClick(
      this.props.row,
      this.props.column,
      moment(date).format('MM/DD/YYYY')
    );
    if (this.props.onChange) {
      this.props.onChange(
        this.props.row,
        this.props.column,
        moment(date).format('MM/DD/YYYY')
      );
    }
  };

  isValidValueProps = () => {
    return (
      this.props.value && moment(this.props.value, 'MM/DD/YYYY', true).isValid()
    );
  };

  momentFormatter = (format?: string): IDateFormatProps => {
    return format
      ? {
          formatDate: date => moment(date).format(format),
          parseDate: str => moment(str, format).toDate(),
          placeholder: `${format} (moment)`
        }
      : {
          formatDate: date => date.toLocaleDateString(),
          parseDate: str => new Date(str),
          placeholder: 'MM/DD/YYYY'
        };
  };
}

export default DatetimeWidget;
