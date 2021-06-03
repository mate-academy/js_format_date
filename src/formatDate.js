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
  const NewDate = date.split(fromFormat[3]);
  let year;
  let month;
  let number;
  let result = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        number = NewDate[i];
        break;
      case 'MM':
        month = NewDate[i];
        break;
      case 'YYYY':
      case 'YY':
        year = NewDate[i];
    }
  }

  for (let k = 0; k < toFormat.length - 1; k++) {
    switch (toFormat[k]) {
      case 'DD':
        result += number + toFormat[3];
        break;
      case 'MM':
        result += month + toFormat[3];
        break;
      case 'YY':
        result += year.slice(-2) + toFormat[3];
        break;

      case 'YYYY':
        if (year.length < 4) {
          if (year < 30) {
            result += 20 + year + toFormat[3];
          } else {
            result += 19 + year + toFormat[3];
          }
        } else {
          result += year + toFormat[3];
        }
    }
  }

  return result.slice(0, -1);
}

module.exports = formatDate;
