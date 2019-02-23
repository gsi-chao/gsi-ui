import { observer } from 'mobx-react';
import * as React from 'react';

/** Blueprint */
import {
  FormGroup,
  Intent,
  Alignment,
  Radio,
  RadioGroup,
  IOptionProps
} from '@blueprintjs/core';

import {IFieldProps} from "./IFieldProps";
import {IStyledFieldProps, layerInPercent, StyledFormGroup} from "./style";
import styled from "styled-components";
import { FormFieldContainer } from './FormFieldContainer';


/**
 * Field Props
 */
export interface IRadioButtonFieldProps extends IFieldProps {
  alignIndicator?: Alignment;
  rightElement?: Element;
  options: IOptionProps[];
}

/**
 * Field component. Must be an observer.
 */


export const StyledRadioButton = styled(StyledFormGroup)
    `${(props: IStyledFieldProps) => {
    const {layer} = props;
let layerPercent: any = {};
let inputOrientation = 'flex-start';
let labelWidth = undefined;
let inputWidth = undefined;
if(layer) {
    layerPercent = layer ? layerInPercent(layer) : undefined;
    inputOrientation = layer.inputOrientation === 'center' ? 'center' : layer.inputOrientation === 'end' ? 'flex-end' : 'flex-start';
    if (layerPercent) {
        labelWidth = layerPercent.labelWidth;
        inputWidth = layerPercent.inputWidth;
      }
    }
}
return`& .bp3-form-content {
  & .gsi-form-field-container {
  & div {
    display: flex;
    position: relative;
    top: -5px;
    display: flex;
    justify-content:${inputOrientation};
;
    & .bp3-control.bp3-radio.bp3-inline {
	      padding: 0 26px!important;
        width: auto!important;
        margin-right: 10px!important;
        line-height: 27px;
	  .bp3-control-indicator {
	      margin-left: -26px;
	      margin-top: 0px;
	}
	}
  }
  }
}
`;
  }}
`;

@observer
export class VRadioGroupField extends React.Component<IRadioButtonFieldProps> {
  constructor(props: IRadioButtonFieldProps) {
    super(props);
  }

  public render() {
    const {
      label,
      labelInfo,
      fieldState,
      disabled,
      inline,
      alignIndicator,
      id,
      options,
      className,
      layer
    } = this.props;

    return (
      <StyledRadioButton
        className={className}
        disabled={disabled}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
      >
        <FormFieldContainer label={label} fieldState={fieldState}>
        <RadioGroup
          name={id}
          {...{
            disabled,
            id,
            inline,
            alignIndicator
          }}
          onChange={this.onChange}
          selectedValue={fieldState.value}
          options={options}
        />
        </FormFieldContainer>
      </StyledRadioButton>
    );
  }

  onChange = (e: any) => {
    this.props.fieldState.onChange(e.target.value);
    if (this.props.onChange) {
      this.props.onChange!(e.target.value);
    }
  };
}
