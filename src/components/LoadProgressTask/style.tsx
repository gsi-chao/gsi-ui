import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { Dialog, ProgressBar } from '@blueprintjs/core';
import { BLUEPRINTJS_CLASS_PREFIX } from '../commons/constants';

export const SDialog = styled<PropsWithChildren<any>>(Dialog)`
  width: 200px;
  position: relative;
  min-height: 80px;
  padding: 15px;
  & .${BLUEPRINTJS_CLASS_PREFIX}-dialog-header {
    padding-right: 0px;
    padding-left: 0px;
    text-align: center;
    min-height: 30px;
    & .${BLUEPRINTJS_CLASS_PREFIX}-heading {
      margin-right: 0px;
      font-size: 14px;
    }
  }
`;

export const SProgressBar = styled<PropsWithChildren<any>>(ProgressBar)``;
