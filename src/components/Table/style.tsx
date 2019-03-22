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
  isEdit?: any;
  outlineRow?: boolean
}

export const TableContainer = styled.div`
  width: 100%;
  min-height: ${(props: ITableContainer) =>
  props.height ? `${props.height}px` : '100px'};
  height: ${(props: ITableContainer) => props.height && `${props.height}px`};
  border: ${(props: ITableContainer) =>
  props.isEdit ? '1px solid #dbdcdd' : 'none'};
  
  & .bp3-table-cell{
    box-shadow: none !important;
  }
  & .bp3-table-cell-ledger-even{
    background-color: rgba(220,220,221,0.49)!important;
    border-bottom: 1px solid rgba(128,128,128,0.11);
  }
  
   & .bp3-table-cell-ledger-odd{
   
    border-bottom: 1px solid white !important;
  }
  
  & .bp3-table-column-headers .bp3-table-header{
    min-height: 35px;
    line-height: 35px;
    box-shadow: none;
  }
  & .bp3-table-quadrant-top-left .bp3-table-header.bp3-table-last-in-row{
    box-shadow: 0 0px 0 rgba(16, 22, 26, 0.15), inset -3px 0 0 rgba(16, 22, 26, 0.15) !important;
  }
`;
