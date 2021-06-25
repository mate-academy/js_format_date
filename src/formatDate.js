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
  const separator = fromFormat[3];
  const newSeparator = toFormat[3];
  const fromArr = date.split(`${separator}`);
  const toArr = [];
  const day = 'DD';
  const month = 'MM';

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === day) {
      toArr.push(fromArr[fromFormat.indexOf(day)]);
    }

    if (toFormat[i] === month) {
      toArr.push(fromArr[fromFormat.indexOf(month)]);
    }

    if (toFormat[i] === 'YY') {
      if (fromFormat.includes('YY')) {
        toArr.push(fromArr[toFormat.indexOf('YY')]);
      } else {
        toArr.push(fromArr[toFormat.indexOf('YY')].split('').slice(2).join(''));
      }
    }

    if (toFormat[i] === 'YYYY') {
      if (fromFormat.includes('YYYY')) {
        toArr.push(fromArr[fromFormat.indexOf('YYYY')]);
      } else {
        if (fromArr[fromFormat.indexOf('YY')] < 30) {
          toArr.push('20' + fromArr[fromFormat.indexOf('YY')]);
        } else {
          toArr.push('19' + fromArr[fromFormat.indexOf('YY')]);
        }
      }
    }
  }

  return toArr.join(`${newSeparator}`);
}

module.exports = formatDate;
