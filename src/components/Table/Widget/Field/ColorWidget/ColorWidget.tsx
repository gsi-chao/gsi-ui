import React, { Component } from 'react';
import styled from 'styled-components';
import { TextAlignProperty } from 'csstype';

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
interface IProps extends IColorWidgetState {
  textAlign?:string
}

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
        <div style={{textAlign:this.getTextAlign(),padding:'0px 10px'}}>{this.props.value}</div>
      </CellColor>
    );
  }

  private getTextAlign() {
    const supported: TextAlignProperty[] = ['-moz-initial'
      , 'inherit'
      , 'initial'
      , 'revert'
      , 'unset'
      , 'center'
      , 'end'
      , 'justify'
      , 'left'
      , 'match-parent'
      , 'right'
      , 'start'
    ];

    const textAlign = supported.find((x: TextAlignProperty) => x === this.props.textAlign);
    return  textAlign ? textAlign : 'center';
  }
}

export default ColorWidget;
