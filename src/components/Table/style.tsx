import styled from 'styled-components';
import { Cell } from '@blueprintjs/table';

export const CellDiv = styled(Cell)`
  padding:0px & .bp3-table-cell.bp3-table-truncated-cell {
    width: 100%;
    height: 100%;
  }

  & .bp3-table-no-wrap-text {
    height: 100%;
    border-bottom: 1px solid #dfdfe0;
  }
`;
