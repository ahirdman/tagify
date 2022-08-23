import * as React from 'react';
import useStoredRef from './useStoredRef';

// const useCallbackRef = (callback:Function) => {
//   const callbackRef = React.useRef(callback);
//   React.useLayoutEffect(() => {
//     callbackRef.current = callback;
//   }, [callback]);
//   return callbackRef;
// };

const useInfiniteScroll = (callback: Function, forceFetch: boolean) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [scrollPosition, _setScrollPosition] = React.useState(0);
  const listEl = React.useRef<HTMLUListElement>(null);

  const handleReturn = (prevState: string) => {
    listEl.current.scrollTo(0, parseInt(prevState, 10));
  };

  const setScrollPosition = useStoredRef(
    scrollPosition,
    _setScrollPosition,
    'scrollPosition',
    handleReturn
  );

  // const savedCallback = useCallbackRef(callback)

  // FIXME: - Dependency array - isFetching & setScrollPosition dependency
  React.useEffect(() => {
    const handleScroll = (): void => {
      setScrollPosition(listEl.current.scrollTop);
      if (
        listEl.current.scrollTop + listEl.current.clientHeight >=
          listEl.current.scrollHeight &&
        !isFetching
      ) {
        setIsFetching(true);
      }
    };

    handleScroll();

    const currentEl = listEl.current;

    if (currentEl) {
      currentEl.addEventListener('scroll', handleScroll);
    }

    return () => {
      currentEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // FIXME: - Dependency array - callback dependency
  React.useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  React.useEffect(() => {
    if (forceFetch) {
      setIsFetching(true);
    }
  }, [forceFetch]);

  return [isFetching, setIsFetching, listEl] as const;
};

export default useInfiniteScroll;
