import styled from 'styled-components';

export const OrgChartContainer = styled.div`
  & .orgchart {
    background: none;
    & .lines {
      border-color: gray !important;
      & td {
        border-color: gray !important;
        & div {
          background-color: gray !important;
        }
      }
    }
    & .node {
      padding: 0;
      border: 1px solid gray;
      margin: 0 5px;
      border-radius: 5px;
      &.Terminal .title {
        background-color: #106ba3;
      }
      & .edge {
        color: #394b59cf;
        &:hover {
          color: black;
        }
      }
      &.Company .title {
        background-color: #0f9960;
      }
      & .content {
        border: none;
      }
      &:hover {
        transition: 0s;
        background-color: transparent !important;
        box-shadow: 0 1px 3px 0 #000000a1;
      }
      &.focused.Company {
        background-color: transparent !important;
        box-shadow: 0 1px 3px 0 #61dafb;
      }
    }
  }
`;
