import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import {IconName, InputGroup, Intent} from '@blueprintjs/core';
/** FieldState */
import {StyledFormGroup} from "./style";
import {IFieldProps} from "./IFieldProps";


/**
 * Field component. Must be an observer.
 */

export interface IInputFieldProps extends IFieldProps{
    leftIcon?: IconName;
    rightElement?: Element;
    round?: boolean;
    fill?:boolean;
}

@observer
export class VInputField extends React.Component<IInputFieldProps> {
  constructor(props: IInputFieldProps) {
    super(props);
  }

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
        fill={fill}
      >
        <label>{label}</label>
        <InputGroup
          large={size === 'large'}
          small={size === 'small'}
          rightElement={rightEl}
          name={id}
          {...{
            round,
            leftIcon,
            type,
            disabled,
            placeholder,
            id
          }}
          onChange={(e: any) => fieldState.onChange(e.target.value)}
          value={fieldState.value || ''}
          intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        />
      </StyledFormGroup>
    );
  }
}
