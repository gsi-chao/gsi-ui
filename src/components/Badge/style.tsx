import styled from 'styled-components';
import { IVBadgeStyle } from './types';

export const BadgeStyle = styled.span`
  position: relative;
  cursor: default;
  &:after {
    content: attr(data-badge);
    position: absolute;
    top: -28px;
    right: -36px;
    background: ${(props: IVBadgeStyle) =>
      props.backgroundColorBadge ? props.backgroundColorBadge : 'red'};
    color: ${(props: IVBadgeStyle) =>
      props.textColorBadge ? props.textColorBadge : 'white'};
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    border-radius: 50%;
    font-size: smaller;
    cursor: default;
  }
`;
