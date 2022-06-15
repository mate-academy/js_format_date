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
  // write code here

  const date1 = date.split(fromFormat[3]);
  const result = [];

  const day = date1[fromFormat.indexOf('DD')];

  result[toFormat.indexOf('DD')] = day;

  const month = date1[fromFormat.indexOf('MM')];

  result[toFormat.indexOf('MM')] = month;

  let year;

  if (fromFormat.includes('YY')) {
    year = date1[fromFormat.indexOf('YY')];

    if (toFormat.includes('YYYY')) {
      if (year >= 30) {
        year = Number(`19${year}`);
      } else {
        year = Number(`20${year}`);
      }
    }
  } else {
    year = date1[fromFormat.indexOf('YYYY')];

    if (toFormat.includes('YY')) {
      year = `${year}`.slice(2, 4);
    }
  }

  if (toFormat.includes('YY')) {
    result[toFormat.indexOf('YY')] = year;
  } else {
    result[toFormat.indexOf('YYYY')] = year;
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
