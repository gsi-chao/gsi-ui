import styled from 'styled-components';

interface ICardPanelProps {
  headerBackgroundColor?: string;
  headerColor?: string;
  backgroundColor?: string;
  height?: string;
  width?: string;
  collapse?: string;
  isopen?: string;
  transitionduration?: number;
  bodyPadding?: string;
  heigthHeaderPx?: number;
  left?: number;
  durationMs?: number;
  buttonsHeight?: number;
  buttonsJustify?: string;
}

export const VStyledCarrouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 10px;
`;

export const VStyledCarrousel = styled.div`
  overflow-x: hidden;
  width: 100%;
  & > * {
    position: relative;
    left: ${(props: ICardPanelProps) => props.left || 0}px;
    transition-property: left;
    transition-duration: ${(props: ICardPanelProps) =>
      props.durationMs || 200}ms;
    width: fit-content;
    width: -moz-fit-content;
  }
`;

export const VStyledCarrouselButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props: ICardPanelProps) =>
    props.buttonsJustify || `flex-end`};
  width: 100%;
`;
