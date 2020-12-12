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
  const matrix = {
    YYYY: null,
    YY: null,
    MM: null,
    DD: null,
    separator: null,
  };
  const dateArr = date.split(`${fromFormat[3]}`);
  const newDateArr = [];

  fromFormat.pop();
  matrix.separator = toFormat.pop();

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        matrix.YYYY = dateArr[i];
        break;
      case 'YY':
        matrix.YY = dateArr[i];
        break;
      case 'MM':
        matrix.MM = dateArr[i];
        break;
      case 'DD':
        matrix.DD = dateArr[i];
    }
  }

  if (matrix.YY === null) {
    matrix.YY = `${matrix.YYYY[2]}${matrix.YYYY[3]}`;
  }

  if (matrix.YYYY === null) {
    if (+(matrix.YY) < 30) {
      matrix.YYYY = `20${matrix.YY}`;
    } else {
      matrix.YYYY = `19${matrix.YY}`;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    newDateArr[i] = matrix[toFormat[i]];
  }

  return newDateArr.join(matrix.separator);
}

module.exports = formatDate;
