import styled from "styled-components";
import {FormGroup} from "@blueprintjs/core";
import {ILayer} from "./ILayer";

export interface IStyledFieldProps {
    inline?: boolean;
    layer: any;
    fill?: boolean,
}

export const layerInPercent = (layer: ILayer): any => {
    return {
        containerWidth: layer.containerWidth ? layer.containerWidth / 12 * 100 : undefined,
        inputWidth: layer.inputWidth ? layer.inputWidth / 12 * 100 : undefined,
        labelWidth: layer.labelWidth ? layer.labelWidth / 12 * 100 : undefined
    }
};

export const StyledFormGroup = styled(FormGroup)`
   ${(props: IStyledFieldProps) => {
    const {layer, fill} = props;
    let layerPercent: any = {};
    let inputOrientation = 'flex-start';
    let containerWidth = undefined;
    let labelWidth = undefined;
    let labelOrientation = undefined;
    let inputWidth = undefined;
    if(layer) {
        layerPercent = layer ? layerInPercent(layer) : undefined;
        inputOrientation = layer.inputOrientation === 'center' ? 'center' : layer.inputOrientation === 'end' ? 'flex-end' : 'flex-start';
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
            flex-direction:${(props: IStyledFieldProps) => props.inline ? `row;
            align-content: center;` : 'column'}
            ${containerWidth 
                ? `width: ${containerWidth}%!important;` 
                : 'width: 100%!important;'}
                & label {
                    margin-right: 7px;
                    line-height: 30px;
                    ${labelWidth 
                        ? `width: ${labelWidth}%!important;`: ''}
                    ${labelOrientation ?
                        `text-align: ${labelOrientation}`
                        :''}
                }
                & .bp3-input-group {
                    width: ${inputWidth ? `${inputWidth}`: `${100 - labelWidth}`}%!important;
                    ${inputOrientation ? 
                        `display:flex;
                         justify-content:${inputOrientation};   
                        `
                        : ''}
                    & input, select {
                        width: ${fill ? `100%` : `auto`};
                    }
                }
                & .bp3-control-group.bp3-numeric-input {
                    width: ${inputWidth ? `${inputWidth}`: `${100 - labelWidth}`}%!important;
                    display: flex;
                    justify-content:${inputOrientation};
                    & .bp3-input-group {
                        width: auto!important;
                        ${fill ? `
                            width: calc(100% - 29px)!important;
                            & input {
                                width: 100%!important;
                            }
                            ` : ''}
                    } 
                    
                }
                & .bp3-popover-wrapper {
                    width: ${inputWidth ? `${inputWidth}`: `${100 - labelWidth}`}%!important;
                    display: flex;
                    justify-content:${inputOrientation};
                }
                & textarea {
                    width: ${fill ? `${100 - labelWidth}%` : `auto`};
                    display: flex;
                    justify-content:${inputOrientation};
                }
                & .bp3-slider {
                    width: ${fill ? `${100 - labelWidth}%` : `auto`};
                    margin-left: 5px;
                    display: flex;
                    justify-content:${inputOrientation};
                }
                & .bp3-input,.bp3-tag-input {
                    width: ${fill ? `${100 - labelWidth}%`: `auto`};
                    display: flex;
                    justify-content:${inputOrientation};
                }
                
        }          
`;
}}
`;