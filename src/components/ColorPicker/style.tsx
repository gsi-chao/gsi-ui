import { ChromePicker, SketchPicker } from 'react-color';
import styled from 'styled-components';


export interface ITypeInputColor {
  width?:number,
  height?:number,
  defaultColor?: string
}

export const SketchPickerStyled = styled(SketchPicker)`
  box-shadow: none !important;
`;

export const ChromePickerStyled = styled(ChromePicker)`
  box-shadow: none !important;
`;

export const InputColor = styled.button`
  width: ${(props: ITypeInputColor) => (props.width ? props.width : '40px')};
  height: ${(props: ITypeInputColor) => (props.height ? props.height : '40px')};
  background-color: ${(props: ITypeInputColor) =>
    props.defaultColor ? props.defaultColor : '#A1A3A2'};
  
  border: none;
`;
