import styled from 'styled-components';
import { Cell } from '@blueprintjs/table';

export const CellDiv = styled(Cell)`
    padding:0px
    & .bp3-table-cell.bp3-table-truncated-cell{
    width:100%
     `;

//to do agregar padding
export const DropdownCell = styled.div`
  border-bottom: 1px solid #dfdfe0;
  border-right: 1px solid #dfdfe0;
 

`;


export const CheckboxCell = styled.div`
  display: flex;
  justify-content: center;
`;
