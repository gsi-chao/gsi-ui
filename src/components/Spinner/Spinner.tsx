import React from 'react';
import { Intent, Spinner } from '@blueprintjs/core';
import { SpinnerContainer } from './style';

interface VLoaderProps {
  intent?: Intent;
  size?: number;
  color?: string;
}
export const VSpinner = (props: VLoaderProps) => {
  return (
    <SpinnerContainer color={props.color}>
      <Spinner
        intent={props.intent || Intent.PRIMARY}
        size={props.size || 50}
      />
    </SpinnerContainer>
  );
};
