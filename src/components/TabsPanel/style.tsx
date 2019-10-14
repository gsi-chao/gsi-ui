import styled from 'styled-components';
import { ITabsPanelStyle } from './types';

export const constStyle = {
  borderColor: '',
  activeColor: '',
  activeTextColor: ''
};

export const ContainerTabsPanel = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ContainerTabs = styled.div`
  display: flex;
  ${(props: ITabsPanelStyle) => (props.borderBottom ? '' : '')}
`;
export const TabsSpaceFiller = styled.div`
  flex-grow: 1;
  border-bottom: ${(props: ITabsPanelStyle) =>
      props.borderBottom ? props.borderBottom : 2}px
    solid;
  border-bottom-color: ${(props: ITabsPanelStyle) =>
    props.lineColor ? props.lineColor : 'rgba(142,142,142,0.36)'};
`;

export const LabelIcon = styled.div`
  display: flex;
  align-items: center;
  border-style: solid;
  height: 100%;
  padding:${(props: ITabsPanelStyle) =>
    props.size === 'small' ? '6px 15px' : '8px 20px'} ;
  cursor: pointer;
  border-style: solid;
  border: none;
  ${(props: ITabsPanelStyle) =>
    props.active
      ? `
      ${
        props.backgroundColor
          ? `background-color: ${props.backgroundColor};`
          : ''
      }
  border-bottom: ${
        props.activeBorderColor
          ? `2px solid ${props.activeBorderColor} !important`
      : '2px solid #3d3e3e !important'
          };
      top: 2px;
      position: relative;
      padding-bottom: 10px;
  `
      : `
    border-width: 0;
    background-color: transparent;
    `}
  & > span{
  ${(props: ITabsPanelStyle) =>
    props.active && props.activeTextColor
      ? `color:${props.activeTextColor}!important;`
      : ''};
  ${(props: ITabsPanelStyle) =>
    !props.active && props.textColor
      ? `color:${props.textColor}!important;`
      : ''};
  }
}`;

export const ContainerContent = styled.div`
  border-width: 0 1px 1px 1px;
  border-style: solid;
  ${(props: ITabsPanelStyle) =>
    props.backgroundColor ? `background-color: ${props.backgroundColor};` : ''};
  border-color: ${(props: ITabsPanelStyle) =>
    props.borderColor ? props.borderColor : '#dbdcdd'};
  padding: ${(props: ITabsPanelStyle) => {
    return props.padding ? props.padding : '25px';
  }};
  border-radius: 0 1px 2px 2px;
`;
