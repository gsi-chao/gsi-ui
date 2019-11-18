import styled from 'styled-components';
import { FormGroup, Intent, Colors } from '@blueprintjs/core';
import { ILayer } from './ILayer';
import DatePicker from 'react-datepicker';
import { DateInput } from '@blueprintjs/datetime';
import MaskedInput from 'react-text-mask';
import Color from 'color';

export interface IStyledFieldProps {
  inline?: boolean;
  layer: any;
  fill?: boolean;
  checkBoxAtLeft?: boolean;
  noLabel?: boolean;
  fixedInputWidthPx?: number;
  margin?: string;
  fixedPadding?: number;
  heightArea?: number | undefined;
}

interface IIconStyle {
  backgroundColor?: string;
}

export const layerInPercent = (layer: ILayer): any => {
  return {
    containerWidth: layer.containerWidth
      ? (layer.containerWidth / 12) * 100
      : undefined,
    inputWidth: layer.inputWidth ? (layer.inputWidth / 12) * 100 : undefined,
    labelWidth: layer.labelWidth ? (layer.labelWidth / 12) * 100 : undefined
  };
};

export const StyledFormGroup = styled(FormGroup)`
  margin: ${(props: IStyledFieldProps) =>
  props.margin ? props.margin : '0 0 15px'};
  ${(props: IStyledFieldProps) => {
  const { layer, noLabel, checkBoxAtLeft, inline, fill } = props;
  let layerPercent: any = {};
  let inputOrientation = 'flex-start';
  let containerWidth = undefined;
  let labelWidth = 0;
  let labelOrientation = undefined;
  let inputWidth = undefined;
  if (layer) {
    layerPercent = layer ? layerInPercent(layer) : undefined;
    inputOrientation =
      layer.inputOrientation === 'center'
        ? 'center'
        : layer.inputOrientation === 'end'
        ? 'flex-end'
        : 'flex-start';
    labelOrientation = layer.labelOrientation;
    if (layerPercent) {
      containerWidth = layerPercent.containerWidth;
      labelWidth = layerPercent.labelWidth;
      inputWidth = layerPercent.inputWidth;
    }
  }
  return `
        & .bp3-form-content {
            display: flex;
            flex-direction:${
    inline
      ? `row${checkBoxAtLeft ? `-reverse` : ''};
            align-content: center;`
      : 'column'
    }
            ${
    containerWidth
      ? `width: ${containerWidth}%!important;`
      : 'width: 100%!important;'
    }
            & label.field-label {
                padding-right: 5px;
                line-height: 30px;
                    ${labelWidth ? `width: ${labelWidth}%!important;` : ''}
                    ${
    labelOrientation ? `text-align: ${labelOrientation}` : ''
    }    
            }
            & .gsi-form-field-container {
                ${!noLabel && inline ? `padding-left: 5px!important;` : ''}
                width: ${
    inputWidth
      ? `${inputWidth}%`
      : inputOrientation === 'flex-end'
      ? `calc(${100 - labelWidth}% - 38px)`
      : `${100 - labelWidth}%`
    }!important;
                display: flex;
                align-items:${inputOrientation};
                flex-direction: column;
                & .gsi-input-and-error-container {
                  display: flex;
                  flex-direction: column;
                ${
    fill
      ? `width: ${100}%;
                & .bp3-popover-target {
                  width: 100%;
                }
                `
      : `max-width: 200px;`
    };
                & .gsi-error-span {
                    padding-top: 1px;
                    font-size: 12px;
                    color: #e21a1a;
                    text-align: start;
                  }
            }
        }          
`;
}}
`;
export const StyledInput = styled(StyledFormGroup)`
  .gsi-input-and-error-container {
    & span.tipLabel {
      background: white;
      margin-bottom: -7px;
      z-index: 1;
      width: fit-content;
      font-weight: 400;
      font-size: 12px;
      padding: 0 2px;
    }
    & .bp3-input-group {
      width: 100%;
      & input {
        width: 100%;
      }
    }
  }
`;

export const StyledSelect = styled(StyledFormGroup)`
  .gsi-input-and-error-container {
    & .bp3-input-group {
      width: 100%;
      & select {
        width: 100%;
      }
    }
  }
`;

export const StyledNumericInput = styled(StyledFormGroup)`
  .gsi-input-and-error-container {
    & span.tipLabel {
      background: white;
      margin-bottom: -7px;
      z-index: 1;
      width: fit-content;
      font-weight: 400;
      font-size: 12px;
      padding: 0 2px;
    }
    & .bp3-control-group.bp3-numeric-input {
      width: 100%;
      & .bp3-input-group {
        width: 100% !important;
      }
    }
  }
`;

export const StyledCheckBoxInput = styled(StyledFormGroup)`
  label.field-label {
    padding-left: ${(props: IStyledFieldProps) =>
  props.checkBoxAtLeft &&
  props.layer &&
  (props.layer.labelOrientation === 'start' ||
    !props.layer.labelOrientation)
    ? 12
    : 0}px!important;
  }
  .gsi-form-field-container {
    & .gsi-input-and-error-container {
      & .bp3-control.bp3-checkbox,
      .bp3-inline.bp3-align-right {
        ${(props: IStyledFieldProps) =>
  props.checkBoxAtLeft ? '' : `padding: 0!important;`};
        width: 0 !important;
        text-align: left;
        margin-right: 0 !important;
        ${(props: IStyledFieldProps) => {
  const inputOrientation =
    props.layer && props.layer.inputOrientation === 'center'
      ? 'center'
      : props.layer && props.layer.inputOrientation === 'end'
      ? 'flex-end'
      : 'flex-start';
  return `align-self: ${inputOrientation};`;
}};
        & span.bp3-control-indicator {
          margin-left: ${(props: IStyledFieldProps) =>
  props.checkBoxAtLeft &&
  props.layer &&
  props.layer.inputOrientation === 'end'
    ? props.fixedPadding || 5
    : 0}px !important;
          float: left;
        }
      }
    }
  }
`;

export const StyledTagsInput = styled(StyledFormGroup)`
  .gsi-input-and-error-container {
    & .bp3-input.bp3-tag-input {
      width: 100%;
    }
  }
`;

export const StyledTextArea = styled(StyledFormGroup)`
  .gsi-input-and-error-container {
    & textarea {
      resize: vertical;
      width: 100%;
      ${(props: IStyledFieldProps) =>
  props.heightArea && `height: ${props.heightArea}px`}
    }
  }
`;

export const StyledSlider = styled(StyledFormGroup)`
  .gsi-input-and-error-container {
    padding-left: 9px !important;
    ${(props: IStyledFieldProps) =>
  props.fill
    ? `width: calc(100% - 21px)!important;`
    : `max-width: 200px!important;`};
    & .bp3-slider {
      width: 100%;
    }
  }
`;

export const StyledPopOverWrapper = styled(StyledFormGroup)`
  .gsi-input-and-error-container {
    ${(props: IStyledFieldProps) =>
  props.fill ? `width: 100%!important;` : `max-width: 200px!important;`};
    & span.tipLabel {
      margin-bottom: -7px;
      z-index: 1;
      width: fit-content;
      font-weight: 400;
      font-size: 12px;
      padding: 0 2px;
    }
    & .bp3-popover-wrapper {
      width: 100%;
      & .bp3-popover-target {
        width: 100%;
        div {
          & > button:not(.crossButton) {
            width: ${(props: IStyledFieldProps) =>
  props.fixedInputWidthPx
    ? `${props.fixedInputWidthPx}px`
    : `100%`};
            display: flex;
            justify-content: space-between;
            &:focus {
              outline: rgba(16, 22, 26, 0.4) auto 2px;
              outline-offset: 2px;
            }
            & span.bp3-button-text {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
`;

export const StyledRadioButton = styled(StyledFormGroup)`
  & .bp3-form-content {
    & label.field-label {
      & .gsi-form-field-container {
        & div {
          display: flex;
          position: relative;
          top: -5px;
          ${(props: IStyledFieldProps) => {
  const inputOrientation =
    props.layer && props.layer.inputOrientation === 'center'
      ? 'center'
      : props.layer.inputOrientation === 'end'
      ? 'flex-end'
      : 'flex-start';
  return `justify-content: ${inputOrientation};`;
}};
          & .bp3-control.bp3-radio.bp3-inline {
            padding: 0 26px !important;
            width: auto !important;
            margin-right: 10px !important;
            line-height: 27px;
            .bp3-control-indicator {
              margin-left: -26px;
              margin-top: 0;
            }
          }
        }
        ,
        & .bp3-control.bp3-inline {
          margin-right: 10px !important;
        }
      }
    }
  }
`;

export const IconDate = styled('div')`
  display: flex;
  background-color: ${(props: IIconStyle) =>
  props.backgroundColor ? props.backgroundColor : '#dcdcdc'};
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border: 1px solid #bdbfc0;
  border-radius: 0 3px 3px 0;
  position: absolute;
  right: 0;
`;

export const DateInputPicker = styled(DatePicker)`
  & {
    height: 30px;
    padding: 0 10px;
    vertical-align: middle;
    color: #182026;
    font-size: 14px;
    font-weight: 400;
    border: solid 1px #b6b8ba;
    border-radius: 3px;
  }
  &:focus {
    box-shadow: 0 0 0 1px #137cbd, 0 0 0 3px rgba(19, 124, 189, 0.2),
      inset 0 1px 1px rgba(16, 22, 26, 0.2);
    border: none;
  }
`;

export const DateInputContainer = styled(DateInput)`
  @-moz-document url-prefix() {
    & .bp3-html-select.bp3-minimal select {
      font-size: 12px;
    }
  }
`;

interface IMaskedInput {
  intent: Intent;
  large: string;
  disabled?: boolean;
}

export const StyledMaskInput = styled(MaskedInput)`
  width: ${(props: IMaskedInput) =>
  props.large === 'large' ? '100%' : 'auto'};
  outline: none;
  border: none;
  border-radius: 3px;
  ${(props: IMaskedInput) =>
  props.intent && props.intent !== Intent.DANGER
    ? 'box-shadow: 0 0 0 0 rgba(19, 124, 189, 0), 0 0 0 0 rgba(19, 124, 189, 0),\n    inset 0 0 0 1px rgba(16, 22, 26, 0.15),\n    inset 0 1px 1px rgba(16, 22, 26, 0.2);'
    : 'box-shadow: 0 0 0 0 rgba(219, 55, 55, 0), 0 0 0 0 rgba(219, 55, 55, 0), inset 0 0 0 1px #db3737, inset 0 0 0 1px rgba(16, 22, 26, 0.15), inset 0 1px 1px rgba(16, 22, 26, 0.2);'};

  background: ${(props: IMaskedInput) => props.disabled ? 'rgba(206, 217, 224, 0.5)' : '#ffffff'};
  box-shadow: ${(props: IMaskedInput) => props.disabled && 'none'};
  cursor: ${(props: IMaskedInput)=> props.disabled && 'not-allowed'};
  height: 30px;
  padding: 0 10px;
  vertical-align: middle;
  line-height: 30px;
  color: #182026;
  font-size: 14px;
  font-weight: 400;
  transition: box-shadow 100ms cubic-bezier(0.4, 1, 0.75, 0.9);

  &:focus {
    box-shadow: 0 0 0 1px #137cbd, 0 0 0 3px rgba(19, 124, 189, 0.3),
      inset 0 1px 1px rgba(16, 22, 26, 0.2);
  }
`;
