import styled, { css } from 'styled-components';
import { BLUEPRINTJS_CLASS_PREFIX } from '../commons/constants';

interface ISpinnerContainer {
  color?: string;
  hasBackdrop?: boolean;
}

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props: ISpinnerContainer) => (props.hasBackdrop ? '0.8' : '1')};
  position: ${(props: ISpinnerContainer) =>
    props.hasBackdrop ? 'absolute' : 'relative'};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  overflow: hidden;
  background-color: ${(props: ISpinnerContainer) =>
    props.hasBackdrop && 'rgba(16,22,26,.1)'};
  ${(props: ISpinnerContainer) =>
    props.color &&
    css`
      .${BLUEPRINTJS_CLASS_PREFIX}-spinner
        .${BLUEPRINTJS_CLASS_PREFIX}-spinner-head {
        stroke: ${props.color};
      }
    `};
`;
