import { refreshTimer } from './recursion.service';

describe('infinite refresh timer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test.only('basic use', () => {
    const callbackResponse = { expires: 3600 };
    const callback = jest.fn(_ => ({ expires: 3600 }));

    const storedTokenExpires = 1480;

    const unsubscribe = refreshTimer(storedTokenExpires, callback);

    /**
     * First Loop
     * Callback is not called
     * Duration for second iteration depends on the param supplied
     */

    expect(setTimeout).toBeCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      storedTokenExpires * 1000
    );
    expect(callback).not.toBeCalled();

    jest.runOnlyPendingTimers();

    /**
     * Second Loop
     * Callback is called once
     * Duration for thrid iteration depends on the response from the callback
     */

    expect(callback).toBeCalledTimes(1);
    expect(setTimeout).toBeCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      callbackResponse.expires * 1000
    );

    jest.runOnlyPendingTimers();

    /**
     * Third Loop
     * Callback is called twice
     * Duration for fourth iteration depends on the response from the callback
     */

    expect(callback).toBeCalledTimes(2);
    expect(setTimeout).toBeCalledTimes(3);
    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function),
      callbackResponse.expires * 1000
    );

    jest.runOnlyPendingTimers();

    /**
     * Fourth Loop
     * Callback is called three times
     * Duration for fifth iteration depends on the response from the callback
     */

    expect(callback).toBeCalledTimes(3);
    expect(setTimeout).toBeCalledTimes(4);
    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function),
      callbackResponse.expires * 1000
    );

    clearTimeout(unsubscribe);
  });
});
