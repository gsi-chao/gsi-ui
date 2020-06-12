import React from 'react';

import NextButton from './NextButton';
import PreviousButton from './PreviousButton';
import SubmitButton from './SubmitButton';

const ButtonsBar = () => {
  return (
    <div>
      <SubmitButton />
      <NextButton />
      <PreviousButton />
    </div>
  );
};

export default ButtonsBar;
