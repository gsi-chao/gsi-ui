import React from 'react';
import renderer from 'react-test-renderer';
import { VSuspenseLoading } from './SuspenseLoading';

it('render correctly Suspense Loading', () => {
  const TextInputComponent = renderer
    .create(
      <VSuspenseLoading>
        <div />
      </VSuspenseLoading>
    )
    .toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});
