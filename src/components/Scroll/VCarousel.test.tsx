import React from 'react';
import ReactDOM from 'react-dom';
import { VCarousel } from './VCarousel';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VCarousel elements={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('render correctly VScrollCarrousel component one segment', () => {
  const TextInputComponent = renderer
    .create(<VCarousel elements={[]} />)
    .toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});
