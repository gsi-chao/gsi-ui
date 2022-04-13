import React, { Component, PropsWithChildren } from 'react';

import { Icon, Tab, TabId, Tabs as WTabs } from '@blueprintjs/core';
import { ITabsMenuProps, ITabsMenuState } from './types';
import { labelIcon, TabIcon, TabsStyle } from './style';

const Tabs: PropsWithChildren<any> = WTabs;

export class VTabsMenu extends Component<ITabsMenuProps, ITabsMenuState> {
  constructor(props: ITabsMenuProps) {
    super(props);
    this.state = {
      animate: this.props.animate || false,
      navbarTabId: this.props.tabList[0].navbarTabId || '',
      vertical: false
    };
  }

  public render() {
    const { ...options } = this.props;
    return (
      <TabsStyle
        color={options!.color}
        indicatorActive={options!.indicatorActive!}
        hoverColor={options!.hoverColor}
        active={options.active}
      >
        <Tabs
          animate={this.state.animate}
          id="navbar"
          large={true}
          onChange={this.handleNavbarTabChange}
          selectedTabId={this.state.navbarTabId}
        >
          {options.tabList.map(tab => {
            const label = tab.icon && (
              <TabIcon key={tab.key}>
                <Icon
                  style={labelIcon}
                  icon={tab.icon!.icon}
                  iconSize={tab.icon.iconSize && tab.icon.iconSize}
                  color={tab.icon.color && tab.icon.color}
                  intent={tab.icon.intent && tab.icon.intent}
                />
                <span>{tab.label}</span>
              </TabIcon>
            );
            return (
              <Tab
                key={tab.key}
                id={tab.navbarTabId}
                title={label || tab.label}
              />
            );
          })}
        </Tabs>
      </TabsStyle>
    );
  }

  private handleNavbarTabChange = (navbarTabId: TabId) => {
    this.setState({ navbarTabId });
    this.props.tabList.forEach(item => {
      if (item.navbarTabId === navbarTabId) {
        this.props.handleChange(item);
      }
    });
  };
}
