import React from 'react';
import {SliderButtonSC} from '../style';

interface ISlideButton {
  onClick: any,
  icon: any,
  typeS: string,
}

const SlideButton = ({ onClick, icon, typeS }: ISlideButton) => (
  <SliderButtonSC onClick={ onClick } className={`slide-button slide-button--${typeS}`}>
    <span>
      {icon}
    </span>
  </SliderButtonSC>
);

export default SlideButton;
