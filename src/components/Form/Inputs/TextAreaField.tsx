import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
import { FormGroup, Intent, TextArea } from '@blueprintjs/core';
/** FieldState */

import { IFieldProps } from './IFieldProps';
import { StyledTextArea } from './style';

import { FormFieldContainer } from './FormFieldContainer';

/**
 * Field Props
 */

/**
 * Field component. Must be an observer.
 */

export interface ITextAreaFieldProps extends IFieldProps {
  fill?: boolean;
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
      layer,
      noLabel
    } = this.props;

    return (
      <StyledTextArea
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        layer={layer}
        labelInfo={labelInfo}
        fill={fill}
        noLabel={noLabel}
      >
        <FormFieldContainer
          noLabel={noLabel}
          label={label}
          fieldState={fieldState}
        >
          <TextArea
            large={size === 'large'}
            small={size === 'small'}
            onChange={this.onChange}
            value={fieldState.value || ''}
            intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
            name={id}
            {...{
              disabled,
              id
            }}
          />
        </FormFieldContainer>
      </StyledTextArea>
    );
  }
  onChange = (e: any) => {
    this.props.fieldState.onChange(e.target.value);
    if (this.props.onChange) {
      this.props.onChange!(e.target.value);
    }
  };
}
