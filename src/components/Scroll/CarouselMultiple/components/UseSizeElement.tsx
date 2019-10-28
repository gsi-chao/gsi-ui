import { useState, useRef, useEffect } from 'react';

const useSizeElement = () => {
  const elementRef = useRef<any>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(elementRef.current && elementRef.current.clientWidth);
  }, [elementRef.current]);

  return { width, elementRef };
};

export default useSizeElement;
