import React from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { observer } from 'mobx-react-lite';
import { DragAndDropList } from './components/DragAndDropList/DragAndDropList';
import { IDNDList } from './components/DragAndDropList/types';

const TestComponent = observer(() => {
  const list: IDNDList[] = [
    {
      id: '1',
      label: 'List 1',
      list: []
    },
    {
      id: '2',
      label: 'List 2',
      list: [
        {
          label: 'Item 5',
          value: '5'
        },
        {
          label: 'Item 6',
          value: '6'
        },
        {
          label: 'Item 7',
          value: '7'
        },
        {
          label: 'Item 8',
          value: '8'
        }
      ]
    }
  ];
  return (
    <>
      Test Component!!!
      <DragAndDropList
        list={list}
        containerOrientation={'horizontal'}
        onDragAndDrop={output => console.log(output)}
      />
    </>
  );
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
