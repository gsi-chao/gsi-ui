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
  size?: 'small'|'normal';
  lineColor?: string;
  activeBorderColor?: string;
}

export interface ITabsPanelState {
  active: string;
  content: any;
}

export interface ITabsPanelProps {
  tabList: ITabsPanelTypes[];
  active?: string;
  size?: 'small'|'normal';
  padding?: string;
  elevation?: number;
  textColor?: string;
  activeColor?: string;
  borderColor?: string;
  borderBottom?: number;
  lineColor?: string;
  activeTextColor?: string;
  activeBorderColor?: string;

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
  activeBorderColor?: any;
}
