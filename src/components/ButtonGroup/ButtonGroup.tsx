import React, {Component} from 'react';
import {ButtonGroup, IButtonGroupProps} from "@blueprintjs/core";



export class VButtonGroup extends Component<IButtonGroupProps> {
    render() {
        return (
            <ButtonGroup {...this.props}>
                {this.props.children}
            </ButtonGroup>
        );
    }
}
