import React from 'react';
import { IToasterProps, Toaster } from '@blueprintjs/core';
import { createRoot } from 'react-dom/client';

export const createToaster = (
  props?: IToasterProps,
  container = document.body
) => {
  const containerElement = document.createElement('div');
  container.appendChild(containerElement);
  const root = createRoot(containerElement);

  return new Promise<Toaster>((resolve, reject) => {
    root.render(
      <Toaster
        {...props}
        usePortal={false}
        ref={instance => {
          if (!instance) {
            reject(new Error('[Blueprint] Unable to create toaster.'));
          } else {
            resolve(instance);
          }
        }}
      />
    );
  });
};
