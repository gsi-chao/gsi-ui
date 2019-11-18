import { observer } from 'mobx-react';
import * as React from 'react';
import { MaskedInputProps } from 'react-text-mask';
/** Blueprint */
import { Intent } from '@blueprintjs/core';
/** FieldState */
import { StyledInput, StyledMaskInput } from './style';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';
import { computed } from 'mobx';
import { ILayer } from './ILayer';
import { FieldState } from 'formstate';
import { createNumberMask, emailMask } from 'text-mask-addons/dist/textMaskAddons';

/**
 * Field component. Must be an observer.
 */

export const VPublicMask = {
  emailMask,
  createNumberMask
};

export interface IMaskInputProps extends MaskedInputProps {
  round?: boolean;
  fill?: boolean;
  tipLabel?: string;
  label?: string;
  disabled?: boolean;
  inline?: boolean;
  id: string;
  className?: string;
  noLabel?: boolean;
  layer?: ILayer;
  onChange?: (value: any) => void;
  required?: boolean;
  validators?: any[];
  margin?: string;
  value?: any;
  displayRequired?: boolean;
  /** The fieldState */
  fieldState?: FieldState<any>;
}

@observer
export class VMaskField extends React.Component<IMaskInputProps> {
  inputRef: any;
  constructor(props: IMaskInputProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.inputRef = React.createRef();
  }

  public render() {
    const {
      label,
      fieldState,
      disabled,
      inline,
      id,
      className,
      layer,
      fill,
      noLabel,
      required,
      validators,
      margin,
      tipLabel,
      displayRequired
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

    return (
      <StyledInput
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        layer={layer}
        fill={fill}
        noLabel={noLabel}
        margin={margin}
      >
        <FormFieldContainer
          required={required || displayRequired}
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
        >
          {tipLabel && <span className={'tipLabel'}>{tipLabel}</span>}
          <StyledMaskInput
            large={fill ? 'large' : ''}
            name={id}
            mask={this.props.mask}
            guide={this.props.guide}
            keepCharPositions={this.props.keepCharPositions}
            placeholderChar={this.props.placeholderChar}
            pipe={this.props.pipe}
            disabled={disabled}
            showMask={this.props.showMask}
            onChange={this.onChange}
            value={this.valueField}
            style={{
              paddingRight: 10
            }}
            intent={
              fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE
            }
          />
        </FormFieldContainer>
      </StyledInput>
    );
  }

  @computed
  get valueField() {
    if (this.props.fieldState) {
      return this.props.fieldState.value || '';
    }
    if (this.props.value) {
      return this.props.value;
    }
    return '';
  }

  onChange = (e: any) => {
    if (this.props.fieldState) {
      this.props.fieldState.onChange(e.target.value);
    }
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  };
}
