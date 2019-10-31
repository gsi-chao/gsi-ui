import styled from 'styled-components';
import { VSelectionList } from '../SelectionList';
import { Button } from '@blueprintjs/core';
import { Scrollbar } from 'react-scrollbars-custom';

export interface IColStyled {
  flex: number;
}

export interface ISelectionListProps {
  height?: string;
}

export const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
  height: calc(100% - 45px);
  padding: 0 15px;
  @media (max-width: 500px) {
    min-width: 100%;
  }
  & .empty-container {
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0),
      0 0 0 rgba(16, 22, 26, 0);
    border-radius: 3px;
  }
  & ul {
    box-shadow: none;
    margin-bottom: 0;
  }
`;

export const ButtonsEndsContainers = styled.div`
  display: flex;
  padding: 0 5px 5px;
  justify-content: flex-end;
  height: 45px;
  background-color: rgba(235, 236, 237, 0.41);
  border-top: 1px solid rgba(235, 236, 237, 0.71);
  align-items: center;
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
  height: ${(props: ISelectionListProps) =>
    props.height ? props.height : '241px'};
`;

export const SelectAllButtons = styled(Button)`
  width: 100%;
`;

export const StyledScroll = styled(Scrollbar)`
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0),
    0 0 0 rgba(16, 22, 26, 0);
  border-radius: 3px;
`;
