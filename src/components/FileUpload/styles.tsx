import styled from 'styled-components';
import { Dialog } from '@blueprintjs/core';
import { NoFocusMenu } from '../SelectionList/style';

export const OptionsMenu = styled(NoFocusMenu)`
  display: flex;
  width: fit-content;
  min-width: 50px;
`;

export const StyledDialog = styled(Dialog)`
  height: 380px;
  width: 340px;
`;

export const DivContainerTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
`;

export const FileNameContainer = styled.div`
  width: 320px;
  display: flex;
  justify-content: space-between;
  & .bp3-form-group {
    width: 100%;
  }
`;

export const FileExtSpan = styled.span`
  margin-left: 6px;
  line-height: 30px;
  height: 30px;
  font-weight: 600;
`;

export const PreviewContainer = styled.div`
  border: 1px solid #5c7080;
  overflow: hidden;
  border-radius: 5px;
  width: 320px;
  height: 240px;
  background: #a9a9a9b0;
`;

export const ButtonsRowContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  & button {
    flex-grow: 1;
  }
`;
