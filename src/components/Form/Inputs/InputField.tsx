import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import { IconName, InputGroup, Intent } from '@blueprintjs/core';
/** FieldState */
import { StyledInput } from './style';
import { IFieldProps } from './IFieldProps';
import { FormFieldContainer } from './FormFieldContainer';
import * as validator from '../Validators';

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
      noLabel,
      required,
      validators,
      margin
    } = this.props;
    let rightEl;
    if (!rightElement) {
      rightEl = <div />;
    }
    if (required) {
      if (validators && validators.length > 0) {
        fieldState.validators(validator.required, ...validators);
      } else {
        fieldState.validators(validator.required);
      }
    } else if (validators && validators.length > 0) {
      fieldState.validators(...validators);
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
        margin={margin}
      >
        <FormFieldContainer
          required={required}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
        >
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
            onChange={this.onChange}
            value={fieldState.value || ''}
            intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
          />
        </FormFieldContainer>
      </StyledInput>
    );
  }

  onChange = (e: any) => {
    this.props.fieldState.onChange(e.target.value);
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  };
}
