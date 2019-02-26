import { IconName, Intent } from '@blueprintjs/core';

export interface ITabsPanelStyle {
  color?: string;
  indicatorActive?: string;
  hoverColor?: string;
  active?: boolean;
  activeColor?: string;
  activeTextColor?: string;
  textColor?: string;
  elevation?: number;
  padding?: string;
  borderColor?: string;
  borderBottom?: number;
}

export interface ITabsPanelState {
  active: string;
  content: any;
}

export interface ITabsPanelProps {
  tabList: ITabsPanelTypes[];
  active?: string;
  padding?: string;
  elevation?: number;
  textColor?: string;
  activeColor?: string;
  borderColor?: string;
  borderBottom?: number;
  activeTextColor?: string;

  handleChange(tab: ITabsPanelTypes): void;
}

export interface IIconTabsPanelProps {
  icon: IconName;
  iconSize?: number;
  intent?: Intent;
}

export interface ITabsPanelTypes {
  key: string;
  icon?: IIconTabsPanelProps;
  label?: string;
  content: any;
  textColorBadge?: string;
  backgroundColorBadge?: string;
  dataBadge?: any;
}