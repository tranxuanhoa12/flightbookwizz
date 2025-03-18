
import { useEffect, useState } from 'react';

export const useInView = (ref: React.RefObject<HTMLElement>, options = {}) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isInView;
};

export const useLazyImage = (src: string) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
    };
    img.onerror = () => {
      setError(true);
    };
  }, [src]);

  return { loaded, error };
};

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const startTransition = () => {
    setIsTransitioning(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsTransitioning(false);
        resolve();
      }, 300);
    });
  };
  
  return { isTransitioning, startTransition };
};

export type Direction = 'up' | 'down' | 'left' | 'right';

export const getSlideAnimation = (direction: Direction, duration = 0.5) => {
  const directionMap = {
    up: { initial: { y: 20 }, animate: { y: 0 } },
    down: { initial: { y: -20 }, animate: { y: 0 } },
    left: { initial: { x: 20 }, animate: { x: 0 } },
    right: { initial: { x: -20 }, animate: { x: 0 } },
  };

  return {
    initial: { opacity: 0, ...directionMap[direction].initial },
    animate: { opacity: 1, ...directionMap[direction].animate },
    transition: { duration },
  };
};
