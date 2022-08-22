import * as React from 'react';
import useStoredRef from './useStoredRef';

const useInfiniteScroll = (
  callback: Function,
  total: number,
  fetched: number,
  filtered: number
) => {
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

  React.useEffect(() => {
    console.log('scroll effect');

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

    const currentEl = listEl.current;

    if (currentEl) {
      currentEl.addEventListener('scroll', handleScroll);
    }

    return () => {
      currentEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    console.log('callback effect');

    if (!isFetching) return;
    callback();
  }, [isFetching]);

  React.useEffect(() => {
    console.log('filter effect');
    if (filtered < 8 && total !== fetched) {
      setIsFetching(true);
    }
  }, [filtered, fetched, total]);

  return [isFetching, setIsFetching, listEl] as const;
};

export default useInfiniteScroll;
