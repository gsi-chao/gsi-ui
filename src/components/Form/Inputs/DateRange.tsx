import { observer } from 'mobx-react';
import * as React from 'react';
import { createRef } from 'react';
import moment from 'moment';
/** Blueprint */
import { IconName, Intent, IPopoverProps } from '@blueprintjs/core';
import { DateRangeInput, IDateFormatProps, TimePrecision } from '@blueprintjs/datetime';
/** FieldState */
import { StyledDateRange } from './style';
import { IFieldProps } from './IFieldProps';
import { FormFieldContainer } from './FormFieldContainer';
import { computed } from 'mobx';
import { Validators } from '../Validators';

/**
 * Field component. Must be an observer.
 */

export interface IInputFieldProps extends IFieldProps {
  leftIcon?: IconName;
  rightElement?: JSX.Element;
  round?: boolean;
  fill?: boolean;
  icon?: IIcon;
  format?: string;
  popoverProps?: IPopoverProps;
  precision?: TimePrecision;
  useAmPm?: boolean;
  maxTime?: Date;
  minTime?: Date;
  canClearSelection?: boolean;
  shortcuts?: boolean | any[];
  showActionsBar?: boolean;
  allowSingleDayRange?: boolean;
  contiguousCalendarMonths?: boolean;
}

interface IIcon {
  backgroundColor?: string;
  color?: string;
  size?: number;
  iconName: IconName;
}

const momentFormatter = (format: string): IDateFormatProps => {
  return {
    formatDate: date => moment(date).format(format),
    parseDate: str => {
      if (!moment(str, format, true).isValid()) {
        return false;
      }
      return moment(str, format).toDate();
    },
    placeholder: `${format}`
  };
};

@observer
export class VDateRangePicker extends React.Component<IInputFieldProps> {
  public setDateRef: any;
  public dateRef: any;
  public isFocused: any;
  constructor(props: IInputFieldProps) {
    super(props);
    this.dateRef = null;
    this.setDateRef = (element: any) => {
      this.dateRef = element;
    };
    this.isFocused = createRef();
  }

  FORMATS = () => {
    return momentFormatter(this.props.format || 'MM/DD/YYYY');
  };

  changedDate = (dates: any[]) => {
    if (dates && dates.length === 2) {
      const newDates = [
        (moment(dates[0], this.props.format || 'MM/DD/YYYY').isValid() &&
          dates[0]) ||
          null,
        (moment(dates[1], this.props.format || 'MM/DD/YYYY').isValid() &&
          dates[1]) ||
          null
      ];
      if (this.props.fieldState) {
        this.props.fieldState.onChange(newDates);
      }
      if (this.props.onChange) {
        this.props.onChange(newDates);
      }
    }
  };

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      disabled,
      inline,
      id,
      className,
      layer,
      fill,
      margin,
      value,
      noLabel,
      required,
      popoverProps,
      maxTime,
      minTime,
      validators,
      displayRequired,
      tooltip,
      allowSingleDayRange,
      contiguousCalendarMonths
    } = this.props;

    if (fieldState) {
      if (required) {
        if (validators && validators.length > 0) {
          fieldState.validators(Validators.required, ...validators);
        } else {
          fieldState.validators(Validators.required);
        }
      } else if (validators && validators.length > 0) {
        fieldState.validators(...validators);
      }
    }
    return (
      <StyledDateRange
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        fill={fill}
        margin={margin}
        noLabel={noLabel}
      >
        <FormFieldContainer
          required={required || displayRequired}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
          value={value}
          tooltip={tooltip}
        >
          <DateRangeInput
            {...this.FORMATS()}
            disabled={disabled}
            minDate={minTime}
            maxDate={maxTime}
            onChange={this.changedDate}
            value={this.valueField}
            popoverProps={{
              minimal: true,
              ...popoverProps
            }}
            shortcuts={this.props.shortcuts}
            allowSingleDayRange={allowSingleDayRange}
            contiguousCalendarMonths={contiguousCalendarMonths}
          />
        </FormFieldContainer>
      </StyledDateRange>
    );
  }

  onKeyPress = (event: any) => {
    const keycode = event.keyCode ? event.keyCode : event.which;
    if (
      !(
        event.shiftKey === false &&
        (keycode === 46 ||
          keycode === 8 ||
          keycode === 37 ||
          keycode === 39 ||
          (keycode >= 48 && keycode <= 57))
      )
    ) {
      event.preventDefault();
    }
  };

  @computed
  get valueField() {
    if (this.props.fieldState) {
      return this.props.fieldState.value;
    }
    if (this.props.value) {
      return this.props.value;
    }
    return null;
  }
}
