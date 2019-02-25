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
  border-bottom: ${(props: ITabsPanelStyle) =>
      props.borderBottom ? props.borderBottom : 2}px
    solid;
  border-bottom-color: ${(props: ITabsPanelStyle) =>
    props.activeColor ? props.activeColor : '#21bdb5'};
`;

export const LabelIcon = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px 0 0;
  border-width: 1px 1px 0 1px;
  border-style: solid;
  padding: 8px 30px;
  cursor: pointer;
  border-radius: 8px 8px 0 0;
  border-color: ${(props: ITabsPanelStyle) =>
    props.borderColor ? props.borderColor : '#dbdcdd'};
  background-color:${(props: ITabsPanelStyle) => {
    if (props.active) {
      if (props.activeColor) {
        return props.activeColor;
      }
      return '#21bdb5';
    }
  }};
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
  border-color: ${(props: ITabsPanelStyle) =>
    props.borderColor ? props.borderColor : '#dbdcdd'};
  padding: ${(props: ITabsPanelStyle) => {
    console.log(props.padding);
    return props.padding ? props.padding : '25px';
  }};
  border-radius: 0 1px 2px 2px;
`;
