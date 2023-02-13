import { debounce, throttle } from 'lodash';
import { useEffect, useRef, useState } from 'react';

export const useThrottleDebounce = (
  tTime: number = 2000,
  dTime: number = 1000
) => {
  const tRef = useRef<any>(null);
  const tFunc = useRef<any>(null);
  const [tDHook, setTDHook] = useState<any>(null);

  useEffect(() => {
    setTDHook(throttleDebounceCreator);
    return () => {
      setTDHook(null);
    };
  }, []);

  const throttleDebounceCreator = () => {
    return (func: any) => {
      tFunc.current = func;
      debounceThrottle();
    };
  };

  const debounceThrottle = debounce(() => {
    if (tRef.current?.cancel) {
      tRef.current.cancel();
    }
    tRef.current = throttle(tFunc.current, tTime)();
  }, dTime);

  return tDHook;
};
