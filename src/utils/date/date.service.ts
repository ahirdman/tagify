import { IExperationObj } from '../';
import { IFirebaseTimestamp } from '../../services';

export const getSecondsDiff = (startDate: any, endDate: any) => {
  const msInSecond = 1000;

  return Math.round(Math.abs(endDate - startDate) / msInSecond);
};

export const hasExpired = (
  timestamp: IFirebaseTimestamp,
  expiresInSec: number,
  nowDate = new Date()
): IExperationObj => {
  if (expiresInSec > 3600) {
    throw new Error(
      `Invalid expire time, default is 3600, functions recived ${expiresInSec}`
    );
  }

  const expiredDate = new Date((timestamp.seconds + expiresInSec) * 1000);

  const remainingSeconds = getSecondsDiff(expiredDate, nowDate);

  // One hour or more time has passed - Token has expired
  if (expiredDate <= nowDate) {
    return { expired: true, expiresIn: null };
  }

  // Elapsed time is less than or equal to expiresInSec @Param
  if (remainingSeconds <= expiresInSec) {
    return { expired: false, expiresIn: remainingSeconds };
  }

  throw new Error('hasExpired misfired');
};
