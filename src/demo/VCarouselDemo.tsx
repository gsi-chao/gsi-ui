import React from 'react';
import { VOrgChart } from '../components/VOrgChart';
import { VCarousel } from '../components/Scroll';
import { VInputField, VSelectField, VTextAreaField } from '../components/Form';


const elementsCarousel: any = [
  <VInputField
    layer={{
      labelWidth: 6,
      inputWidth: 6,
      labelOrientation: 'end',
      inputOrientation: 'center'
    }}
    value={''}
    id="username"
    label={'Username'}
    inline={true}
  />,
  <VTextAreaField
    fill
    layer={{
      labelWidth: 6,
      inputWidth: 3,
      labelOrientation: 'end',
      inputOrientation: 'start'
    }}
    id="description"
    label="Description"
    inline
    value={''}
  />,
  <VTextAreaField
    fill
    layer={{
      labelWidth: 6,
      inputWidth: 3,
      labelOrientation: 'end',
      inputOrientation: 'start'
    }}
    id="description"
    label="Description"
    inline
    value={''}
  />
];

export const VCarouselDemo = () => {

  return (
    <VCarousel
      height={'200px'}
      width={'500px'}
      elements={elementsCarousel}
      buttonsJustify={'flex-end'}
    />
  )
}