import React, { Component } from 'react';
import styled from 'styled-components';

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
    }
  }

  areChangedProperties = (prevState: Readonly<IColorWidget>) => {
    return (
      prevState.backgroundColor !== this.props.backgroundColor ||
      prevState.color !== this.props.color
    );
  };

  render() {
    const backgroundColor =
      this.state && this.state.backgroundColor.toLowerCase();
    const color =
      this.state && this.state.color && this.state.color.toLowerCase();
    const CellColor = styled.div`
      background: ${backgroundColor};
      color: ${color};
      height: 100%;
          `;
    return <CellColor >{this.state.value}</CellColor>;
  }
}

export default ColorWidget;
