import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import { IconName, InputGroup, Intent } from '@blueprintjs/core';
/** FieldState */
import { StyledInput } from './style';
import { IFieldProps } from './IFieldProps';
import { FormFieldContainer } from './FormFieldContainer';
import { email, required } from '../Validators';

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
      fill,
      noLabel
    } = this.props;
    let rightEl;
    if (!rightElement) {
      rightEl = <div />;
    }

    return (
      <StyledInput
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
        fill={fill}
        noLabel={noLabel}
      >
        <FormFieldContainer noLabel={noLabel} label={label} fieldState={fieldState}>
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
        </FormFieldContainer>
      </StyledInput>
    );
  }
}
