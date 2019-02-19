import styled from 'styled-components';

export const DropdownStyled = styled.div`
      & .bp3-button:not([class*='bp3-intent-']) {
        box-shadow: inset 0 0 0 0px rgba(16, 22, 26, 0.2),
          inset 0 0px 0 rgba(16, 22, 26, 0.1);
        background-color: #ffffff;
        background-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.8),
          rgba(255, 255, 255, 0)
        );
      }
& .bp3-button {
    padding: 0px 10px;
    min-height: 0px;
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