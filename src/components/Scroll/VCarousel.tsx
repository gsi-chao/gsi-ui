import { Button } from '@blueprintjs/core';
import {
  VStyledCarrousel,
  VStyledCarrouselButtonsContainer,
  VStyledCarrouselContainer
} from './style';
import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';
import { PanelState, StyledCardProps } from './types';

export class VCarousel extends Component<StyledCardProps, PanelState> {
  constructor(props: StyledCardProps) {
    super(props);
    this.state = {
      activeIndex: 0,
      fromLeft: false,
      fromRight: true,
      activeElement: this.props.elements[0]
    };
  }

  changeElement = (direction: 'LEFT' | 'RIGHT') => {
    if (direction === 'LEFT') {
      this.changeItemFromLeft();
    } else {
      this.changeItemFromRight();
    }
  };

  changeItemFromLeft = (nextIndex: number = this.state.activeIndex - 1) => {
    this.setState(
      {
        fromLeft: true,
        fromRight: false,
        activeIndex: nextIndex,
        activeElement: null
      },
      () => {
        this.setState({
          activeElement: this.props.elements[this.state.activeIndex]
        });
      }
    );
  };

  changeItemFromRight = (nextIndex: number = this.state.activeIndex + 1) => {
    this.setState(
      {
        fromLeft: false,
        fromRight: true,
        activeIndex: nextIndex,
        activeElement: null
      },
      () => {
        this.setState({
          activeElement: this.props.elements[this.state.activeIndex]
        });
      }
    );
  };

  render() {
    const { elements, buttonsJustify, height, width } = this.props;
    const { activeIndex, fromLeft, fromRight, activeElement } = this.state;

    const CarouselDiv = posed.div({
      enter: {
        x: 0,
        opacity: 1,
        delay: 150,
        transition: {
          x: { type: 'spring', stiffness: 1000, damping: 1000 },
          default: { duration: 150 }
        }
      },
      exit: {
        x: (fromRight && 50) || (fromLeft && -50),
        opacity: 0,
        transition: {
          x: ({ from, to }: any) => ({
            type: 'keyframes',
            values: [from, (fromRight && -50) || (fromLeft && 50), to],
            times: [0, 0.99, 1]
          }),
          opacity: ({ from, to }: any) => ({
            type: 'keyframes',
            values: [from, 0, to],
            times: [0, 0.99, 1]
          })
        }
      }
    });
    return (
      <VStyledCarrouselContainer height={height} width={width}>
        <VStyledCarrousel>
          <PoseGroup>
            {activeElement && [
              <CarouselDiv key={'CarouselDivFromLeft'}>
                {activeElement}
              </CarouselDiv>
            ]}
          </PoseGroup>
        </VStyledCarrousel>
        <VStyledCarrouselButtonsContainer buttonsJustify={buttonsJustify}>
          <Button
            disabled={this.state.activeIndex === 0}
            minimal
            icon={'chevron-left'}
            onClick={() => this.changeElement('LEFT')}
          />
          <Button
            disabled={this.state.activeIndex === elements.length - 1}
            minimal
            icon={'chevron-right'}
            onClick={() => this.changeElement('RIGHT')}
          />
        </VStyledCarrouselButtonsContainer>
      </VStyledCarrouselContainer>
    );
  }
}
