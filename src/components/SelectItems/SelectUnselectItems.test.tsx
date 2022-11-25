import React from 'react';
import { render, screen } from '@testing-library/react';

import { SelectUnselectItems } from './SelectUnselectItems';
import { IItemsList } from '../SelectionList';

it('renders without crashing', () => {
  const itemsUnassigned: IItemsList[] = [
    { value: 'value1', text: 'Value 1', active: false }
  ];
  const itemsAssigned: IItemsList[] = [
    { value: 'value2', text: 'Value 2', active: false }
  ];

  render(
    <SelectUnselectItems
      handleSave={() => {}}
      handleCancel={() => {}}
      itemsUnassigned={itemsUnassigned}
      itemsAssigned={itemsAssigned}
    />
  );
  expect(screen.findByText('Value 1')).toBeDefined();
});
