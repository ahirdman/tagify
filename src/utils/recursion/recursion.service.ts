export const refreshTimer = (initialSec: number, callback: any) => {
  const timer = setTimeout(() => {
    const resp: { expires: number } = callback();
    refreshTimer(resp.expires, callback);
  }, initialSec * 1000);

  return timer;
};
