import styled from 'styled-components';
import { Cell } from '@blueprintjs/table';

export const CellDiv = styled(Cell)`

  padding:0px !important
    
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
 & .bp3-table-truncated-text.bp3-table-no-wrap-text{
  text-align: center;
        position: relative;
    top: 50%;
    transform: translateY(-50%);
 }
`;
