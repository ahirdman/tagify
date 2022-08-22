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
    const handleScroll = () => {
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

    if (listEl && listEl.current) {
      currentEl.addEventListener('scroll', handleScroll);
    }

    return () => {
      currentEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  React.useEffect(() => {
    if (filtered < 8 && total !== fetched) {
      setIsFetching(true);
    }
  }, [filtered]);

  return [isFetching, setIsFetching, listEl] as const;
};

export default useInfiniteScroll;
