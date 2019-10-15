import { useRef } from 'react';

export const useCancellablePromises = () => {
  const pendingPromises = useRef<any[]>([]);

  const appendPendingPromise = (promise: any) =>
    (pendingPromises.current = [...pendingPromises.current, promise]);

  const removePendingPromise = (promise: any) =>
    (pendingPromises.current = pendingPromises.current.filter(
      p => p !== promise
    ));

  const clearPendingPromises = () =>
    pendingPromises.current.map(p => p.cancel());

  return {
    appendPendingPromise,
    removePendingPromise,
    clearPendingPromises
  };
};
