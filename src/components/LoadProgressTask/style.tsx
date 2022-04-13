import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { Dialog, ProgressBar } from '@blueprintjs/core';

export const SDialog = styled<PropsWithChildren<any>>(Dialog)`
  width: 200px;
  position: relative;
  min-height: 80px;
  padding: 15px;
  & .bp3-dialog-header {
    padding-right: 0px;
    padding-left: 0px;
    text-align: center;
    min-height: 30px;
    & .bp3-heading {
      margin-right: 0px;
      font-size: 14px;
    }
  }
`;

export const SProgressBar = styled<PropsWithChildren<any>>(ProgressBar)``;
