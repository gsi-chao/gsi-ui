import { useState, useRef, useEffect } from 'react';

const PADDINGS = 0;

const useSliding = (elementWidth: any, countElements: any) => {
  const containerRef = useRef<any>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [distance, setDistance] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0);
  const [viewed, setViewed] = useState(0);
  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth - PADDINGS;
    setContainerWidth(containerWidth);
    const totalInViewport = Math.floor(containerWidth / elementWidth);
    setTotalInViewport(totalInViewport);
    if (countElements <= totalInViewport) {
      setDistance(0);
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
