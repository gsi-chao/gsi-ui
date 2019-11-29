import { useState, useRef, useEffect } from 'react';
import { reduce } from 'lodash';

const useSizeElement = (resolution: any) => {
  const elementRef = useRef<any>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const elements: any[] = (elementRef.current && elementRef.current.parentNode &&
      elementRef.current.parentNode.children) || [];
    if (elements && elements.length !== 0) {
      setWidth(reduce(elements, (sum: any, n: any) => {
        return sum + n.clientWidth;
      }, 0));
    }

  }, [elementRef.current, resolution]);

  return { width, elementRef };
};

export default useSizeElement;
