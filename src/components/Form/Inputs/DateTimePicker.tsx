import { observer } from 'mobx-react';
import * as React from 'react';
import { createRef } from 'react';
import moment from 'moment';
/** Blueprint */
import { Icon, IconName, Intent, IPopoverProps } from '@blueprintjs/core';
import { IDateFormatProps, TimePicker } from '@blueprintjs/datetime';
/** FieldState */
import { DateInputContainer, IconDate, StyledFormGroup } from './style';
import { IFieldProps } from './IFieldProps';
import { FormFieldContainer } from './FormFieldContainer';
import { computed } from 'mobx';
import { TimePrecision } from '@blueprintjs/datetime/lib/esm/timePicker';
import { Validators } from '../Validators';

/**
 * Field component. Must be an observer.
 */

export interface IInputFieldProps extends IFieldProps {
  leftIcon?: IconName;
  rightElement?: JSX.Element;
  round?: boolean;
  fill?: boolean;
  dateType: 'DATE' | 'DATETIME' | 'TIME';
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
export class VDateTimePicker extends React.Component<IInputFieldProps> {
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
    return {
      DATE: momentFormatter(this.props.format || this.dFormat()['DATE']),
      DATETIME: momentFormatter(
        `${this.props.format || this.dFormat()['DATETIME']}`
      ),
      TIME: momentFormatter(this.dFormat()['TIME'])
    };
  };

  dFormat = () => {
    return {
      DATE: 'MM/DD/YYYY',
      DATETIME: 'MM/DD/YYYY HH:mm:ss',
      TIME: 'HH:mm:ss'
    };
  };

  changedDate = (date: any) => {
    if (
      moment(
        date,
        this.props.format || this.dFormat()[this.props.dateType]
      ).isValid() ||
      date === null
    ) {
      if (this.props.fieldState) {
        this.props.fieldState.onChange(date);
      }
      if (this.props.onChange) {
        this.props.onChange(date);
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
      placeholder,
      id,
      className,
      layer,
      fill,
      dateType,
      rightElement,
      icon,
      margin,
      value,
      noLabel,
      required,
      popoverProps,
      maxTime,
      minTime,
      useAmPm,
      precision,
      validators,
      displayRequired,
      tooltip
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
    let iconJSX;
    if (icon) {
      iconJSX = (
        <IconDate
          backgroundColor={icon.backgroundColor}
          onClick={e => {
            e.stopPropagation();
            if (this.isFocused && !this.isFocused.current) {
              this.dateRef && this.dateRef.focus();
            }
          }}
        >
          <Icon
            color={icon.color}
            icon={icon.iconName}
            iconSize={icon.size || 16}
          />
        </IconDate>
      );
    } else {
      iconJSX = rightElement;
    }
    return (
      <StyledFormGroup
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
          {dateType === 'DATETIME' || dateType === 'DATE' ? (
            <DateInputContainer
              {...this.FORMATS()[dateType]}
              disabled={disabled}
              minDate={minTime}
              maxDate={maxTime}
              defaultValue={moment().toDate()}
              onChange={this.changedDate}
              value={this.valueField}
              timePrecision={dateType === 'DATETIME' ? precision : undefined}
              rightElement={iconJSX}
              popoverProps={popoverProps}
              canClearSelection={this.props.canClearSelection}
              shortcuts={this.props.shortcuts}
              showActionsBar={this.props.showActionsBar}
              timePickerProps={
                dateType === 'DATETIME' ? { useAmPm } : undefined
              }
              inputProps={{
                inputRef: this.setDateRef,
                onFocus: () => {
                  this.isFocused.current = true;
                },
                onBlur: () => {
                  this.isFocused.current = false;
                }
              }}
            />
          ) : (
            <TimePicker
              value={this.valueField}
              useAmPm={useAmPm || false}
              precision={precision || 'second'}
              onChange={this.changedDate}
              disabled={disabled}
            />
          )}
        </FormFieldContainer>
      </StyledFormGroup>
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
