import * as React from 'react';

const useInfiniteScroll = (callback: Function) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const listEl = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
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

    return () => currentEl.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  return [isFetching, setIsFetching, listEl] as const;
};

export default useInfiniteScroll;
