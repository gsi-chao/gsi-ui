import styled from 'styled-components';
import { DateRangeInput } from '@blueprintjs/datetime';
import { PropsWithChildren } from 'react';
import { BLUEPRINTJS_CLASS_PREFIX } from '../../../../commons/constants';

interface IStyledDateRangeProps {
  isUserDefined?: boolean;
}

export const StyledDateRange = styled<PropsWithChildren<any>>(DateRangeInput)`
  & ul.${BLUEPRINTJS_CLASS_PREFIX}-daterangepicker-shortcuts {
    & li {
      ${(props: IStyledDateRangeProps) =>
        props.isUserDefined &&
        `
      &:not(:last-child) {
        & a {
          background-color: white !important;
          color: black !important;
        }
      }
      &:last-child {
        & a {
          background-color: #137cbd !important;
          color: white !important;
        }
      }
      `}
    }
  }
`;
