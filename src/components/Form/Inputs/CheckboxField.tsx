import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
/** FieldState */ import {
  Intent,
  Checkbox,
  Alignment
} from '@blueprintjs/core';

import { IFieldProps } from './IFieldProps';
import { StyledCheckBoxInput } from './style';
import { FormFieldContainer } from './FormFieldContainer';

/**
 * Field Props
 */
export interface ICheckBoxFieldProps extends IFieldProps {
  rightElement?: Element;
  alignIndicator?: Alignment;
  checkBoxAtLeft?: boolean;
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
      layer,
      checkBoxAtLeft,
      noLabel
    } = this.props;

    return (
      <StyledCheckBoxInput
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        checkBoxAtLeft = {checkBoxAtLeft}
        noLabel={noLabel}
      >
        <FormFieldContainer noLabel={noLabel} label={label} fieldState={fieldState}>
          <Checkbox
            name={id}
            large={size === 'large'}
            {...{
              disabled,
              id,
              inline,
              alignIndicator,
              label: ''
            }}
            onChange={(e: any) => fieldState.onChange(e.target.checked)}
            checked={fieldState.value || false}
          />
        </FormFieldContainer>

      </StyledCheckBoxInput>
    );
  }
}
