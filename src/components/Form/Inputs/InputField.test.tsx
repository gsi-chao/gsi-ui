import React from 'react';
import renderer from 'react-test-renderer';
import { FieldState, FormState } from 'formstate';

import { required } from '../Validators';
import { VInputField } from './InputField';
import ReactDOM from 'react-dom';

it('renders without crashing Progress Label', () => {
  const div = document.createElement('div');
  const form = new FormState<any>({
    username: new FieldState('').validators(required)
  });
  const asd = (
    <VInputField
      fieldState={form.$.username}
      inline={true}
      label={'Username'}
      placeholder={'Username'}
      size={'large'}
      labelInfo={'(info)'}
      id="test-input"
    />
  );
  ReactDOM.render(asd, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing InputField All Properties', () => {
  const form = new FormState<any>({
    username: new FieldState('').validators(required)
  });
  const InputComponent = renderer
    .create(
      <VInputField
        fieldState={form.$.username}
        inline={true}
        label={'Username'}
        placeholder={'Username'}
        size={'large'}
        labelInfo={'(info)'}
        id="test-input"
      />
    )
    .toJSON();
  expect(InputComponent).toMatchSnapshot();
});
