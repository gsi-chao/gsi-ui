import styled from 'styled-components';

export interface IStyledCheckbox {
  backgroundColor?: string;
}

export const CheckboxCell = styled.div`
  display: flex;
  justify-content: center;
      margin-top: 10px;

  & .bp3-control input:checked ~ .bp3-control-indicator {
    background-color: ${(prop: IStyledCheckbox) =>
      prop.backgroundColor ? prop.backgroundColor : '#137cbd'};
  }

  & .bp3-control input:not(:disabled):active:checked ~ .bp3-control-indicator {
    background: ${(prop: IStyledCheckbox) =>
      prop.backgroundColor ? prop.backgroundColor : '#137cbd'} !important;
  }

  & span:focus {
    outline: none;
    outline-offset: 0px;
    -moz-outline-radius: 6px;
  }
`;
