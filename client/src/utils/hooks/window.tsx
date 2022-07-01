import { useState, useEffect } from 'react';
import { IWindow } from '../interface';

// const getWindowWidth = () => {
//   const { innerWidth: width } = window;
//   return {
//     width,
//   };
// };

// const useWindowWidth = () => {
//   const [windowWidth, setWindowWidth] = useState<any>();

//   useEffect(() => {
//     if (!window) return;
//     const handleResize = () => {
//       setWindowWidth(getWindowWidth());
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return windowWidth;
// };

// export default useWindowWidth;

const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<IWindow>({
    width: undefined,
    height: undefined,
  });

  useEffect((): any => {
    console.log('useWindow');
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      const handleResize = () => {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};

export default useWindowSize;
