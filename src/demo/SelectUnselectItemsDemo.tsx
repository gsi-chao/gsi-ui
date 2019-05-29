import React from 'react';
import { SelectUnselectItems } from '../components/SelectItems';
import { IItemsList } from '../components/SelectionList';


const itemsUnassigned: IItemsList[] = [
  { active: false, text: 'Item1', value: 'item1' },
  { active: false, text: 'Item2', value: 'item2' },
  { active: false, text: 'Item3', value: 'item3' },
  { active: false, text: 'Item4', value: 'item4' }
];
const itemsAssigned: IItemsList[] = [
  { active: false, text: 'Item5', value: 'item5' },
  { active: false, text: 'Item6', value: 'item6' },
  { active: false, text: 'Item7', value: 'item7' },
  { active: false, text: 'Item8', value: 'item8' }
];

export const VSelectUnselectItemsDemo = () => {

  const handleSave = (element: any) => {
    console.log(element);
  };
  return (
    <SelectUnselectItems
      listsHeights={'142px'}
      handleCancel={() => console.log('cancelled')}
      handleSave={handleSave}
      itemsUnassigned={itemsUnassigned}
      itemsAssigned={itemsAssigned}
    />
  )
}