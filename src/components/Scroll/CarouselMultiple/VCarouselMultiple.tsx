import React, { useEffect, useState } from 'react';
import { Icon } from '@blueprintjs/core';
import ReactResizeDetector from 'react-resize-detector';

import { SliderWrapper } from './style';
import SlideButton from './components/SlideButton';
import UseSliding from './components/UseSliding';
import UseSizeElement from './components/UseSizeElement';
import SliderContext from './context';

const Slider = ({ padding, children }: any) => {
  const [resolution, setState] = useState();

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

  return (
    <ReactResizeDetector handleWidth onResize={setState}>
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
          {hasPrev && (
            <SlideButton
              onClick={handlePrev}
              icon={<Icon icon="chevron-left"/>}
              typeS="prev"
            />
          )}
          {hasNext && (
            <SlideButton
              onClick={handleNext}
              icon={<Icon icon="chevron-right"/>}
              typeS="next"
            />
          )}
        </SliderWrapper>
      </SliderContext.Provider>
    </ReactResizeDetector>
  );
};

export default Slider;
