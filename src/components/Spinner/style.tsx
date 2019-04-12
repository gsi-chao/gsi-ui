import styled from 'styled-components';

interface ISpinnerContainer {
  color?: string;
}

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props: ISpinnerContainer) =>
    props.color &&
    `
  .bp3-spinner .bp3-spinner-head{
      stroke: ${props.color}
  }
  `};
`;
