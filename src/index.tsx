import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import {
  IItem,
  SearchSelect,
  Validators,
  VSearchSelectField,
  SelectUnselectItems
} from './components';
import { FieldState, FormState } from 'formstate';
import { Button } from '@blueprintjs/core';

const validator = (value: number[]) => value.length <= 2 && 'Error a';
const form = new FormState({
  data: new FieldState([1, 2])
});
const TestComponent = observer(() => {
  const onReturnAssignedUnassignedItems = (item: any) => {
    console.log(`items:`, item);
  };

  const handleSave = (item: any) => {
    console.log(`save:`, item);
  };

  return (
    <>
      <SelectUnselectItems
        itemsUnassigned={[
          { text: 'One', value: 'one' },
          { text: 'Two', value: 'two' }
        ]}
        itemsAssigned={[]}
        assignedText={'Selected'}
        unAssignedText={'Unselected'}
        handleSave={handleSave}
        handleCancel={() => console.log(`cancel`)}
        intentSave={'success'}
        intentCancel={'danger'}
        displayCount
        onReturnAssignedUnassignedItems={onReturnAssignedUnassignedItems}
      />
    </>
  );
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
