import { Menu, MenuItem } from '@blueprintjs/core';
import styled from 'styled-components';

export interface StyledMenuProps {
  active?: boolean;
  background?: any;
  color?: any;
  padding?: any;
  className?: string;
}

export const StyledMenuItem = styled(MenuItem)`
  ${(props: StyledMenuProps) => {
    const { active, background, color } = props;
    return active
      ? `background: ${background}!important;
         color: ${color}!important;`
      : '';
  }}
  margin-bottom: 2px;
`;

export const StyledMenu = styled(Menu)`
  ${(props: StyledMenuProps) => {
    const { padding } = props;
    return padding ? `padding: ${padding}!important;` : '';
  }}
`;
