import React, { Component } from 'react';
import { ITabsPanelTypes, VTabsPanel } from '../components/TabsPanel';

class TabsPanelDemo extends Component {
  render() {
    const tabList: ITabsPanelTypes[] = [{
      icon: { intent: 'primary', icon: 'home', iconSize: 16 },
      content: <p>Hello</p>,
      key: '1'
    }, {
      label: 'Hogar',
      key: '2',
      content: <span>World </span>
    }, {
      icon: { intent: 'primary', icon: 'home', iconSize: 16 },
      label: 'deliveries actives for now',
      key: '3',
      content: <h3>it's me</h3>
    }];
    return (
      <div style={{padding: '25px 25px'}}>
        <VTabsPanel tabList={tabList} active={'3'} handleChange={this.handelChangeTab}/>
      </div>
    );
  }

  handelChangeTab = (tab: ITabsPanelTypes) => {
  };
}

export default TabsPanelDemo;