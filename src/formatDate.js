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
  const arrFromDate = date.split(fromFormat[3]);
  const resultArr = [];

  // year
  const oldIndexY = fromFormat.indexOf('YY') >= 0
    ? fromFormat.indexOf('YY')
    : fromFormat.indexOf('YYYY');

  const newIndexY = toFormat.indexOf('YY') >= 0
    ? toFormat.indexOf('YY')
    : toFormat.indexOf('YYYY');

  if (fromFormat[oldIndexY] === 'YY' && toFormat[newIndexY] === 'YYYY') {
    if (arrFromDate[oldIndexY] >= 30) {
      resultArr[newIndexY] = '19' + arrFromDate[oldIndexY];
    } else {
      resultArr[newIndexY] = '20' + arrFromDate[oldIndexY];
    }
  } else if (fromFormat[oldIndexY] === 'YYYY' && toFormat[newIndexY] === 'YY') {
    resultArr[newIndexY] = arrFromDate[oldIndexY].slice(2);
  } else {
    resultArr[newIndexY] = arrFromDate[oldIndexY];
  }

  // month
  const oldIndexM = fromFormat.indexOf('MM');
  const newIndexM = toFormat.indexOf('MM');

  resultArr[newIndexM] = arrFromDate[oldIndexM];

  // day
  const oldIndexD = fromFormat.indexOf('DD');
  const newIndexD = toFormat.indexOf('DD');

  resultArr[newIndexD] = arrFromDate[oldIndexD];

  return resultArr.join(toFormat[3]);
}

module.exports = formatDate;
