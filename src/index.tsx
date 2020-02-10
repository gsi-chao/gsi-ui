import React from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { observer } from 'mobx-react-lite';
import { ITabsPanelTypes, VTabsPanel } from './components/TabsPanel';
import { Icon } from '@blueprintjs/core';

const TestComponent = observer(() => {
  const tabList: ITabsPanelTypes[] = [
    {
      label: 'Account',
      content: <div />,
      key: '1',
      icon: <Icon icon={'edit'} iconSize={15} />
    },
    {
      label: 'Account2',
      content: <div />,
      key: '2',
      icon: <Icon icon={'edit'} iconSize={15} />
    }
  ];
  return (
    <VTabsPanel
      size={'normal'}
      padding={'0px'}
      tabList={tabList}
      tabsTagsContainerPadding={'0px'}
      tabsTagItemPadding={'7px 10px 5px 10px'}
      activeColor={'#396FAA'}
      activeBackgroundColor={'#396FAA'}
      activeTextColor={'#fff'}
      handleChange={tab => console.log(tab)}
      active={'1'}
      borderColor={'transparent'}

    />
  );
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
