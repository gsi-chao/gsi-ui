import React from 'react';
import SliderContext from '../context'

const ItemSC = ({ children }: any) => (
  <SliderContext.Consumer>
    {({ elementRef }: any) => {
      return (
        <div
          ref={elementRef}
          className='item'
        >
          {children}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default ItemSC;
