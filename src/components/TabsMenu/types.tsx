import { IconName, Intent, TabId } from '@blueprintjs/core';

export interface ITabsMenuStyle {
  color?: string;
  indicatorActive?: string;
  hoverColor?: string;
  active?: string;
}

export interface ITabsMenuState {
  animate: boolean;
  navbarTabId: TabId;
  vertical: boolean;
}

export interface ITabsMenuProps {
  tabList: ITabsTypes[];
  animate?: boolean;
  color?: string;
  indicatorActive?: string;
  hoverColor?: string;
  active?: string;
  handleChange(tab: ITabsTypes): void;
}

export interface IIconTabsMenuProps {
  icon: IconName;
  iconSize?: number;
  intent?: Intent;
  color?: string;
}

export interface ITabsTypes {
  key: string;
  navbarTabId: TabId
  icon?: IIconTabsMenuProps;
  label?: string;
  color?: string;
}