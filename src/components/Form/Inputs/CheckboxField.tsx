import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
/** FieldState */ import {
  FormGroup,
  IconName,
  NumericInput,
  Intent,
  Checkbox,
  Alignment
} from '@blueprintjs/core';

import { FieldState } from 'formstate';
import {IFieldProps} from "./IFieldProps";
import {StyledFormGroup} from "./style";

/**
 * Field Props
 */
export interface ICheckBoxFieldProps extends IFieldProps{
  rightElement?: Element;
  alignIndicator?: Alignment;
}

/**
 * Field component. Must be an observer.
 */

@observer
export class VCheckboxField extends React.Component<ICheckBoxFieldProps> {
  constructor(props: ICheckBoxFieldProps) {
    super(props);
  }

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      size,
      disabled,
      inline,
      alignIndicator,
      id,
      className,
      layer
    } = this.props;

    return (
      <StyledFormGroup
        className={className}
        disabled={disabled}
        helperText={fieldState.hasError && fieldState.error}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
      >
        <Checkbox
          name={id}
          large={size === 'large'}
          {...{
            disabled,
            id,
            inline,
            alignIndicator,
            label
          }}
          onChange={(e: any) => fieldState.onChange(e.target.checked)}
          checked={fieldState.value || false}
        />
      </StyledFormGroup>
    );
  }
}
