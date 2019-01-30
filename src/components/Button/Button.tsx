import React, {Component} from 'react';
import {Button, IButtonProps} from '@blueprintjs/core'


export class VButton extends Component<IButtonProps> {
    render() {
        return (
            <Button {...this.props}/>
        );
    }
}
