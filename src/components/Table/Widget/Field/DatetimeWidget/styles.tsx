import styled from 'styled-components';

export const DatetimeCell = styled.div`
  padding: 0px;
  border-bottom: none;

  & span.bp3-popover-target {
    display: inline-block;
    width: 100%;
  }

  .bp3-input-group {
    display: block;
    position: relative;

    border-right: 1px solid #dfdfe0 !important;
  }

  .bp3-input:focus,
  .bp3-input.bp3-active {
    box-shadow: 0 0 0 0 rgba(19, 124, 189, 0), 0 0 0 0 rgba(19, 124, 189, 0),
      inset 0 0 0 0px rgba(16, 22, 26, 0.15),
      inset 0 0px 0px rgba(16, 22, 26, 0.2);
  }

  .bp3-input {
    outline: none !important;
    border: none !important;
    border-radius: 0px !important;
    box-shadow: 0 0 0 0 rgba(19, 124, 189, 0), 0 0 0 0 rgba(19, 124, 189, 0),
      inset 0 0 0 0px rgba(16, 22, 26, 0.15),
      inset 0 0px 0px rgba(16, 22, 26, 0.2);
    background: #ffffff;
    height: 30px;
    padding: 0 10px;
    vertical-align: middle;
    line-height: 30px;
    color: #182026;
    font-size: 13px;
    font-weight: 400;
    transition: box-shadow 100ms cubic-bezier(0.4, 1, 0.75, 0.9);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 17px !important;
  }
`;
