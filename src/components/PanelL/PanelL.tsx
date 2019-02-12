import { Header } from 'semantic-ui-react';
import { PanelBody, PanelContainer, styleHeader } from './style';

interface PanelProps {
  header: string;
  children?: any;
}

import React, { Component } from 'react';

export class PanelL extends Component<PanelProps> {
  constructor(props:PanelProps) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Header as="h2" textAlign="center" block size="tiny" style={styleHeader}>
          {this.props.header}
        </Header>
        <PanelContainer>
          <PanelBody>{this.props.children}</PanelBody>
        </PanelContainer>
      </React.Fragment>
    );
  }
}