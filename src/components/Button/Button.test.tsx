import React from 'react';
import ReactDOM from 'react-dom';
import {VButton} from './Button';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VButton/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders with props', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VButton text="Test" icon="airplane" loading={true}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
