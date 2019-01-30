import React from 'react';
import ReactDOM from 'react-dom';
import {VButtonGroup} from './ButtonGroup';
import {VButton} from "../Button/Button";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VButtonGroup/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders with props', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VButtonGroup color="blue">
        <VButton text="Test Group"/>
    </VButtonGroup>, div);
    ReactDOM.unmountComponentAtNode(div);
});
