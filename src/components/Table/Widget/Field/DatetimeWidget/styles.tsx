import styled from 'styled-components';

export const DatetimeCell = styled.div`
  padding: 23px;
  border-bottom: none;
  max-width: 145px;

  & span.bp3-popover-target {
    display: inline-block;
    width: 100%;
  }

  .bp3-input-group {
    display: block;
    position: relative;

    border-right: none;
  }

  & .bp3-input:disabled {
    cursor: cell;
  }

  & .bp3-input-group.bp3-disabled {
    cursor: cell;
  }

  & .bp3-input-group {
    cursor: cell;
  }
  .bp3-input:focus,
  .bp3-input.bp3-active {
    box-shadow: 0 0 0 0 rgba(19, 124, 189, 0), 0 0 0 0 rgba(19, 124, 189, 0),
      inset 0 0 0 0 rgba(16, 22, 26, 0.15), inset 0 0 0 rgba(16, 22, 26, 0.2);
  }

  .bp3-input {
    outline: none !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: 0 0 0 0 rgba(19, 124, 189, 0), 0 0 0 0 rgba(19, 124, 189, 0),
      inset 0 0 0 0 rgba(16, 22, 26, 0.15), inset 0 0 0 rgba(16, 22, 26, 0.2);
    background: #ffffff;
    padding: 0 10px;
    vertical-align: middle;
    line-height: 30px;
    color: #182026;
    font-size: 12px;
    font-family: -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'Icons16',
      sans-serif;
    font-weight: 400;
    transition: box-shadow 100ms cubic-bezier(0.4, 1, 0.75, 0.9);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 17px !important;
  }
`;
