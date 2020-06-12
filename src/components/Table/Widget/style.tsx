import styled from 'styled-components';
import { Tooltip } from '@blueprintjs/core';

interface IProps {
  backgroundColor?: string;
  color?: string;
}

export const CenterWidget = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${(props: IProps) =>
    props.backgroundColor ? props.backgroundColor : 'transparent'};
  color: ${(props: IProps) => (props.color ? props.color : 'black')};
`;

export const TooltipsWidgetsColor = styled(Tooltip)`
  width: 100% !important;

  & span.bp3-popover-target {
    width: 100% !important;
  }
`;
