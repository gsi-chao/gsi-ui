import React, { useState } from 'react';
import { Icon } from '@blueprintjs/core';
import ReactResizeDetector from 'react-resize-detector';

import { SliderWrapper } from './style';
import SlideButton from './components/SlideButton';
import UseSliding from './components/UseSliding';
import UseSizeElement from './components/UseSizeElement';
import SliderContext from './context';

const Slider = ({ padding, children, isResponsive }: any) => {
  const [resolution, setState] = useState<{ width: number; height: number }>();

  const { width, elementRef } = UseSizeElement(resolution);

  const {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    hasNext,
    hasPrev
  }: any = UseSliding(width, React.Children.count(children));

  const contextValue: any = {
    elementRef
  };

  const onResize = (width: number, height: number) => {
    setState({ width, height });
  };

  return (
    <ReactResizeDetector handleWidth {...{ onResize }}>
      <SliderContext.Provider value={contextValue}>
        <SliderWrapper padding={padding}>
          <div className="slider">
            <div
              ref={containerRef}
              className="slider__container"
              {...slideProps}
            >
              {children}
            </div>
          </div>
          {hasPrev && isResponsive && (
            <SlideButton
              onClick={handlePrev}
              icon={<Icon icon="chevron-left" />}
              typeS="prev"
            />
          )}
          {hasNext && isResponsive && (
            <SlideButton
              onClick={handleNext}
              icon={<Icon icon="chevron-right" />}
              typeS="next"
            />
          )}
        </SliderWrapper>
      </SliderContext.Provider>
    </ReactResizeDetector>
  );
};

export default Slider;
