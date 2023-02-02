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
  let newFormatDate = date.split(fromFormat[3]);

  if (fromFormat.indexOf('DD') !== toFormat.indexOf('DD')) {
    newFormatDate = newFormatDate.reverse();
  }

  if (fromFormat[0].length > toFormat[0].length) {
    newFormatDate[0].slice(2);
  }

  if (fromFormat[2].length > toFormat[2].length) {
    newFormatDate[2] = newFormatDate[2].slice(2);
  }

  if (newFormatDate[0].length < toFormat[0].length && +newFormatDate[0] < 30) {
    newFormatDate[0] = `20${newFormatDate[0]}`;
  }

  if (newFormatDate[0].length < toFormat[0].length && +newFormatDate[0] >= 30) {
    newFormatDate[0] = `19${newFormatDate[0]}`;
  }

  if (newFormatDate[2].length < toFormat[2].length && +newFormatDate[2] < 30) {
    newFormatDate[2] = `20${newFormatDate[2]}`;
  }

  if (newFormatDate[0].length < toFormat[0].length && +newFormatDate[0] >= 30) {
    newFormatDate[2] = `19${newFormatDate[2]}`;
  }

  return newFormatDate.join(toFormat[3]);
}

module.exports = formatDate;
