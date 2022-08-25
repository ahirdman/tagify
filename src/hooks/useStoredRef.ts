import * as React from 'react';

const useStoredRef = (
  state: string | number,
  stateSetter: any,
  sessionStorageName: string,
  callback: Function
) => {
  const setState = (param: string | number) => {
    stateRef.current = param;
    stateSetter(param);
  };

  const stateRef = React.useRef(state);
  const callbackRef = React.useRef(callback);
  const storageNameRef = React.useRef(sessionStorageName);

  React.useLayoutEffect(() => {
    const storageName = storageNameRef.current;
    const previousState = sessionStorage.getItem(storageName);

    if (previousState) {
      callbackRef.current(previousState);
      sessionStorage.removeItem(storageName);
    }

    return () => {
      if (typeof stateRef.current === 'string' && stateRef.current.length === 0)
        return;
      if (typeof stateRef.current === 'number' && stateRef.current === 0)
        return;
      sessionStorage.setItem(storageName, stateRef.current.toString());
    };
  }, []);

  return setState;
};

export default useStoredRef;
