import { observer } from 'mobx-react';
import * as React from 'react';
/** Blueprint */
/** FieldState */
import { Intent, Slider } from '@blueprintjs/core';

import { IFieldProps } from './IFieldProps';
import { StyledSlider } from './style';
import { FormFieldContainer } from './FormFieldContainer';


/**
 * Field Props
 */
export interface ISliderFieldProps extends IFieldProps {
  min?: number;
  max?: number;
  stepSize?: number;
  labelStepSize?: number;
  vertical?: boolean;
  fill?: boolean;
}

/**
 * Field component. Must be an observer.
 */

@observer
export class VBasicSliderField extends React.Component<ISliderFieldProps> {
  constructor(props: ISliderFieldProps) {
    super(props);
  }

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      disabled,
      inline,
      id,
      min,
      max,
      stepSize,
      labelStepSize,
      className,
      layer,
      fill,
      noLabel
    } = this.props;

    return (
      <StyledSlider
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        fill={fill}
        layer={layer}
        noLabel={noLabel}
      >
        <FormFieldContainer noLabel={noLabel} label={label} fieldState={fieldState}>
          <Slider
            {...{
              disabled,
              id,
              min,
              max,
              stepSize,
              labelStepSize
            }}
            onChange={this.onChange}
            value={fieldState.value || 0}
          />
        </FormFieldContainer>
      </StyledSlider>
    );
  }
  
  onChange = (e: any) => {
    this.props.fieldState.onChange(e);
    if (this.props.onChange) {
      this.props.onChange!(e);
    }
  };
}
