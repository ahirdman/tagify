import { useDebugValue, useEffect, useState } from 'react';

export interface Window {
  width: undefined | number;
  height: undefined | number;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Window>({
    width: undefined,
    height: undefined,
  });

  useEffect((): any => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useDebugValue('Window Size');

  return windowSize;
};

export default useWindowSize;
