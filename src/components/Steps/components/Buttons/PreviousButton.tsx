import { Button } from '@blueprintjs/core';
import React, { useContext } from 'react';

import { StepContext } from '../../VStep';

const PreviousButton = () => {
  const ctx = useContext(StepContext);

  return (
    <>
      {ctx.displayPrevious && (
        <Button
          onClick={() => {
            ctx.goToPreviousStep && ctx.goToPreviousStep();
          }}
        >
          Previous
        </Button>
      )}
    </>
  );
};

export default PreviousButton;
