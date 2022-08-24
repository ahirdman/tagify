import IExperationObj from './date.interface';
import { getSecondsDiff, hasExpired } from './date.service';

describe('Calculate seconds between date objects', () => {
  test('One hour, 3600s', () => {
    const startDate = new Date('December 10, 1989 03:24:00');
    const endDate = new Date('December 10, 1989 04:24:00');

    const secondsBetween = getSecondsDiff(startDate, endDate);

    expect(secondsBetween).toBe(3600);
  });
});

describe('Validate if token has expired', () => {
  /**
   * August 24, 2022 12:52:03
   */

  const dummyTimestamp = {
    nanoseconds: 300000000,
    seconds: 1661345523,
  };

  const tokenExpires = 3600;

  test('Returns true if time elapsed >= 1 hour', () => {
    const addOneHour = new Date((dummyTimestamp.seconds + 3600) * 1000);
    const addOneDay = new Date((dummyTimestamp.seconds + 86400) * 1000);

    const evaluateOneHour = hasExpired(
      dummyTimestamp,
      tokenExpires,
      addOneHour
    );

    const evaluateOneDay = hasExpired(dummyTimestamp, tokenExpires, addOneDay);

    const evaluateNow = hasExpired(dummyTimestamp, tokenExpires);

    const expected: IExperationObj = {
      expired: true,
      expiresIn: null,
    };

    expect(evaluateOneHour).toStrictEqual(expected);
    expect(evaluateOneDay).toStrictEqual(expected);
    expect(evaluateNow).toStrictEqual(expected);
  });

  test('Returns false if time elapsed < 1 hour', () => {
    const addHalfHour = new Date((dummyTimestamp.seconds + 1800) * 1000);

    const validTokenResponse = hasExpired(
      dummyTimestamp,
      tokenExpires,
      addHalfHour
    );

    const expected: IExperationObj = {
      expired: false,
      expiresIn: 1800,
    };

    expect(validTokenResponse.expired).toBe(false);
    expect(validTokenResponse.expiresIn).toBeLessThan(3600);
    expect(validTokenResponse).toStrictEqual(expected);
  });

  test('Returns error if invalid date', () => {
    const invalidDate = new Date('0');

    const throwsError = () => {
      hasExpired(dummyTimestamp, tokenExpires, invalidDate);
    };

    expect(throwsError).toThrowError('hasExpired misfired');
  });
});
