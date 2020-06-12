import React from 'react';
import { shallow } from 'enzyme';

import { VLoadProgressTask } from './VLoadProgressTask';
import ReactDOM from 'react-dom';

it('renders without crashing VLoadProgressTask', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <VLoadProgressTask
      icon="export"
      isOpen={true}
      onClose={() => console.log('')}
      title="Test"
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('is showed VLoadProgressTask', () => {
  const wrapper = shallow(
    <VLoadProgressTask
      icon="export"
      isOpen={true}
      onClose={() => console.log('')}
      title="Test"
    />
  );
  expect(wrapper.prop('isOpen')).toEqual(true);
});
