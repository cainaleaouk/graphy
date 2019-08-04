import { PriceTypes } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSet(value: any) {
  return value !== undefined && value !== null;
}

/**
 * @link https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
 * Ripped the method for validating dates from here and changed for my own needs (for the sake of speed).
 */
export function isValidDate(dateString: string) {
  // First check for the pattern
  if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString)) return false;

  // Parse the date parts to integers
  var parts = dateString.split('-');
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var day = parseInt(parts[2], 10);

  // console.log(`year: ${year}, month: ${month}, day: ${day}`);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}

const PRICE_OPTIONS = ['open', 'high', 'low', 'close'];

export function isValidPrice(price: PriceTypes) {
  return PRICE_OPTIONS.includes(price);
}

export interface QueryValidatorMap {
  symbol: typeof isSet;
  since: typeof isValidDate;
  until: typeof isValidDate;
  price: typeof isValidPrice;
}

export const queryValidators: QueryValidatorMap = {
  symbol: isSet,
  since: isValidDate,
  until: isValidDate,
  price: isValidPrice,
};
