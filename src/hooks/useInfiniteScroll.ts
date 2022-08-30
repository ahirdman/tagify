import * as React from 'react';
// import useStoredRef from './useStoredRef';

const useInfiniteScroll = (callback: Function, forceFetch: boolean) => {
  const [isFetching, setIsFetching] = React.useState(false);
  // const [scrollPosition, _setScrollPosition] = React.useState(0);
  const listEl = React.useRef<HTMLUListElement>(null);

  // const handleReturn = (prevState: string) => {
  //   listEl.current.scrollTo(0, parseInt(prevState, 10));
  // };

  // const setScrollPosition = useStoredRef(
  //   scrollPosition,
  //   _setScrollPosition,
  //   'scrollPosition',
  //   handleReturn
  // );

  const callbackRef = React.useRef(null);
  // const setScrollPositionRef = React.useRef(null);

  callbackRef.current = callback;
  // setScrollPositionRef.current = setScrollPosition;

  React.useLayoutEffect(() => {
    const handleScroll = (): void => {
      // setScrollPositionRef.current(listEl.current.scrollTop);
      if (
        listEl.current.scrollTop + listEl.current.clientHeight >=
        listEl.current.scrollHeight
      ) {
        setIsFetching(true);
      }
    };

    const currentEl = listEl.current;

    if (currentEl) {
      currentEl.addEventListener('scroll', handleScroll);
    }

    return () => {
      currentEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    if (!isFetching) return;
    callbackRef.current();
  }, [isFetching]);

  React.useEffect(() => {
    if (forceFetch) {
      setIsFetching(true);
    }
  }, [forceFetch]);

  return [isFetching, setIsFetching, listEl] as const;
};

export default useInfiniteScroll;