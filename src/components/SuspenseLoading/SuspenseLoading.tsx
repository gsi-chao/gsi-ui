import React, { Suspense } from 'react';
import { Intent } from '@blueprintjs/core';
import { VSpinner } from '../Spinner';
import { SuspenseContainer } from './style';

interface VSuspenseReactProps {
  children: any;
  intent?: Intent;
}

export const VSuspenseLoading = (props: VSuspenseReactProps) => {
  return (
    <SuspenseContainer>
      <Suspense
        fallback={<VSpinner hasBackdrop={true} intent={props.intent} />}
      >
        {props.children}
      </Suspense>
    </SuspenseContainer>
  );
};
