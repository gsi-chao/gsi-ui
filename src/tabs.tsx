import React from 'react';

import { observer } from 'mobx-react';
import { ITabsPanelTypes, VTabsPanel } from './components/TabsPanel';

const SetupLayout = observer(() => {

  const tabList: ITabsPanelTypes[] = [
    {
      label: 'Hierarchy',
      content: <div>Hierarchy</div>,
      key: 'tabSetupHierarchy',
      hidden: true
    },
    {
      label: 'Administration',
      content: <div>Administration</div>,
      key: 'tabSetupAdministration',
      hidden: true
    },
    {
      label: 'Definitions',
      content: <div>Definitions</div>,
      key: 'tabSetupDefinition',
      hidden: true
    }
  ];

  return (

      <VTabsPanel
        size={'normal'}
        padding={'0px'}
        tabList={tabList}
        tabsTagsContainerPadding={'0px'}
        tabsTagItemPadding={'10px 15px'}
        activeColor={'#E3E4E2'}
        active={'Hierarchy'}
        handleChange={(tab: ITabsPanelTypes) => {
          console.log(tab)
        }}
        borderColor={'transparent'}
        backgroundColor={'#f7f7f7'}
      />
  );
});

export default SetupLayout;
