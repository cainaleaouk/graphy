import { isSet, isValidDate, isValidPrice } from './validators';
import { PriceTypes } from './types';

describe('#isSet', () => {
  it('should return true for any value that is not null or undefined', () => {
    expect(isSet(100)).toEqual(true);
    expect(isSet('100')).toEqual(true);
    expect(isSet({})).toEqual(true);
    expect(isSet(['100'])).toEqual(true);
  });

  it('should return false for any value that is null or undefined', () => {
    expect(isSet(undefined)).toEqual(false);
    expect(isSet(null)).toEqual(false);
  });
});

describe('#isValidDate', () => {
  it('should return true for a valid date string', () => {
    expect(isValidDate('2019-06-09')).toEqual(true);
  });

  it('should return false for an invalid date string', () => {
    expect(isValidDate('2019 06 09')).toEqual(false);
    expect(isValidDate('2019/06/09')).toEqual(false);
  });
});

describe('#isValidPrice', () => {
  it('should return true for a valid price type', () => {
    expect(isValidPrice(PriceTypes.CLOSE)).toEqual(true);
    expect(isValidPrice(PriceTypes.HIGH)).toEqual(true);
    expect(isValidPrice(PriceTypes.LOW)).toEqual(true);
    expect(isValidPrice(PriceTypes.OPEN)).toEqual(true);
  });

  it('should return false for an invalid price type', () => {
    // @ts-ignore
    expect(isValidPrice('asd')).toEqual(false);
  });
});
