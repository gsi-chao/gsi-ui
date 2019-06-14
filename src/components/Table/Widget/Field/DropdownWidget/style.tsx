import styled from 'styled-components';

export interface IProps {
  isValid: boolean;
  isDisable: boolean;
  color: string;
}
export const DropdownStyled = styled.div`
  & .bp3-icon {
    color: ${(props: IProps) => (props.isDisable ? '#adb7bf' : '#182026')};
  }

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
    cursor: ${(props: IProps) =>
      props.isDisable ? 'cell' : 'pointer'} !important;
  }
  & .bp3-button {
    padding: 0px 10px;
    min-height: 0px;
  }

  & span.bp3-button-text {
    font-size: 12px;
    color: ${(props: IProps) => props.color}!important;
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
