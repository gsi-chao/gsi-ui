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

/**
 * Field Props
 */
export interface IRadioButtonFieldProps extends IFieldProps{
  alignIndicator?: Alignment;
  rightElement?: Element;
  options: IOptionProps[];
}

/**
 * Field component. Must be an observer.
 */

export const StyledRadioButton = styled(StyledFormGroup)
    `${(props: IStyledFieldProps) => {
    const {layer, fill} = props;
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
return`& .bp3-form-content {
  & label {
    line-height: 43px;
  }
  & div {
    display: flex;
    position: relative;
    top: -5px;
    width: ${inputWidth ? `${inputWidth}`: `${100 - labelWidth}`}%!important;
                    display: flex;
                    justify-content:${inputOrientation};
;
    & label {
      width:auto!important;
      
    }
  }
}
`;}}`;

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
        helperText={fieldState.hasError && fieldState.error}
        inline={inline}
        intent={fieldState.hasError ? Intent.DANGER : Intent.NONE}
        labelFor={id}
        labelInfo={labelInfo}
        layer={layer}
      >
          <label>{label}</label>
        <RadioGroup
          name={id}
          {...{
            disabled,
            id,
            inline,
            alignIndicator
          }}
          onChange={(e: any) => fieldState.onChange(e.target.value)}
          selectedValue={fieldState.value}
          options={options}
        />
      </StyledRadioButton>
    );
  }
}
