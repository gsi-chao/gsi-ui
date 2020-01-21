import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import {
  IconName,
  InputGroup,
  Intent,
  Menu,
  MenuItem,
  Popover
} from '@blueprintjs/core';
/** FieldState */
import { StyledInput } from './style';
import { IFieldProps } from './IFieldProps';
import { FormFieldContainer } from './FormFieldContainer';
import { Validators } from '../Validators';
import { computed } from 'mobx';
import styled from 'styled-components';

/**
 * Field component. Must be an observer.
 */

interface IItem {
  value: any;
  label: string;
  rep?: string;
}

export interface IInputFieldWithSuggestionProps extends IFieldProps {
  leftIcon?: IconName;
  rightElement?: JSX.Element;
  round?: boolean;
  fill?: boolean;
  tipLabel?: string;
  upperCaseFormat?: boolean;
  inputRef?: any;
  options?: IItem[];
}

export interface IState {
  start: number;
  end: number;
  displayPopover: boolean;
}

@observer
export class VInputFieldWithSuggestions extends React.Component<
  IInputFieldWithSuggestionProps,
  IState
> {
  inputRef: any;
  constructor(props: IInputFieldWithSuggestionProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      start: 1,
      end: 1,
      displayPopover: false
    };
    this.inputRef = props.inputRef ? props.inputRef : React.createRef();
  }

  handleClick = (value: string) => {
    this.onClickedOption(value);
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
      onBlur
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
      <StyledPopoverContainer style={{ width: '100%' }}>
        <StyledPopover
          boundary="viewport"
          canEscapeKeyClose={true}
          hasBackdrop={false}
          modifiers={{
            flip: { enabled: true },
            keepTogether: { enabled: true },
            preventOverflow: { enabled: true }
          }}
          position={'bottom-left'}
          usePortal={true}
          portalClassName="foo"
          enforceFocus={false}
          minimal
          content={
            <Menu>
              {(this.props.options &&
                this.props.options.filter(
                  item =>
                    !this.valueField || item.label.includes(this.valueField)
                ).length > 0 &&
                this.props.options
                  .filter(
                    item =>
                      !this.valueField || item.label.includes(this.valueField)
                  )
                  .map(item => (
                    <MenuItem
                      popoverProps={{
                        hoverCloseDelay: 400,
                        captureDismiss: true
                      }}
                      active={false}
                      disabled={this.props.disabled}
                      label={item.rep}
                      key={item.value}
                      text={item.label}
                      onClick={() => {
                        this.handleClick(item.label);
                      }}
                    />
                  ))) || (
                <MenuItem
                  popoverProps={{
                    hoverCloseDelay: 400,
                    captureDismiss: true
                  }}
                  active={false}
                  disabled={true}
                  key={'No Result'}
                  text={'No Result'}
                />
              )}
            </Menu>
          }
        >
          <StyledInput
            className={className}
            disabled={disabled}
            inline={inline}
            intent={
              fieldState && fieldState.hasError ? Intent.DANGER : Intent.NONE
            }
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
                  fieldState && fieldState.hasError
                    ? Intent.DANGER
                    : Intent.NONE
                }
                style={{
                  paddingRight: 10,
                  textTransform: this.props.upperCaseFormat
                    ? 'uppercase'
                    : 'none'
                }}
                onPaste={e => {
                  const oldValue =
                    e && e.currentTarget && e.currentTarget.value;
                  const newValue =
                    e && e.clipboardData && e.clipboardData.getData('Text');
                  if (this.props.onPaste) {
                    this.props.onPaste(oldValue, newValue);
                  }
                }}
                onFocus={() => {
                  this.setState({ displayPopover: true });
                }}
                onBlur={() => {
                  this.setState({ displayPopover: false });
                  onBlur && onBlur();
                }}
              />
            </FormFieldContainer>
          </StyledInput>
        </StyledPopover>
      </StyledPopoverContainer>
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
    if (this.props.upperCaseFormat) {
      this.setState({
        start: e.target.selectionStart,
        end: e.target.selectionEnd
      });
    }

    const parsedValue =
      (this.props.upperCaseFormat && e.target.value.toString().toUpperCase()) ||
      e.target.value;
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
  };

  onClickedOption = (value: string) => {
    const parsedValue =
      (this.props.upperCaseFormat &&
        `${value || ''}`.toString().toUpperCase()) ||
      `${value || ''}`;
    if (this.props.fieldState) {
      this.props.fieldState.onChange(parsedValue);
    }
    if (this.props.onChange) {
      this.props.onChange(parsedValue);
    }
  };
}

const StyledPopover = styled(Popover)`
  & .bp3-popover {
    position: relative;
    top: -13px;
    left: -4px;
  }
`;

const StyledPopoverContainer = styled.div`
  & .bp3-popover-wrapper {
    width: 100%;
    & .bp3-popover-target {
      width: 100%;
    }
  }
`;
