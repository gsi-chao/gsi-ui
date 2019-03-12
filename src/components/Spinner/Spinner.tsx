import React from 'react';
import { Intent, Spinner } from '@blueprintjs/core';
import { SpinnerContainer } from './style';

interface VLoaderProps {
  intent?: Intent;
}
export const VSpinner = (props: VLoaderProps) => {
  return (
    <SpinnerContainer>
      <Spinner intent={props.intent || Intent.PRIMARY} size={50} />
    </SpinnerContainer>
  );
};
