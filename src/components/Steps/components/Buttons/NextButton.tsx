import React, { useContext } from 'react';

import { StepContext } from '../../VStep';
import { MainStepsContext } from '../../VSteps';
import { SButton } from './style';

const NextButton = () => {
  const mainCtx = useContext(MainStepsContext);
  const ctx = useContext(StepContext);

  return (
    <>
      {ctx.displayNext && (
        <SButton
          style={{ backgroundColor: mainCtx.mainColor }}
          intent={'primary'}
          onClick={() => {
            ctx.goToNextStep!();
          }}
        >
          Next
        </SButton>
      )}
    </>
  );
};

export default NextButton;
