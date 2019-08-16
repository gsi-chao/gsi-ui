import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import { Icon, IconName, Intent, IPopoverProps } from '@blueprintjs/core';
import { IDateFormatProps, TimePicker } from '@blueprintjs/datetime';
/** FieldState */
import {
  DateInputPicker,
  DateInputPickerContainer,
  DateInputPickerContainerPortal,
  IconDate,
  StyledFormGroup
} from './style';
import { IFieldProps } from './IFieldProps';
import { FormFieldContainer } from './FormFieldContainer';
import { computed } from 'mobx';
import { TimePrecision } from '@blueprintjs/datetime/lib/esm/timePicker';
import { Validators } from '../Validators';

/**
 * Field component. Must be an observer.
 */
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import fr from 'date-fns/locale/fr';
import it from 'date-fns/locale/it';
import pt from 'date-fns/locale/pt';
import enUS from 'date-fns/locale/en-US';

registerLocale('es-ES', es);
registerLocale('fr-FR', fr);
registerLocale('it-IT', it);
registerLocale('pt-PT', pt);
registerLocale('en-US', enUS);


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
  canClearSelection?: boolean;
  locale?:
    | 'es-ES'
    | 'fr-FR'
    | 'it-IT'
    | 'pt-PT'
    | 'en-US';
  withPortal?: boolean;
}

interface IIcon {
  backgroundColor?: string;
  color?: string;
  size?: number;
  iconName: IconName;
}

/*
const momentFormatter = (format: string): IDateFormatProps => {
  return {
    formatDate: date => moment(date).format(format),
    parseDate: str => moment(str, format).toDate(),
    placeholder: `${format}`
  };
};
*/

@observer
export class VDateTimePicker extends React.Component<IInputFieldProps> {
  constructor(props: IInputFieldProps) {
    super(props);
  }

  /*  FORMATS = () => {
      return {
        DATE: momentFormatter(this.props.format || 'YYYY-MM-DD'),
        DATETIME: momentFormatter(
          `${this.props.format || 'YYYY-MM-DD'} HH:mm:ss`
        ),
        TIME: momentFormatter('HH:mm:ss')
      };
    };*/

  dateFormat = (format: any) => {
    return format.toString()
      .replace(/Y/g, 'y')
      .replace(/D/g, 'd');
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
      precision,
      validators,
      format,
      locale,
      withPortal
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
    let iconJSX: any;
    let calendar: any;
    const openDatepicker = () => calendar.setOpen(true);

    if (icon) {
      iconJSX = (
        <IconDate
          onClick={openDatepicker}
          backgroundColor={icon.backgroundColor}>
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


    const renderDatePicker = () => {
      return (
        <>
          <DateInputPicker
            ref={(c) => calendar = c}
            selected={this.valueField}
            placeholderText={format ? format : 'MM/DD/YYYY'}
            minDate={minTime}
            maxDate={maxTime}
            showMonthDropdown
            showYearDropdown
            locale={locale}
            dateFormat={this.dateFormat(format)}
            onChange={this.changedDate}
            withPortal={withPortal ? withPortal : false}
          />
          {iconJSX}
        </>
      );
    };

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
          required={required}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
          value={value}
        >
          {dateType === 'DATETIME' || dateType === 'DATE' ? (
            (!withPortal) ?
              <DateInputPickerContainer>
                {renderDatePicker()}
              </DateInputPickerContainer> :
              <DateInputPickerContainerPortal>
                {renderDatePicker()}
              </DateInputPickerContainerPortal>
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
