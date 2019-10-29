import styled from 'styled-components';
import { VSelectionList } from '../SelectionList';
import { Button } from '@blueprintjs/core';

export interface IColStyled {
  flex: number;
}

export interface ISelectionListProps {
  height?: string;
}

export const BodyContainer = styled.div`
  padding: 15px 10px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;

  @media (max-width: 400px) {
    min-width: 100%;
  }
`;

export const ButtonsEndsContainers = styled.div`
  display: flex;
  padding: 0 5px 5px;
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
  max-width: 44%;
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
  height: ${(props: ISelectionListProps) => (props.height ? props.height : '200px')};
  overflow-x: hidden;
  overflow-y: auto;
`;

export const SelectAllButtons = styled(Button)`
  width: 100%;
`;
