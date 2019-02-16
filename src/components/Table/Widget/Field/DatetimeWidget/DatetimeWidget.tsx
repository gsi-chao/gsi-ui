import React, { Component } from 'react';
import { DateInput, IDateFormatProps } from '@blueprintjs/datetime';
import { Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import moment from 'moment';
import { DatetimeCell } from './styles';
import { ActionClickWidget } from '../../Widget';

export interface IDatetimeWidget extends IDateFormatProps {
  icon?: SemanticICONS;
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
      icon: this.props.icon,
      formatDate: this.props.formatDate,
      parseDate: this.props.parseDate
    };
  }

  render() {
    if (this.isValidValueProps()) {
      return <DatetimeCell>{this.getDatetime()}</DatetimeCell>;
    }
    return null;
  }

  private getDatetime = () => {
    const jsDateFormatter: IDateFormatProps = {
      formatDate: date => date.toLocaleDateString(),
      parseDate: str => new Date(str),
      placeholder: 'M/D/YYYY'
    };
    const defaultValue = new Date(this.state.value);

    return this.state.icon ? (
      <DateInput
        rightElement={<Icon name={this.state.icon} />}
        defaultValue={defaultValue}
        {...jsDateFormatter}
        onChange={this.handleDateChange}
      />
    ) : (
      <DateInput
        onChange={this.handleDateChange}
        defaultValue={defaultValue}
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
}

export default DatetimeWidget;
