import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { IDNDList } from './types';
import { DragAndDropList } from './DragAndDropList';
import { mount } from 'enzyme';

const list: IDNDList[] = [
  {
    id: '1',
    label: 'List 1',
    list: [
      {
        label: 'Item 1',
        value: '1'
      },
      {
        label: 'Item 2',
        value: '2'
      },
      {
        label: 'Item 3',
        value: '3'
      },
      {
        label: 'Item 4',
        value: '4'
      }
    ]
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

it('renders without crashing Drag and Drop', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <DragAndDropList
      list={list}
      containerOrientation={'horizontal'}
      onDragAndDrop={output => console.log(output)}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it('render correctly Drag and Drop component', () => {
  const wrapper = mount(
    <DragAndDropList
      list={list}
      containerOrientation={'horizontal'}
      onDragAndDrop={output => console.log(output)}
    />
  );

  expect(wrapper.find('.bp3-card')).toHaveLength(2);
});
