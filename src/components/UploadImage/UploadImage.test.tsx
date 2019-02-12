import ReactDOM from 'react-dom';
import React from 'react';
import { UploadImage } from './UploadImage';
import renderer from 'react-test-renderer';

it("renders without crashing Upload Image", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UploadImage/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('render correctly Upload Image component tittle', () => {
  const TextInputComponent = renderer.create(<UploadImage tittle={'Hola Mundo'}/>).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});

it('render correctly Upload Image component not tittle', () => {
  const TextInputComponent = renderer.create(<UploadImage/>).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});