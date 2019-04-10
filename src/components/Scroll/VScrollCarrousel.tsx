import { Button } from '@blueprintjs/core';
import { VStyledCarrousel, VStyledCarrouselButtonsContainer, VStyledCarrouselContainer } from './style';
import React, { Component } from 'react';

interface StyledCardProps {
  displacement?: number;
  durationMs?: number;
  children: any;
  buttonsJustify?: FlexJustify;
}

export type FlexJustify = 'center' | 'flex-end' | 'flex-start';

interface PanelState {
  isOpen: boolean;
  left: number;
}

export class VScrollCarrousel extends Component<StyledCardProps, PanelState> {
  private readonly childrenRef: React.RefObject<HTMLInputElement>;
  private readonly fatherRef: React.RefObject<HTMLInputElement>;
  constructor(props: StyledCardProps) {
    super(props);
    this.state = {
      left: 0,
      isOpen: false
    };
    this.childrenRef = React.createRef<HTMLInputElement>();
    this.fatherRef = React.createRef<HTMLInputElement>();
  }

  setLeft = (left: number) => {
    const childrenOffSerWidth =
      (this.childrenRef.current && this.childrenRef.current.offsetWidth) || 0;
    const fatherOffsetWidth =
      (this.fatherRef.current && this.fatherRef.current.offsetWidth) || 0;
    if (left > 0) {
      if (this.state.left < 0) {
        if (this.state.left + left < 0) {
          this.setState({ left: this.state.left + left });
        } else {
          this.setState({ left: 0 });
        }
      }
    } else {
      if (this.state.left > fatherOffsetWidth - childrenOffSerWidth) {
        if (this.state.left + left > fatherOffsetWidth - childrenOffSerWidth) {
          this.setState({ left: this.state.left + left });
        } else {
          this.setState({ left: fatherOffsetWidth - childrenOffSerWidth });
        }
      }
    }
  };

  render() {
    const { children, displacement, durationMs,buttonsJustify } = this.props;
    const { left } = this.state;
    const ref = this.childrenRef;
    const newChildren = React.cloneElement(children, {
      ref,
      key: 'carrouselChildren'
    });
    return (
      <VStyledCarrouselContainer>
        <VStyledCarrousel
          durationMs={durationMs}
          ref={this.fatherRef}
          left={left}
        >
          {newChildren}
        </VStyledCarrousel>
        <VStyledCarrouselButtonsContainer buttonsJustify = {buttonsJustify}>
          <Button
            minimal
            icon={'chevron-left'}
            onClick={() => this.setLeft((displacement || 100))}
          />
          <Button
            minimal
            icon={'chevron-right'}
            onClick={() => this.setLeft(-(displacement || 100))}
          />
        </VStyledCarrouselButtonsContainer>
      </VStyledCarrouselContainer>
    );
  }
}
