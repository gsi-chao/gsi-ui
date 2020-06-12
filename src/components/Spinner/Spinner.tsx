import React from 'react';
import { Intent, Spinner } from '@blueprintjs/core';
import { SpinnerContainer } from './style';

interface VLoaderProps {
  intent?: Intent;
  size?: number;
  color?: string;
  hasBackdrop?: boolean;
}
export const VSpinner = (props: VLoaderProps) => {
  return (
    <SpinnerContainer hasBackdrop={props.hasBackdrop} color={props.color}>
      <Spinner
        intent={props.intent || Intent.PRIMARY}
        size={props.size || 50}
      />
    </SpinnerContainer>
  );
};
