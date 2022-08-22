import * as React from 'react';

const useStoredRef = (
  state: string | number,
  stateSetter: any,
  sessionStorageName: string,
  callback: Function
) => {
  const stateRef = React.useRef(state);

  const setState = (param: string | number) => {
    stateRef.current = param;
    stateSetter(param);
  };

  React.useEffect(() => {
    const previousState = sessionStorage.getItem(sessionStorageName);

    if (previousState) {
      callback(previousState);
      sessionStorage.removeItem(sessionStorageName);
    }

    return () => {
      if (typeof stateRef.current === 'string' && stateRef.current.length === 0)
        return;
      if (typeof stateRef.current === 'number' && stateRef.current === 0)
        return;
      sessionStorage.setItem(sessionStorageName, stateRef.current.toString());
    };
  }, []);

  return setState;
};

export default useStoredRef;
