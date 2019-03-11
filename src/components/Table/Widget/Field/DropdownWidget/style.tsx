import styled from 'styled-components';
export interface IProps {
  isValid: boolean;
}
export const DropdownStyled = styled.div`
  & .bp3-button:not([class*='bp3-intent-']) {
    ${(props: IProps) => {
      return props.isValid ? '' : 'color: #f73636;';
    }};
    box-shadow: inset 0 0 0 0px rgba(16, 22, 26, 0.2),
      inset 0 0px 0 rgba(16, 22, 26, 0.1);
    background-color: rgba(255, 255, 255, 0);
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    );
  }
  & .bp3-button {
    padding: 0px 10px;
    min-height: 0px;
  }

  & span.bp3-button-text {
    font-size: 12px;
    font-family: -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'Icons16',
      sans-serif;
  }
  & :focus {
    outline: rgba(255, 255, 255, 0.6) auto 2px;
    outline-offset: 2px;
  }
  :focus {
    outline: rgba(255, 255, 255, 0.6) auto 2px;
    outline-offset: 2px;
    -moz-outline-radius: 6px;
  }
`;
