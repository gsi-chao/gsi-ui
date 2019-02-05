import React from "react";
import ReactDOM from "react-dom";
import {PanelL} from "./PanelL";
import renderer from 'react-test-renderer';
import 'jest-styled-components';

it("renders without crashing Progress Label", () => {
  const div = document.createElement("div");
  const header = 'Hola mundo';
  const child = (<div><h1>Soy yo</h1></div>);
  ReactDOM.render(<PanelL header={header} children={child}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('render correctly PanelL', () => {
  const header = 'Hola mundo';
  const child = (<div><h1>Soy yo</h1></div>);
  const TextInputComponent = renderer.create(<PanelL header={header} children={child}/>).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});