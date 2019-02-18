import styled from 'styled-components';
import { ITabsMenuStyle } from './types';
export const TabsStyle = styled.div`
    & .bp3-tab{
    color: ${(prop: ITabsMenuStyle) => prop.color && prop.color};
    }
    & :hover {
    color: ${(prop: ITabsMenuStyle) => prop.hoverColor && prop.hoverColor};
    }
    .bp3-tab-indicator {
       background-color: ${(props: ITabsMenuStyle) => props.indicatorActive && props.indicatorActive};
    }
    & :focus {
    outline: none;
    }
    .bp3-tab[aria-selected="true"]{
     color: ${(prop: ITabsMenuStyle) => prop.active && prop.active};
    }
    `;


export const TabIcon = styled.div`
    display: flex;`;

export const labelIcon = {
  display: 'flex',
  alignItems: 'center',
  margin: '0 5px 0 0'
};