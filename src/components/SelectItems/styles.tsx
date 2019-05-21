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
  align-items: center;
  justify-content: center;
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
  height: 100%;
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
  margin-bottom: 10px;
  ${(props: ISelectionListProps) =>
    props.height
      ? `
      height : ${props.height};
      overflow: auto;
`
      : ''}
`;

export const SelectAllButtons = styled(Button)`
  width: 100%;
`;
