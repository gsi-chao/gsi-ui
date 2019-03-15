import styled from 'styled-components';
import { Cell, ColumnHeaderCell } from '@blueprintjs/table';
import { IConfignHeader } from './TableColumn';

export interface IProps {
  isValid: boolean;
}

export const CellDiv = styled(Cell)`
  padding: 0 !important;

  ${(props: IProps) => {
    return props.isValid ? '' : 'background-color: #F5CDC9;';
  }}

  & .bp3-table-cell.bp3-table-truncated-cell {
    width: 100%;
    height: 100%;
  }

  & .bp3-table-no-wrap-text {
    height: 100%;

    width: 100%;
  }
`;

export const CellCenterText = styled(Cell)`
  & .bp3-table-truncated-text.bp3-table-no-wrap-text {
    text-align: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const ColumnHeaderCellStyled = styled(ColumnHeaderCell)`
  background-color: ${(props: IConfignHeader) =>
    props ? props.backgroundColor : 'gray'}!important;
  cursor: default;
  :hover {
    filter: brightness(75%);
  }
  ::before {
    display: none;
  }

  & div.bp3-table-th-menu-container-background {
    background: ${(props: IConfignHeader) =>
      props ? props.backgroundColor : 'gray'} !important;
  }

  & div.bp3-table-column-name-text {
    color: ${(props: IConfignHeader) =>
      props ? props.textColor : 'gray'} !important;
  }

  & div.bp3-table-reorder-handle {
    color: ${(props: IConfignHeader) =>
      props ? props.textColor : 'gray'} !important;
  }
`;

interface ITableContainer {
  height?: string;
  isEdit?: any
}

export const TableContainer = styled.div`
  width: 100%;
  min-height: ${(props: ITableContainer) =>
    props.height ? props.height : '100px'};
  height: ${(props: ITableContainer) => props.height && props.height};
  border: ${(props: ITableContainer) => props.isEdit ?'1px solid #dbdcdd':'none'} ;
  
`;
