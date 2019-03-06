import styled from 'styled-components';

export interface IStyledCheckbox {
  backgroundColor?: string;
}

export const CheckboxCell = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  
  & .bp3-control.bp3-disabled {
    cursor: cell!important;
  }

  & .bp3-control input:checked ~ .bp3-control-indicator {
    background-color: ${(prop: IStyledCheckbox) =>
      prop.backgroundColor ? prop.backgroundColor : '#137cbd'};
  }


& .bp3-control input:disabled ~ .bp3-control-indicator {
 
    cursor: cell; 
}
  & .bp3-control input:not(:disabled):active:checked ~ .bp3-control-indicator {
    background: ${(prop: IStyledCheckbox) =>
      prop.backgroundColor ? prop.backgroundColor : '#137cbd'} !important;
  }

  & span:focus {
    outline: none;
    outline-offset: 0;
    -moz-outline-radius: 6px;
  }
`;
