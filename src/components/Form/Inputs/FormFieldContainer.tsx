import * as React from 'react';
import styled from 'styled-components';

export interface IFormFieldContainerProps {
  label: string | undefined;
  children: any;
  fieldState?: IFieldState;
  value?: any;
  required?: boolean;
  className?: string;
  noLabel?: boolean;
  tooltip?: string;
}

export interface IFieldState {
  error?: string;
  hasError?: boolean;
}

export const RequiredSpan = styled.span`
  margin-right: 2px;
  color: red;
`;

export class FormFieldContainer extends React.Component<
  IFormFieldContainerProps
> {
  constructor(props: IFormFieldContainerProps) {
    super(props);
  }

  render() {
    const {
      label,
      children,
      fieldState,
      required,
      noLabel,
      value,
      tooltip
    } = this.props;
    return (
      <React.Fragment>
        {!noLabel ? (
          <label className={'field-label'} title={tooltip}>
            {required ? <RequiredSpan>*</RequiredSpan> : null}
            {label}
          </label>
        ) : null}
        <div className={'gsi-form-field-container'}>
          <div className={'gsi-input-and-error-container'}>
            {children}
            {!!fieldState && fieldState.hasError ? (
              <span className={'gsi-error-span'}>{fieldState.error}</span>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
