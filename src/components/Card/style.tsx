import { Card } from '@blueprintjs/core';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { FlexJustify, HeaderOrientation } from './types';

interface ICardPanelProps {
  headerBackgroundColor?: string;
  headerColor?: string;
  backgroundColor?: string;
  headerJustifyContent?: FlexJustify;
  height?: string;
  width?: string;
  collapse?: string;
  isopen?: string;
  transitionduration?: number;
  bodyPadding?: string;
  headerOrientation?: HeaderOrientation;
  headerTextJustify?: FlexJustify;
  headerTextUppercase?: boolean;
  headerTextBold?: boolean;
  heigthHeaderPx?: number;
}

export const VCard = styled<PropsWithChildren<any>>(Card)`
    padding: 0!important;
    ${(props: ICardPanelProps) =>
      props.collapse === 'true'
        ? `
    transition-property: height;
    transition-duration: ${props.transitionduration || '200'}ms;
    `
        : ''}
    ${(props: ICardPanelProps) =>
      props.collapse === 'true' && props.isopen === 'false'
        ? `height: 35px;`
        : props.collapse === 'true' && props.isopen === 'true'
        ? `height: ${props.height};`
        : props.collapse !== 'true'
        ? `height: ${props.height};`
        : ''}
    
    ${(props: ICardPanelProps) => (props.width ? `width: ${props.width};` : '')}
`;

export const VCardHeader = styled.div`
  border-radius: 3px 3px 0 0;
  flex-direction: ${(props: ICardPanelProps) =>
    props.headerOrientation || 'row'};
  background: ${(props: ICardPanelProps) =>
    props.headerBackgroundColor || '#E8E8E8'};
  justify-content: ${(props: ICardPanelProps) =>
    props.headerJustifyContent === 'center'
      ? 'center'
      : props.headerJustifyContent === 'end'
      ? 'flex-end'
      : 'flex-start'};
  height: ${(props: ICardPanelProps) =>
    props.heigthHeaderPx ? `${props.heigthHeaderPx}px` : '35px'};
  display: flex;
  align-items: center;
  padding: 0 15px;
  width: 100%;
  position: relative;
`;

export const VCardTextSpan = styled.span`
  height: 100%;
  color: ${(props: ICardPanelProps) => props.headerColor || '#5D5D5D'};
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: ${(props: ICardPanelProps) =>
    props.headerTextJustify === 'center'
      ? 'center'
      : props.headerTextJustify === 'end'
      ? 'flex-end'
      : 'flex-start'};
  & span {
    margin: 0 5px 0 0;
    font-weight: ${(props: ICardPanelProps) =>
      props.headerTextBold ? 600 : 400};
    text-transform: ${(props: ICardPanelProps) =>
      props.headerTextUppercase && 'uppercase'};
  }
`;

export const VCardTextSpanContainer = styled.div`
  flex: 1;
  width: 100%;
`;

export const VCardBody = styled.div`
  height: calc(100% - 35px);
  background: ${(props: ICardPanelProps) =>
    props.backgroundColor || 'transparent'};
  padding: ${(props: ICardPanelProps) => props.bodyPadding || '15px'};
`;
