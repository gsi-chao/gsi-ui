import { IconName, Intent, MaybeElement } from '@blueprintjs/core';
import React, { CSSProperties } from 'react';

export interface ITabsPanelStyle {
  color?: string;
  indicatorActive?: string;
  hoverColor?: string;
  active?: boolean;
  activeColor?: string;
  activeTextColor?: string;
  activeBackgroundColor?: string;
  textColor?: string;
  elevation?: number;
  padding?: string;
  borderColor?: string;
  borderBottom?: number;
  size?: 'small' | 'normal';
  backgroundColor?: string;
  lineColor?: string;
  activeBorderColor?: string;
}

export interface ITabsPanelState {
  active: string;
  content: any;
  possibleKey: string;
}

export interface ITabsPanelProps {
  tabList: ITabsPanelTypes[];
  active?: string;
  size?: 'small' | 'normal';
  padding?: string;
  backgroundColor?: string;
  elevation?: number;
  textColor?: string;
  activeColor?: string;
  borderColor?: string;
  borderBottom?: number;
  lineColor?: string;
  activeTextColor?: string;
  activeBorderColor?: string;
  activeBackgroundColor?: string;
  beforeChangeTabValidation?: boolean;
  tabsAlertProps?: TabsAlertProps;
  handleChange(tab: ITabsPanelTypes): void;
  tabsTagsContainerPadding?: string;
  tabsTagItemPadding?: string;
  isResponsive? : boolean;
}

export interface IIconTabsPanelProps {
  icon: IconName;
  iconSize?: number;
  intent?: Intent;
}

export interface ITabsPanelTypes {
  key: string;
  icon?: IIconTabsPanelProps | React.ReactNode;
  label?: string;
  content: any;
  textColorBadge?: string;
  backgroundColorBadge?: string;
  dataBadge?: any;
  activeBorderColor?: any;
  hidden?: boolean;
}

export interface TabsAlertProps {
  cancelButtonText?: string;
  canEscapeKeyCancel?: boolean;
  canOutsideClickCancel?: boolean;
  className?: string;
  confirmButtonText?: string;
  icon?: IconName | MaybeElement;
  intent?: Intent;
  style?: CSSProperties;
  bodyText?: string;
}
