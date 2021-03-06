import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import { IconName, InputGroup, Intent } from '@blueprintjs/core';
/** FieldState */
import { StyledInput } from './style';
import { IFieldProps } from './IFieldProps';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';
import { computed } from 'mobx';

/**
 * Field component. Must be an observer.
 */

export interface IInputFieldProps extends IFieldProps {
  leftIcon?: IconName;
  rightElement?: JSX.Element;
  round?: boolean;
  fill?: boolean;
  tipLabel?: string;
  upperCaseFormat?: boolean;
  inputRef?: any;
  regExp: RegExp;
  onKeyDown?: any;
  onFocus?: any;
}

export interface IState {
  start: number;
  end: number;
}

@observer
export class VRegExpInputField extends React.Component<
  IInputFieldProps,
  IState
> {
  inputRef: any;
  constructor(props: IInputFieldProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      start: 1,
      end: 1
    };
    this.inputRef = props.inputRef ? props.inputRef : React.createRef();
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
      margin,
      tipLabel,
      displayRequired,
      tooltip,
      autoComplete,
      onKeyPress,
      onBlur,
      onFocus,
      onKeyDown
    } = this.props;
    let rightEl;
    if (!rightElement) {
      rightEl = <div style={{ paddingRight: 10 }} />;
    }
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
        labelInfo={labelInfo}
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
          tooltip={tooltip}
        >
          {tipLabel && <span className={'tipLabel'}>{tipLabel}</span>}
          <InputGroup
            large={size === 'large'}
            small={size === 'small'}
            rightElement={rightElement || rightEl}
            name={id}
            autoComplete={autoComplete ? autoComplete : 'no_auto'}
            inputRef={this.inputRef}
            {...{
              round,
              leftIcon,
              type,
              disabled,
              placeholder,
              id
            }}
            onChange={this.onChange}
            value={this.valueField}
            onKeyPress={onKeyPress}
            intent={
              fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE
            }
            style={{
              paddingRight: 10,
              textTransform: this.props.upperCaseFormat ? 'uppercase' : 'none'
            }}
            onPaste={e => {
              const oldValue = e && e.currentTarget && e.currentTarget.value;
              const newValue =
                e && e.clipboardData && e.clipboardData.getData('Text');
              if (this.props.onPaste) {
                this.props.onPaste(oldValue, newValue);
              }
            }}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
          />
        </FormFieldContainer>
      </StyledInput>
    );
  }

  @computed
  get valueField() {
    if (this.props.fieldState) {
      if (this.props.regExp.test(this.props.fieldState.value)) {
        return this.props.fieldState.value;
      }
    }
    if (this.props.value) {
      if (this.props.regExp.test(this.props.value)) {
        return this.props.value;
      }
    }
    return '';
  }

  onChange = (e: any) => {
    const value = e?.target?.value?.toString() || '';
    if (this.props.regExp.test(value)) {
      if (this.props.upperCaseFormat) {
        this.setState({
          start: e.target.selectionStart,
          end: e.target.selectionEnd
        });
      }

      const parsedValue =
        (this.props.upperCaseFormat && value.toUpperCase()) || value;
      if (this.props.fieldState) {
        this.props.fieldState.onChange(parsedValue);
      }
      if (this.props.onChange) {
        this.props.onChange(parsedValue);
      }
      if (this.props.upperCaseFormat) {
        setTimeout(() => {
          this.inputRef.current.setSelectionRange(
            this.state.start,
            this.state.end
          );
        }, 30);
      }
    }
  }
}
