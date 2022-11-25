import styled from 'styled-components';
import { BLUEPRINTJS_CLASS_PREFIX } from '../commons/constants';
import { ITabsMenuStyle } from './types';

export const TabsStyle = styled.div`
  & .${BLUEPRINTJS_CLASS_PREFIX}-tab {
    color: ${(prop: ITabsMenuStyle) => prop.color && prop.color};
  }
  & :hover {
    color: ${(prop: ITabsMenuStyle) => prop.hoverColor && prop.hoverColor};
  }
  .${BLUEPRINTJS_CLASS_PREFIX}-tab-indicator {
    background-color: ${(props: ITabsMenuStyle) =>
      props.indicatorActive && props.indicatorActive};
  }
  & :focus {
    outline: none;
  }
  .${BLUEPRINTJS_CLASS_PREFIX}-tab[aria-selected='true'] {
    color: ${(prop: ITabsMenuStyle) => prop.active && prop.active};
  }
`;

export const TabIcon = styled.div`
  display: flex;
`;

export const labelIcon = {
  display: 'flex',
  alignItems: 'center',
  margin: '0 5px 0 0'
};
