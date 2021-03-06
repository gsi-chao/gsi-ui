import { ChromePicker, SketchPicker } from 'react-color';
import styled from 'styled-components';

export interface ITypeInputColor {
  width?: number;
  height?: number;
  defaultColor?: any;
  disable?: boolean;
}

export const SketchPickerStyled = styled(SketchPicker)`
  box-shadow: none !important;
  & > div:nth-child(2) {
    & > div:first-child {
      & > div:first-child {
        height: 24px !important;
        & > div:first-child {
          & > div:first-child {
            & > div:last-child {
              & > div:first-child {
                height: 21px !important;
              }
            }
          }
        }
      }
      & > div:last-child {
        display: none;
      }
    }
  }
`;

export const ChromePickerStyled = styled(ChromePicker)`
  box-shadow: none !important;
`;

export const InputColor = styled.button`
  width: ${(props: ITypeInputColor) =>
    props.width ? `${props.width}px` : '40px'};
  height: ${(props: ITypeInputColor) =>
    props.height ? `${props.height}px` : '40px'};
  background: ${(props: ITypeInputColor) =>
    props.defaultColor && props.defaultColor};
  display: flex;
  border: solid 1px gray;
  border-radius: 7px;
  cursor: ${(props: ITypeInputColor) =>
    props.disable ? 'not-allowed' : 'default'};
`;
