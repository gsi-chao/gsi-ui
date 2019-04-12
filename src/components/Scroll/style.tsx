import styled from 'styled-components';

interface ICardPanelProps {
  buttonsJustify?: string;
  height?: string;
  width?: string;
}

export const VStyledCarrouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${(props: ICardPanelProps)=> props.height ? `height: ${props.height};` : ''}
  ${(props:ICardPanelProps) => props.width ? `width:${props.width};` : `width: 100%;`};
  padding: 0 10px;
`;

export const VStyledCarrousel = styled.div`
  height: 100%;
  overflow-x: hidden;
  width: 100%;
`;

export const VStyledCarrouselButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props: ICardPanelProps) =>
    props.buttonsJustify || `flex-end`};
  width: 100%;
`;
