import styled from 'styled-components';
import { VInputField } from '../Form';

interface IDNDContainer {
  orientation?: 'horizontal' | 'vertical';
}
export const DNDContainer = styled.div`
  display: flex;
  align-items: normal;
  justify-content: flex-start;
  flex-direction: ${(props: IDNDContainer) =>
    props.orientation === 'horizontal' ? 'row' : 'column '};

  & > div {
    margin: 10px;
  }
`;

export const DNDItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2.5px 2px;
  text-decoration: none;
  line-height: 20px;
  color: inherit;
  user-select: none;
  & > div {
    width: 100%;
  }
  &:hover {
    background-color: rgba(167, 182, 194, 0.3);
    cursor: grabbing;
    text-decoration: none;
  }
`;

export const StyledCustomDraggableItem = styled.div`
  div > div > & {
    height: 40px;
    padding: 1px;
  }
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2px 10px !important;
  border: 1px solid #bbbdbf;
  background-color: white;
  & > div.labelsContainer {
    display: flex;
    flex-direction: column;
    & > label {
      white-space: nowrap;
      max-width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: grab;
      &.labelName {
        font-size: 0.9em;
      }
      &.labelType {
        font-size: 0.65em;
        line-height: 10px;
      }
    }
  }

  & > div.buttonsContainer {
    height: 100%;
    padding-bottom: 2px;
    display: flex;
    align-items: flex-end;
    & > .bp3-button {
      margin-right: 1px;
    }
  }
`;

export const DNDList = styled.div`
  overflow-y: auto;
  & div.dndItemSelected .customDraggable {
    background-color: rgba(104, 167, 218, 0.6);
  }
`;

export const FilterInput = styled(VInputField)`
  margin: 0 2px 2px;
`;

export interface StyledDragAndDropListContainerProps {
  sourceListBackGroundColor?: string;
}

export const StyledDivContainer = styled.div`
  width: 100%;
  height: 100%;
  &.sourceList {
    background-color: ${(props: StyledDragAndDropListContainerProps) =>
      props.sourceListBackGroundColor || `#4bacef66`};
  }
`;
