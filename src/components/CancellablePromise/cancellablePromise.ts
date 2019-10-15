export const cancellablePromise = (promise: any) => {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (value: any) =>
        isCanceled ? reject({ isCanceled, value }) : resolve(value),
      (error: any) => reject({ isCanceled, error })
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => (isCanceled = true)
  };
};

export const delay = (n: number) =>
  new Promise(resolve => setTimeout(resolve, n));
