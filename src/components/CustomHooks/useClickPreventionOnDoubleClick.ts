import { useCancellablePromises } from './useCancellablePromises';
import {
  cancellablePromise,
  delay
} from '../CancellablePromise/cancellablePromise';

export const useClickPreventionOnDoubleClick = (
  onClick: any,
  onDoubleClick: any
) => {
  const {
    appendPendingPromise,
    clearPendingPromises,
    removePendingPromise
  } = useCancellablePromises();

  const handleClick = () => {
    clearPendingPromises();
    const waitForClick = cancellablePromise(delay(200));
    appendPendingPromise(waitForClick);

    return waitForClick.promise
      .then(() => {
        removePendingPromise(waitForClick);
        onClick && onClick();
      })
      .catch((errorInfo: any) => {
        removePendingPromise(waitForClick);
        if (!errorInfo.isCanceled) {
          throw errorInfo.error;
        }
      });
  };

  const handleDoubleClick = () => {
    clearPendingPromises();
    onDoubleClick && onDoubleClick();
  };

  return [handleClick, handleDoubleClick];
};
