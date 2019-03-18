import styled from 'styled-components';
import { VSelectionList } from '../SelectionList';
import { Button } from '@blueprintjs/core';

export interface IColStyled {
  flex: number;
}

export interface ISelectionListProps {
  height: string;
}

export const BodyContainer = styled.div`
  height: 100%;
  padding: 15px 10px 15px;
  display: flex;
`;

export const ButtonsEndsContainers = styled.div`
  display: flex;
  padding: 0 5px 5px;
  display: flex;
  align-items: end;
  justify-content: flex-end;
`;

export const FlexCol = styled.div`
  flex: ${(props: IColStyled) => props.flex || 1};
  & > h4 {
    text-align: center;
    color: #5c7080;
  }
`;

export const CentralFlexCol = styled(FlexCol)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > button {
    margin-bottom: 5px;
    position: relative;
    top: -15px;
  }
`;

export const VSelectionListStyled = styled(VSelectionList)`
  ${(props: ISelectionListProps) =>
    props.height
      ? `
      height : ${props.height};
      overflow: auto;
`
      : ''}
  margin-bottom: 10px;
`;

export const SelectAllButtons = styled(Button)`
  width: 100%;
`;
