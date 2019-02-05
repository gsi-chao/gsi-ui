import React from "react";
import ReactDOM from "react-dom";
import {ProgressLabel} from "./ProgressLabel";
import {ISegment} from "./IPregressLabel";
import renderer from 'react-test-renderer';

it("renders without crashing Progress Label", () => {
    const div = document.createElement("div");
    const segments: ISegment[] = [{
        key: 'first',
        type: 'first',
        label: 'Hola Mundo',
        amount: 10
    }, {
        key: 'last',
        type: 'last',
        label: 'Soy yo',
        amount: 5
    }];
    ReactDOM.render(<ProgressLabel total={15} segments={segments}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
it('render correctly ProgressLabel component one segment', () => {
    const segments: ISegment[] = [{
        key: 'unique',
        type: 'unique',
        label: 'Hola Mundo',
        amount: 10
    }];
    const TextInputComponent = renderer.create(<ProgressLabel total={10} segments={segments}/>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

it('render correctly ProgressLabel component two segments', () => {
    const segments: ISegment[] = [{
        key: 'first',
        type: 'first',
        label: 'Hola Mundo',
        amount: 10
    }, {
        key: 'last',
        type: 'last',
        label: 'Soy yo',
        amount: 5
    }];
    const TextInputComponent = renderer.create(<ProgressLabel total={15} segments={segments}/>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

it('render correctly ProgressLabel component three segment', () => {
    const segments: ISegment[] = [{
        key: 'first',
        type: 'first',
        label: 'Hola Mundo',
        amount: 8
    },
        {
            key: 'center',
            type: 'center',
            label: 'Soy yo',
            color: 'red',
            amount: 4
        }, {
            key: 'last',
            type: 'last',
            label: 'Soy yo',
            amount: 3
        }];
    const TextInputComponent = renderer.create(<ProgressLabel total={15} segments={segments}/>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});
