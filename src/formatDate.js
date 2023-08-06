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
/* eslint-disable no-console */
function formatDate(date, fromFormat, toFormat) {
  const FORMAT_DIVIDER_INDEX = 3;
  const MAX_YEAR_TO_APPEAR = 30;
  const oldDate = date.split(fromFormat[FORMAT_DIVIDER_INDEX]);
  const oldDateCopmonets = {};
  const dateNew = [];

  for (let i = 0; i < FORMAT_DIVIDER_INDEX; i++) {
    oldDateCopmonets[fromFormat[i]] = oldDate[i];
  }

  if (oldDateCopmonets.YY) {
    if (oldDateCopmonets.YY < MAX_YEAR_TO_APPEAR) {
      oldDateCopmonets.YYYY = '20' + oldDateCopmonets.YY;
    } else {
      oldDateCopmonets.YYYY = '19' + oldDateCopmonets.YY;
    }
  }

  if (oldDateCopmonets.YYYY) {
    oldDateCopmonets.YY = oldDateCopmonets.YYYY.slice(2);
  }

  for (let i = 0; i < FORMAT_DIVIDER_INDEX; i++) {
    dateNew[i] = oldDateCopmonets[toFormat[i]];
  }

  return dateNew.join(toFormat[FORMAT_DIVIDER_INDEX]);
}
module.exports = formatDate;
