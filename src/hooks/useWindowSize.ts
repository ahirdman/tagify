import * as React from 'react';

export interface Window {
  width: undefined | number;
  height: undefined | number;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState<Window>({
    width: undefined,
    height: undefined,
  });

  React.useEffect((): any => {
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

  React.useDebugValue('Window Size');

  return windowSize;
};

export default useWindowSize;
