import React, { Component } from 'react';
import { ITabsPanelTypes, VTabsPanel } from '../components/TabsPanel';

class TabsPanelDemo extends Component {
  render() {
    const tabList: ITabsPanelTypes[] = [
      {
        icon: { intent: 'primary', icon: 'home', iconSize: 16 },
        content: <p>Hello</p>,
        key: '1'
      },
      {
        label: 'Hogar',
        key: '2',
        dataBadge: 3,
        content: <span>World </span>
      },
      {
        icon: { intent: 'primary', icon: 'home', iconSize: 16 },
        label: 'deliveries actives for now',
        key: '3',
        dataBadge: 12,
        content: <h3>it's me</h3>
      }
    ];
    const FirstTabList: ITabsPanelTypes[] = [
      {
        label: 'Container Tab',
        icon: { intent: 'primary', icon: 'home', iconSize: 16 },
        content: (
          <div style={{ padding: '5px' }}>
            <VTabsPanel
              size={'small'}
              backgroundColor={'white'}
              padding={'10px 25px'}
              tabList={tabList}
              activeBorderColor={'red'}
              active={'3'}
              beforeChangeTabValidation={true}
              handleChange={this.handelChangeTab}
              tabsAlertProps={{
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Stay in tab',
                canEscapeKeyCancel: true,
                bodyText: 'Are you sure you want to change the tab, changes will be lost',
                intent: 'success'
              }}
            />
          </div>
        ),
        key: '1'
      }
    ];
    return (
      <div style={{ padding: '25px' }}>
        <VTabsPanel
          backgroundColor={'antiquewhite'}
          size={'small'}
          padding={'10px 25px'}
          tabList={FirstTabList}
          activeBorderColor={'red'}
          active={'1'}
          handleChange={this.handelChangeTab}
        />
      </div>
    );
  }

  handelChangeTab = (tab: ITabsPanelTypes) => {};
}

export default TabsPanelDemo;
