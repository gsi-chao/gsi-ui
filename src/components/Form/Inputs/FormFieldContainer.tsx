import * as React from 'react';

export interface IFormFieldContainerProps {
  label: string | undefined;
  children: any;
  fieldState: IFieldState;
  className?: string

}

export interface IFieldState {
  error?: string;
  hasError?: boolean;
}

export class FormFieldContainer extends React.Component<IFormFieldContainerProps> {
  constructor(props: IFormFieldContainerProps) {
    super(props);
  }

  render() {
    const {label,children, fieldState } = this.props;
    return(
      <React.Fragment>
        <label className={'field-label'}>{label}</label>
      <div className={'gsi-form-field-container'}>
        {children}
        { fieldState.hasError ?
          <span className={'gsi-error-span'}>{ fieldState.error}</span> : null
        }
      </div>
      </React.Fragment>
    );
  }
}