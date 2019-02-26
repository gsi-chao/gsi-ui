import React, { Component, useState } from 'react';
import { VLoadProgressTask } from '../components/LoadProgressTask';
import { Button } from '@blueprintjs/core';

interface IState {
  open: boolean;
}
class VLoadProgressTaskDemo extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false
    };
  }
  render() {
    return (
      <React.Fragment>
        <Button onClick={this.openProgress}>Open Task</Button>
        <VLoadProgressTask
          onClose={() => this.setState({ open: false })}
          isOpen={this.state.open}
          title={'Import Account'}
          icon="import"
        />
      </React.Fragment>
    );
  }
  openProgress = (event: any) => {
    this.setState({ open: true });
    setTimeout(() => {
      this.setState({
        open: false
      });
    }, 5000);
  };
}

export default VLoadProgressTaskDemo;
