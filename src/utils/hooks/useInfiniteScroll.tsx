import * as React from 'react';

interface IUseInfiniteScrollProps {
  callback: any;
  element: any;
}

const useInfiniteScroll = ({ callback, element }: IUseInfiniteScrollProps) => {
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    element.addEventListener('scroll', handleScroll);
    return () => element.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    if (!isFetching) return;
    callback(() => {
      console.log('called back');
    });
  }, [isFetching]);

  const handleScroll = () => {
    if (
      element.scrollTop + element.clientHeight >= element.scrollHeight ||
      !isFetching
    ) {
      setIsFetching(true);
    }
  };

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
