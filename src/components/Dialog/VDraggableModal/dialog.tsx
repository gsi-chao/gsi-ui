import styled from 'styled-components';
import { Dialog } from '@blueprintjs/core';

export const DialogDS = styled(Dialog)`
  width: auto;
  max-height: 100%;
  overflow: hidden;
  padding-bottom: 0;
  margin: 0;

  /* @media (max-width: 450px) {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    margin: 0;
    
  } */
`;

interface IDialogBodyContainer {
  buttonHeight: string;
}

export const DialogBodyContainer = styled.div`
  width: 100%;
  padding: ${(props: IDialogBodyContainer) =>
    !!props.buttonHeight ? '0px' : '5px'};
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  height: calc(
    100% -
      ${(props: IDialogBodyContainer) =>
        props.buttonHeight ? props.buttonHeight : '45px'}
  );
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

export const RisizeContainer = styled.div`
  & > .ant-design-draggable-modal-resize-handle-inner {
    width: 12px;
    right: 14px;
    border: 2px solid grey;
    height: 12px;
    bottom: 14px;
    position: absolute;
    border-top: 0;
    border-left: 0;
  }

  & > .ant-design-draggable-modal-resize-handle {
    right: -10px;
    width: 44px;
    bottom: -10px;
    cursor: se-resize;
    height: 44px;
    position: absolute;
  }
`;
