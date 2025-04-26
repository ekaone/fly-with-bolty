import { useEffect, useRef } from 'react';

export const useGameLoop = (
  callback: () => void,
  dependencies: React.DependencyList
) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      callback();
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};