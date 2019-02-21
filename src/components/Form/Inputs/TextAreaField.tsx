import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import { FormGroup, Intent, TextArea } from '@blueprintjs/core';
/** FieldState */
import {IFieldProps} from "./IFieldProps";
import {StyledFormGroup} from "./style";

/**
 * Field Props
 */

/**
 * Field component. Must be an observer.
 */

export interface ITextAreaFieldProps extends IFieldProps{
    fill?:boolean;
}

@observer
export class VTextAreaField extends React.Component<ITextAreaFieldProps> {
  constructor(props: ITextAreaFieldProps) {
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
      id,
      className,
      fill,
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
        layer={layer}
        labelInfo={labelInfo}
        fill={fill}
      >
        <label>{label}</label>
        <TextArea
          large={size === 'large'}
          small={size === 'small'}
          onChange={(e: any) => fieldState.onChange(e.target.value)}
          value={fieldState.value || ''}
          intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
          name={id}
          {...{
            disabled,
            id
          }}
        />
      </StyledFormGroup>
    );
  }
}
