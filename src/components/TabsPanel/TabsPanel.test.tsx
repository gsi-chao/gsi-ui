import React from 'react';
import { render, screen } from '@testing-library/react';

import { VTabsPanel } from './TabsPanel';
import { ITabsPanelTypes } from './types';

it('renders without crashing', () => {
  const div = document.createElement('div');
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
  render(
    <VTabsPanel
      backgroundColor={'antiquewhite'}
      size={'small'}
      padding={'10px 25px'}
      tabList={tabList}
      activeBorderColor={'red'}
      active={'3'}
      handleChange={() => {}}
    />
  );
  expect(screen.findAllByText('deliveries actives for now')).toBeDefined();
});
