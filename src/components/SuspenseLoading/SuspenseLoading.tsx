import React, { Suspense } from 'react';
import { Intent } from '@blueprintjs/core';
import { VSpinner } from '../Spinner';

interface VSuspenseReactProps {
  children: any;
  intent?: Intent;
}

export const VSuspenseLoading = (props: VSuspenseReactProps) => {
  return (
    <Suspense fallback={<VSpinner intent={props.intent} />}>
      {props.children}
    </Suspense>
  );
};
