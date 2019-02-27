import styled from 'styled-components';
import { FormGroup } from '@blueprintjs/core';
import { ILayer } from './ILayer';

export interface IStyledFieldProps {
  inline?: boolean;
  layer: any;
  fill?: boolean;
  checkBoxAtLeft?: boolean;
  noLabel?: boolean;
  fixedInputWidthPx?: number;
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
  ${(props: IStyledFieldProps) => {
    const { layer, noLabel, checkBoxAtLeft, inline, fill } = props;
    let layerPercent: any = {};
    let inputOrientation = 'flex-start';
    let containerWidth = undefined;
    let labelWidth = undefined;
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
                line-height: 30px;
                    ${labelWidth ? `width: ${labelWidth}%!important;` : ''}
                    ${
                      labelOrientation ? `text-align: ${labelOrientation}` : ''
                    }    
            }
            & .gsi-form-field-container {
                ${!noLabel ? `padding-left: 10px!important;` : ''}
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
                ${fill ? `width: ${100}%` : `max-width: 200px;`};
                & .gsi-error-span {
                    padding-top: 1px;
                    font-size: 12px;
                    color: #e21a1a;
                  }
            }
        }          
`;
  }}
`;
export const StyledInput = styled(StyledFormGroup)`
  .gsi-input-and-error-container {
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
              ? 9
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
      width: 100%;
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
    & .bp3-popover-wrapper {
      width: 100%;
      & .bp3-popover-target {
        width: 100%;
        div {
          button {
            width: ${(props: IStyledFieldProps) =>
              props.fixedInputWidthPx
                ? `${props.fixedInputWidthPx}px`
                : `100%`};
            display: flex;
            justify-content: space-between;
            box-shadow: none;
            background-image: none;
            background-color: #dcdcdc !important;
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
        display: flex;
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
            margin-top: 0px;
          }
        }
      }
    }
  }
`;
