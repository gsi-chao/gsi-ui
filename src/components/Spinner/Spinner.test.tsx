import React from 'react';
import renderer from 'react-test-renderer';
import { VSpinner } from './Spinner';

it('render correctly Spinner', () => {
  const TextInputComponent = renderer.create(<VSpinner />).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});
