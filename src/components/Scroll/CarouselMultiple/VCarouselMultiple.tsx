import React from 'react';
import { Icon } from "@blueprintjs/core";

import { SliderWrapper } from './style';
import SlideButton from './components/SlideButton';
import UseSliding from './components/UseSliding';
import UseSizeElement from './components/UseSizeElement';
import SliderContext from './context'

const Slider = ({ children }: any) => {
  const { width, elementRef } = UseSizeElement();
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
    <SliderContext.Provider value={contextValue}>
      <SliderWrapper>
        <div className="slider">
          <div ref={containerRef} className="slider__container" {...slideProps}>{children}</div>
        </div>
        {hasPrev && <SlideButton onClick={handlePrev} icon={<Icon icon="chevron-left" />}  typeS="prev" />}
        {hasNext && <SlideButton onClick={handleNext} icon={<Icon icon="chevron-right" />}  typeS="next" />}
      </SliderWrapper>
    </SliderContext.Provider>
  );
};

export default Slider;