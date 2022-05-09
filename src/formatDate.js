'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const newFormat = [];
  const initialFormat = fromFormat;
  const initialSeperator = initialFormat.pop();
  const arrayOfdate = date;
  const dateArray = arrayOfdate.split(initialSeperator);
  const requiredFormat = toFormat;
  const finalSeparator = requiredFormat.pop();
  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < fromFormat.length; i++) {
    switch (initialFormat[i]) {
      case 'YY':
        if (+dateArray[i] < 30) {
          year = `20${dateArray[i]}`;
        } else {
          year = `19${dateArray[i]}`;
        }
        break;

      case 'YYYY':
        year = dateArray[i];
        break;

      case 'MM':
        month = dateArray[i];
        break;

      case 'DD':
        day = dateArray[i];
        break;

      default:
    }
  }

  for (let i = 0; i < requiredFormat.length; i++) {
    switch (requiredFormat[i]) {
      case 'YY':
        newFormat[i] = year.slice(2);
        break;

      case 'YYYY':
        newFormat[i] = year;
        break;

      case 'MM':
        newFormat[i] = month;
        break;

      case 'DD':
        newFormat[i] = day;
        break;

      default:
    }
  }

  return newFormat.join(finalSeparator);
}
module.exports = formatDate;
