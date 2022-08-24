import { useState, useEffect } from 'react';
import { IWindow } from '@utils/interface';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<IWindow>({
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
  return windowSize;
};

export default useWindowSize;
