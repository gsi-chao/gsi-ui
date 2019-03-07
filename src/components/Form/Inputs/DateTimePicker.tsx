import { observer } from 'mobx-react';
import * as React from 'react';
import moment from 'moment';

/** Blueprint */
import { IconName, Intent } from '@blueprintjs/core';
import { DateInput, IDateFormatProps, TimePicker } from '@blueprintjs/datetime';
/** FieldState */
import { StyledFormGroup } from './style';
import { IFieldProps } from './IFieldProps';
import { FormFieldContainer } from './FormFieldContainer';

/**
 * Field component. Must be an observer.
 */

export interface IInputFieldProps extends IFieldProps {
  leftIcon?: IconName;
  rightElement?: Element;
  round?: boolean;
  fill?: boolean;
  dateType: 'DATE' | 'DATETIME' | 'TIME';
}

const momentFormatter = (format: string): IDateFormatProps => {
  return {
    formatDate: date => moment(date).format(format),
    parseDate: str => moment(str, format).toDate(),
    placeholder: `${format}`
  };
};

const FORMATS = {
  DATE: momentFormatter('YYYY-MM-DD'),
  DATETIME: momentFormatter('YYYY-MM-DD HH:mm:ss'),
  TIME: momentFormatter('HH:mm:ss')
};

@observer
export class VDateTimePicker extends React.Component<IInputFieldProps> {
  constructor(props: IInputFieldProps) {
    super(props);
  }

  changedDate = (date: any) => {
    this.props.fieldState.onChange(date);
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
      dateType
    } = this.props;

    return (
      <StyledFormGroup
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        fill={fill}
      >
        <FormFieldContainer label={label} fieldState={fieldState}>
          {dateType === 'DATETIME' || dateType === 'DATE' ? (
            <DateInput
              {...FORMATS[dateType]}
              disabled={disabled}
              onChange={this.changedDate}
              value={fieldState.value || null}
              timePrecision={dateType === 'DATETIME' ? 'second' : undefined}
            />
          ) : (
            <TimePicker precision={'second'} onChange={this.changedDate} />
          )}
        </FormFieldContainer>
      </StyledFormGroup>
    );
  }
}
