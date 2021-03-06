import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { VSelectionList } from './SelectionList';
import { IItemsList } from './ISelectionList';

it('renders without crashing Selection List', () => {
  const div = document.createElement('div');
  const array_elements: IItemsList[] = [
    { text: 'first', value: 'firstv', icon: 'cut' },
    { text: 'second', value: 'secondv', active: true }
  ];

  ReactDOM.render(
    <VSelectionList
      elements={array_elements}
      onSelect={(list: any) => console.log(list)}
      selection={{ background: '#E1E8ED', textColor: '#fbbd08' }}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('render correctly SelectionList component one segment', () => {
  const array_elements: IItemsList[] = [
    { text: 'first', value: 'firstv', icon: 'cut' }
  ];

  const TextInputComponent = renderer
    .create(
      <VSelectionList
        elements={array_elements}
        onSelect={(list: any) => console.log(list)}
      />
    )
    .toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});
