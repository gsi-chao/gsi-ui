import styled from 'styled-components';
import { FormGroup } from '@blueprintjs/core';
import { ILayer } from './ILayer';

export interface IStyledFieldProps {
  inline?: boolean;
  layer: any;
  fill?: boolean;
  checkBoxAtLeft?: boolean;
  noLabel?:boolean;
}

export const layerInPercent = (layer: ILayer): any => {
  console.log(layer);
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
    const { layer, noLabel, checkBoxAtLeft, inline } = props;
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
            .gsi-error-span {
                font-size: 12px;
                color: #e21a1a;
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
                
            }
        }          
`;
  }}
`;
export const StyledInput = styled(StyledFormGroup)`
  & .bp3-form-content {
    & .gsi-form-field-container {
      & .bp3-input-group {
        ${(props: IStyledFieldProps) =>
          props.fill ? `width: ${100}%` : `max-width: 200px!important;`};
        & input {
          width: 100%;
        }
      }
    }
  }
`;

export const StyledSelect = styled(StyledFormGroup)`
  & .bp3-form-content {
    & .gsi-form-field-container {
      & .bp3-input-group {
        ${(props: IStyledFieldProps) =>
          props.fill ? `width: ${100}%` : `max-width: 200px!important;`};
        & select {
          width: 100%;
        }
      }
    }
  }
`;

export const StyledNumericInput = styled(StyledFormGroup)`
  & .bp3-form-content {
    & .gsi-form-field-container {
      & .bp3-control-group.bp3-numeric-input {
        ${(props: IStyledFieldProps) =>
          props.fill ? `width: ${100}%` : `max-width: 200px!important;`};
        & .bp3-input-group {
          width: 100% !important;
        }
      }
    }
  }
`;

export const StyledCheckBoxInput = styled(StyledFormGroup)`
  & .bp3-form-content {
    & label.field-label {
      padding-left: ${(props: IStyledFieldProps) =>
        props.checkBoxAtLeft &&
        props.layer &&
        (props.layer.labelOrientation === 'start' ||
          !props.layer.labelOrientation)
          ? 12
          : 0}px !important;
    }
    & .gsi-form-field-container {
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
              : props.layer.inputOrientation === 'end'
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
  & .bp3-form-content {
    & .gsi-form-field-container {
      & .bp3-input.bp3-tag-input {
        ${(props: IStyledFieldProps) =>
          props.fill ? `width: ${100}%` : `max-width: 200px!important;`};
      }
    }
  }
`;

export const StyledTextArea = styled(StyledFormGroup)`
  & .bp3-form-content {
    & .gsi-form-field-container {
      & textarea {
        ${(props: IStyledFieldProps) =>
          props.fill ? `width: ${100}%` : `max-width: 200px!important;`};
      }
    }
  }
`;

export const StyledSlider = styled(StyledFormGroup)`
  & .bp3-form-content {
    & .gsi-form-field-container {
      & .bp3-slider {
        margin-left: 9px;
        ${(props: IStyledFieldProps) =>
          props.fill
            ? `width: calc(100% - 21px)!important;`
            : `max-width: 200px!important;`};
      }
    }
  }
`;

export const StyledPopOverWrapper = styled(StyledFormGroup)`
  & .bp3-form-content {
    & .gsi-form-field-container {
      & .bp3-popover-wrapper {
        ${(props: IStyledFieldProps) =>
          props.fill
            ? `width: calc(100% - 21px)!important;`
            : `max-width: 200px!important;`};
        & .bp3-popover-target {
          width: 100%;
          div {
            button {
              width: 100%;
              display: flex;
              justify-content: space-between;
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
