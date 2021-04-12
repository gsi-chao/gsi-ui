import { useState, useRef, useEffect } from 'react';
import {} from 'lodash';

const useSliding = (width: any, countElements: any) => {
  const containerRef = useRef<any>(null);
  const [distance, setDistance] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0);
  const [viewed, setViewed] = useState(0);
  const [elementWidth, setElementWidth] = useState(0);

  useEffect(() => {
    if (width > 0) {
      const containerWidth = containerRef.current.clientWidth;
      setElementWidth(Math.floor(width / countElements));
      const totalInViewport = Math.floor(
        containerWidth / Math.floor(width / countElements)
      );
      setTotalInViewport(totalInViewport);
      if (countElements <= totalInViewport) {
        setDistance(0);
      }
    }
  }, [
    containerRef.current,
    containerRef.current && containerRef.current.clientWidth
  ]);

  const handlePrev = () => {
    setViewed(viewed - 1);
    setDistance(distance + elementWidth);
  };

  const handleNext = () => {
    setViewed(viewed + 1);
    setDistance(distance - elementWidth);
  };

  const slideProps = {
    style: { transform: `translate3d(${distance}px, 0, 0)` }
  };

  const hasPrev = distance < 0;
  const hasNext = viewed + totalInViewport < countElements;
  return { handlePrev, handleNext, slideProps, containerRef, hasPrev, hasNext };
};

export default useSliding;
