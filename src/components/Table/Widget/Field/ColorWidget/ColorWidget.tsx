import React, { Component } from 'react';
import styled from 'styled-components';

export interface IColorWidget {
  backgroundColor: string;
  color?: string;
  value?: string;
  printColor: (value: string) => boolean;
}

export interface IColorWidgetState {
  backgroundColor: string;
  color?: string;
  value?: string;
}
interface IProps extends IColorWidgetState {}

class ColorWidget extends Component<IProps, IColorWidgetState> {
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
      padding: 0px 10px
      border-right: solid 1px #d6d9dc
          border-bottom: solid 1px #d6d9dc
         
      & div {
        text-align: center;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    `;

    return (
      <CellColor>
        {' '}
        <div>{this.state.value}</div>
      </CellColor>
    );
  }
}

export default ColorWidget;
