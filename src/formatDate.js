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
  const dateArray = date.split(fromFormat[3]);
  const dateObj = {
    year: '',
    month: '',
    day: '',
  };
  const result = [];

  for (let i = 0; i < 1; i++) {
    switch (fromFormat[i][0]) {
      case 'Y':
        dateObj.year = dateArray[i];
        dateObj.month = dateArray[i + 1];
        dateObj.day = dateArray[i + 2];
        break;
      case 'M':
        dateObj.month = dateArray[i];
        dateObj.day = dateArray[i + 1];
        dateObj.year = dateArray[i + 2];
        break;
    }
  }

  for (const part of toFormat) {
    switch (part) {
      case 'YYYY':
        if (dateObj.year < 30) {
          dateObj.year = `20${dateObj.year}`;
        }

        if (dateObj.year.length < 3
         && dateObj.year >= 30) {
          dateObj.year = `19${dateObj.year}`;
        }
        result.push(dateObj.year);
        break;
      case 'MM': result.push(dateObj.month);
        break;
      case 'DD': result.push(dateObj.day);
        break;
      case 'YY': result.push(dateObj.year.slice(2));
        break;
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
