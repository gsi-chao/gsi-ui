import React from 'react';
import { Intent, Spinner } from '@blueprintjs/core';
import { SpinnerContainer } from './style';

interface VLoaderProps {
  intent?: Intent;
  size?: number;
}
export const VSpinner = (props: VLoaderProps) => {
  return (
    <SpinnerContainer>
      <Spinner
        intent={props.intent || Intent.PRIMARY}
        size={props.size || 50}
      />
    </SpinnerContainer>
  );
};
