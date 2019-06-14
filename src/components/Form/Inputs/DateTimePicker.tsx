import { observer } from 'mobx-react';
import * as React from 'react';
import moment from 'moment';
/** Blueprint */
import { Icon, IconName, Intent, IPopoverProps } from '@blueprintjs/core';
import { DateInput, IDateFormatProps, TimePicker } from '@blueprintjs/datetime';
/** FieldState */
import { IconDate, StyledFormGroup } from './style';
import { IFieldProps } from './IFieldProps';
import { FormFieldContainer } from './FormFieldContainer';
import { computed } from 'mobx';
import { TimePrecision } from '@blueprintjs/datetime/lib/esm/timePicker';

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
  format?:
    | 'MM/DD/YYYY'
    | 'DD/MM/YYYY'
    | 'MMM/DD/YYYY'
    | 'DD/MMM/YYYY'
    | 'YYYY/MM/DD'
    | 'YYYY-MM-DD';
  popoverProps?: IPopoverProps;
  precision?: TimePrecision;
  useAmPm?: boolean;
  maxTime?: Date;
  minTime?: Date;
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
    parseDate: str => moment(str, format).toDate(),
    placeholder: `${format}`
  };
};

@observer
export class VDateTimePicker extends React.Component<IInputFieldProps> {
  constructor(props: IInputFieldProps) {
    super(props);
  }

  FORMATS = () => {
    return {
      DATE: momentFormatter(this.props.format || 'YYYY-MM-DD'),
      DATETIME: momentFormatter(
        `${this.props.format || 'YYYY-MM-DD'} HH:mm:ss`
      ),
      TIME: momentFormatter('HH:mm:ss')
    };
  };

  changedDate = (date: any) => {
    if (this.props.fieldState) {
      this.props.fieldState.onChange(date);
    }
    if (this.props.onChange) {
      this.props.onChange(date);
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
      precision
    } = this.props;
    let iconJSX;
    if (icon) {
      iconJSX = (
        <IconDate backgroundColor={icon.backgroundColor}>
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
        intent={
          !!fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE
        }
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        fill={fill}
        margin={margin}
      >
        <FormFieldContainer
          required={required}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
        >
          {dateType === 'DATETIME' || dateType === 'DATE' ? (
            <DateInput
              {...this.FORMATS()[dateType]}
              disabled={disabled}
              defaultValue={moment().toDate()}
              onChange={this.changedDate}
              value={this.valueField}
              timePrecision={dateType === 'DATETIME' ? 'second' : undefined}
              rightElement={iconJSX}
              popoverProps={popoverProps}
            />
          ) : (
            <TimePicker
              value={this.valueField}
              useAmPm={useAmPm || false}
              precision={precision || 'second'}
              onChange={this.changedDate}
            />
          )}
        </FormFieldContainer>
      </StyledFormGroup>
    );
  }
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
