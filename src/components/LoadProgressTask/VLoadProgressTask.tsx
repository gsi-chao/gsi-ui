import React, { Component } from 'react';
import { H4, Icon, IconName, Intent } from '@blueprintjs/core';
import { SDialog, SProgressBar } from './style';

interface IVLoadProgressTask {
  onClose: () => void;
  isOpen: boolean;
  icon?: IconName;
  title: string;
  intent?: Intent;
}

export class VLoadProgressTask extends Component<IVLoadProgressTask> {
  render() {
    const { onClose, isOpen, icon, title, intent } = this.props;
    return (
      <SDialog
        icon={icon}
        onClose={onClose}
        canEscapeKeyClose={false}
        canOutsideClickClose={false}
        isOpen={isOpen}
        isCloseButtonShown={false}
      >
        <H4 style={{ textAlign: 'center' }}>
          {icon && <Icon icon={icon} />} {title}
        </H4>

        <SProgressBar intent={intent || Intent.PRIMARY} />
      </SDialog>
    );
  }
}
