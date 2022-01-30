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
  const result = Array(3);
  let year = '';
  let month = '';
  let day = '';

  const old = fromFormat[3];
  const oldFormat = date.split(old);
  const newFormat = toFormat[3];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      year = oldFormat[i];
      continue;
    }

    if (fromFormat[i] === 'YY') {
      year = oldFormat[i];
      continue;
    }

    if (fromFormat[i] === 'MM') {
      month = oldFormat[i];
      continue;
    }

    if (fromFormat[i] === 'DD') {
      day = oldFormat[i];
      continue;
    }
  }

  const century = (year >= 30) ? 19 : 20;

  for (let q = 0; q < toFormat.length; q++) {
    if (toFormat[q] === 'DD') {
      result[q] = day;
      continue;
    }

    if (toFormat[q] === 'MM') {
      result[q] = month;
      continue;
    }

    if ((toFormat[q] === 'YYYY') && (year.length === 2)) {
      result[q] = century + year;
      continue;
    }

    if (toFormat[q] === 'YYYY') {
      result[q] = year;
      continue;
    }

    if ((toFormat[q] === 'YY') && (year.length === 4)) {
      result[q] = year[2] + year[3];
    }
  }

  return result.join(newFormat);
}

module.exports = formatDate;
