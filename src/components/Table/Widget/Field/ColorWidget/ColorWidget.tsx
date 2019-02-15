import React, { Component } from 'react';
import styled from 'styled-components';
import { Cell } from '@blueprintjs/table';

export interface IColorWidget {
  backgroundColor: string;
  color?: string;
  value?: string;
}

interface IProps extends IColorWidget {}

class ColorWidget extends Component<IProps, IColorWidget> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.color,
      value: this.props.value
    };
  }

  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IColorWidget>,
    snapshot?: any
  ): void {
    if (this.areChangedProperties(prevState)) {
      this.setState({
        backgroundColor: this.props.backgroundColor,
        color: this.props.color
      });
      console.log('sa cambio');
    }
  }

  areChangedProperties = (prevState: Readonly<IColorWidget>) => {
    return (
      prevState.backgroundColor !== this.props.backgroundColor ||
      prevState.color !== this.props.color
    );
  };

  render() {
    const color = this.state && this.state.backgroundColor.toLowerCase();
    const CellColor = styled(Cell)`
      background: ${color};
    `;
    return <CellColor as={Cell}>{this.state.value}</CellColor>;
  }
}

export default ColorWidget;
