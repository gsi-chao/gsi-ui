import React from 'react';
import ReactDOM from 'react-dom';
import { SelectUnselectItems} from './SelectUnselectItems';
import { IItemsList } from '../SelectionList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const itemsUnassigned: IItemsList[] = [{value: 'value1', text: 'Value 1', active: false}];
  const itemsAssigned: IItemsList[] = [{value: 'value2', text: 'Value 2', active: false}];
  ReactDOM.render(<SelectUnselectItems handleSave={() => {}} handleCancel={() => {}} itemsUnassigned={itemsUnassigned}  itemsAssigned={itemsAssigned}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
