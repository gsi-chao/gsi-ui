import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import { IconName, Intent } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
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
}

@observer
export class VDateTimePicker extends React.Component<IInputFieldProps> {
  constructor(props: IInputFieldProps) {
    super(props);
  }

  changedDate = (SelectedDate: any) => {
    // this.props.fieldState.onChange(moment.f)
  };

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      leftIcon,
      size,
      disabled,
      inline,
      type,
      placeholder,
      rightElement,
      round,
      id,
      className,
      layer,
      fill
    } = this.props;
    let rightEl;
    if (!rightElement) {
      rightEl = <div />;
    }
    console.log(fieldState);
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
          <DateInput
            formatDate={date => date.toLocaleString()}
            parseDate={str => new Date(str)}
            placeholder={placeholder}
            disabled={disabled}
            onChange={this.changedDate}
            value={fieldState.value || null}
          />
        </FormFieldContainer>
      </StyledFormGroup>
    );
  }
}
