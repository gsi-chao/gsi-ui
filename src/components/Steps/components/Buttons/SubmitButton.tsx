import React, { useContext } from 'react';

import { StepContext } from '../../VStep';
import { MainStepsContext } from '../../VSteps';
import { SButton } from './style';

const SubmitButton = () => {
  const mainCtx = useContext(MainStepsContext);
  const ctx = useContext(StepContext);

  return (
    <>
      {ctx.displaySubmit && (
        <SButton
          style={{ backgroundColor: mainCtx.mainColor }}
          intent={'primary'}
          onClick={() => {
            ctx.goToNextStep!();
          }}
        >
          Done
        </SButton>
      )}
    </>
  );
};

export default SubmitButton;
