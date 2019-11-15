import React from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { ITabsPanelTypes, VTabsPanel } from './components/TabsPanel';
import { Icon } from '@blueprintjs/core';
const TestComponent = () => {
  const tabList2: ITabsPanelTypes[] = [
    {
      label: 'Locations',
      content: <></>,
      key: 'tabSetupLocation',
      icon: <Icon icon={'user'} />,
      hidden: false
    },
    {
      label: 'Driver/Contractor',
      content: <></>,
      key: 'tabSetupDriverContractor',
      icon: <Icon icon={'user'} />,
      hidden: false
    },
    {
      label: 'Truck/Trailer',
      content: <></>,
      key: 'tabSetupTruckTrailer',
      icon: <Icon icon={'user'} />,
      hidden: false
    },
    {
      label: 'Account',
      content: <></>,
      key: 'tabSetupAccount',
      icon: <Icon icon={'user'} />,
      hidden: false
    },
    {
      label: 'Hierarchy',
      content: <></>,
      key: 'tabSetupHierarchy',
      icon: <Icon icon={'user'} />,
      hidden: false
    },
    {
      label: 'Administration',
      content: <></>,
      key: 'tabSetupAdministration',
      icon: <Icon icon={'user'} />,
      hidden: false
    },
    {
      label: 'Definitions',
      content: <></>,
      key: 'tabSetupDefinition',
      icon: <Icon icon={'user'} />,
      hidden: false
    }
  ];

  const tabList: ITabsPanelTypes[] = [
    {
      label: 'Locations',
      content: (
        <VTabsPanel
          size={'normal'}
          padding={'10px'}
          tabList={tabList2}
          activeBorderColor={'blue'}
          activeColor={'#E3E4E2'}
          active={'tabSetupLocation'}
          handleChange={(tab: ITabsPanelTypes) => {}}
          borderColor={'transparent'}
          backgroundColor={'#f7f7f7'}
          tabsTagsContainerPadding={'0'}
          tabsTagItemPadding={'6px 12px'}
        />
      ),
      key: 'tabSetupLocation',
      icon: <Icon icon={'user'} />,
      hidden: false
    },
    {
      label: 'Driver/Contractor',
      content: <></>,
      key: 'tabSetupDriverContractor',
      icon: <Icon icon={'user'} />,
      hidden: false
    },
    {
      label: 'Truck/Trailer',
      content: <></>,
      key: 'tabSetupTruckTrailer',
      icon: <Icon icon={'user'} />,
      hidden: false
    },
    {
      label: 'Account',
      content: <></>,
      key: 'tabSetupAccount',
      icon: <Icon icon={'user'} />,
      hidden: false
    },
    {
      label: 'Hierarchy',
      content: <></>,
      key: 'tabSetupHierarchy',
      icon: <Icon icon={'user'} />,
      hidden: false
    },
    {
      label: 'Administration',
      content: <></>,
      key: 'tabSetupAdministration',
      icon: <Icon icon={'user'} />,
      hidden: false
    },
    {
      label: 'Definitions',
      content: <></>,
      key: 'tabSetupDefinition',
      icon: <Icon icon={'user'} />,
      hidden: false
    }
  ];

  return (
    <VTabsPanel
      size={'normal'}
      padding={'0 10px'}
      tabList={tabList}
      activeBorderColor={'blue'}
      activeColor={'#E3E4E2'}
      active={'tabSetupLocation'}
      handleChange={(tab: ITabsPanelTypes) => {}}
      borderColor={'transparent'}
      backgroundColor={'#f7f7f7'}
      tabsTagsContainerPadding={'0'}
      tabsTagItemPadding={'6px 10px'}
    />
  );
};

ReactDOM.render(<TestComponent />, document.getElementById('root'));
