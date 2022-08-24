import { IExperationObj } from '../';

export const getSecondsDiff = (startDate: any, endDate: any) => {
  const msInSecond = 1000;

  return Math.round(Math.abs(endDate - startDate) / msInSecond);
};

export const hasExpired = (
  timestamp: any,
  expiresInSec: number,
  date = new Date()
): IExperationObj => {
  const experationTime = new Date((timestamp.seconds + expiresInSec) * 1000);

  const remainingSeconds = getSecondsDiff(experationTime, date);

  if (experationTime <= date) {
    return { expired: true, expiresIn: null };
  }

  if (remainingSeconds <= expiresInSec) {
    return { expired: false, expiresIn: remainingSeconds };
  }

  throw new Error('hasExpired misfired');
};
