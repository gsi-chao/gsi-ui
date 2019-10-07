import { useState, useRef, useEffect } from 'react'

const PADDINGS = 110;

const useSliding = (elementWidth:any, countElements:any) => {
  const containerRef = useRef<any>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [distance, setDistance] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0)
  const [viewed, setViewed] = useState(0);

  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth - PADDINGS;
    setContainerWidth(containerWidth);
    setTotalInViewport(Math.floor(containerWidth / elementWidth));
  }, [containerRef.current]);

  const handlePrev = () => {
    setViewed(viewed - 1);
    setDistance(distance + elementWidth);
  }

  const handleNext = () => {
    setViewed(viewed + 1);
    setDistance(distance - elementWidth)
  }

  const slideProps = {
    style: { transform: `translate3d(${distance}px, 0, 0)` }
  };

  const hasPrev = distance < 0;
  console.log('containerWidth - ', containerWidth)
  console.log('elementWidth - ', elementWidth)
  console.log('AAAA', viewed + totalInViewport)
  console.log('BBBBSss-countElementss',  countElements)
  const hasNext = (viewed + totalInViewport) < countElements;
  return { handlePrev, handleNext, slideProps, containerRef, hasPrev, hasNext };
}

export default useSliding;
