import React from 'react';
import ReactDOM from 'react-dom';
import { VTable } from './Table';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const data = [
    {
      test: 'test1'
    },
    { test: 'test2' }
  ];
  ReactDOM.render(<VTable columns={['test']} data={data} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  const data = [
    {
      test: 'test1'
    },
    { test: 'test2' }
  ];
  ReactDOM.render(
    <VTable columns_name={{ test: 'Test' }} columns={['test']} data={data} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('render correctly VTable with sortable props', () => {
  const div = document.createElement('div');
  const data = [
    {
      test: 'test1'
    },
    { test: 'test2' }
  ];
  ReactDOM.render(
    <VTable sortable={{ columns: ['test'] }} columns={['test']} data={data} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
