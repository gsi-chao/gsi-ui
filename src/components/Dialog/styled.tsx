import styled from 'styled-components';
import { Dialog } from '@blueprintjs/core';
import { PropsWithChildren } from 'react';
import { BLUEPRINTJS_CLASS_PREFIX } from '../commons/constants';

interface IDialogProps {
  width?: number;
  height?: number;
}

export const DialogStyled = styled<PropsWithChildren<any>>(Dialog)`
  margin: 0px;
  width: ${(props: IDialogProps) => `${props.width}px!important`};
  height: ${(props: IDialogProps) => `${props.height}px!important`};
  &
    > .${BLUEPRINTJS_CLASS_PREFIX}-dialog-container.${BLUEPRINTJS_CLASS_PREFIX}-overlay-content.${BLUEPRINTJS_CLASS_PREFIX}-overlay-enter-done:focus {
    outline: rgba(255, 255, 255, 0) auto 2px;
    outline-offset: 2px;
    -moz-outline-radius: 6px;
  }
  & .move-dialog-header {
    cursor: move;
  }
`;
