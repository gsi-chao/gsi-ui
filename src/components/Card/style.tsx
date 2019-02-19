import { Card } from '@blueprintjs/core';
import styled from 'styled-components';
import { FlexJustify, HeaderOrientation } from './VCardPanel';

interface ICardPanelProps {
  headerBackgroundColor?: string;
  headerColor?: string;
  backgroundColor?: string;
  headerJustifyContent?: FlexJustify;
  height?: string;
  width?: string;
  collapse?: boolean;
  isOpen?: boolean;
  transitionDuration?: number;
  bodyPadding?: string;
  headerOrientation?: HeaderOrientation;
  headerTextJustify?: FlexJustify;
}

export const VCard = styled(Card)`
    padding: 0;
    ${(props: ICardPanelProps) =>
      props.collapse
        ? `
    transition-property: height;
    transition-duration: ${props.transitionDuration || '200'}ms;
    `
        : ''}
    ${(props: ICardPanelProps) =>
      props.collapse && !props.isOpen
        ? `height: 35px;`
        : props.collapse && props.isOpen
        ? `height: ${props.height};`
        : !props.collapse
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
  height: 35px;
  display: flex;
  align-items: center;
  padding: 0 15px;
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
  }
`;

export const VCardTextSpanContainer = styled.div`
  width: 100%;
`;

export const VCardBody = styled.div`
  background: ${(props: ICardPanelProps) =>
    props.backgroundColor || 'transparent'};
  padding: ${(props: ICardPanelProps) => props.bodyPadding || '25px'};
`;
