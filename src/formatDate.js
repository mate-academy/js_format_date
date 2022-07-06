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
  const yearFull = date.split(fromFormat[3])[fromFormat.indexOf('YYYY')];
  let year = date.split(fromFormat[3])[fromFormat.indexOf('YY')];
  const month = date.split(fromFormat[3])[fromFormat.indexOf('MM')];
  const day = date.split(fromFormat[3])[fromFormat.indexOf('DD')];
  const formattedDate = [];

  if (yearFull !== undefined) {
    year = yearFull;
  }

  if (year !== undefined && year.length === 2) {
    if (year >= 30) {
      year = '19' + year;
    } else {
      year = '20' + year;
    }
  }

  for (let i = 0; i <= toFormat.length - 2; i++) {
    switch (toFormat[i]) {
      case 'DD':
        formattedDate.push(day);
        break;

      case 'MM':
        formattedDate.push(month);
        break;

      case 'YYYY':
        formattedDate.push(year);
        break;

      case 'YY':
        formattedDate.push(year.substring(2, 4));
        break;
    }
  }

  return formattedDate.join(toFormat[3]);
}

module.exports = formatDate;
