import React from 'react';
import renderer from 'react-test-renderer';
import { VSteps } from '.';
import VStep from './VStep';

it('renders correctly when there are no items', () => {
  const steps = renderer
    .create(
      <VSteps onChange={() => {}}>
        <VStep stepKey={1} title={'first'}>
          <p>{'First step'}</p>
        </VStep>
        <VStep stepKey={2} description={'second description'}>
          <p>{'Second step'}</p>
        </VStep>
        <VStep stepKey={3}>
          <p>{'Third step'}</p>
        </VStep>
      </VSteps>
    )
    .toJSON();
  expect(steps).toMatchSnapshot();
});
