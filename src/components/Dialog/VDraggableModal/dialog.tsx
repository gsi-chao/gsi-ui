import styled from 'styled-components';
import { Dialog } from '@blueprintjs/core';

export const DialogDS = styled(Dialog)`
  width: auto;
  max-height: 100%;
  overflow: hidden;
  padding-bottom: 0;
  margin: 0;

  @media (max-width: 450px) {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    margin: 0;
  }
`;

export const DialogBodyContainer = styled.div`
  width: 100%;
  padding: 5px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  height: calc(100% - 45px);
`;

interface IButtonsEndsContainers {
  alignIcons?: string;
  justifyIcons?: string;
}

export const DialogButtonsEndsContainers = styled.div`
  flex: 0;
  padding: 6px;
  display: flex;
  align-items: ${(props: IButtonsEndsContainers) =>
    props.alignIcons ? props.alignIcons : 'end'};
  justify-content: ${(props: IButtonsEndsContainers) =>
    props.justifyIcons ? props.justifyIcons : 'flex-end'};
  height: 45px;
  border-top: 1px solid rgba(235, 236, 237, 0.71);
`;
