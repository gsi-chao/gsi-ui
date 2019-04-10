import React from 'react';
import ReactDOM from 'react-dom';
import { VScrollCarrousel } from './VScrollCarrousel';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <VScrollCarrousel>
      <div>Test div</div>
    </VScrollCarrousel>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('render correctly VScrollCarrousel component one segment', () => {
  const TextInputComponent = renderer
    .create(
      <VScrollCarrousel>
        <div>Test div</div>
      </VScrollCarrousel>
    )
    .toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});
