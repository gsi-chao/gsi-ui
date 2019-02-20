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
  paddingY?: number;
  paddingX?: number;
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
  elevation?: number;
  activeColor?: string;
  borderColor?: string;
  borderBottom?: number;
  activeTextColor?: string;
  textColor?: string;
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
}
