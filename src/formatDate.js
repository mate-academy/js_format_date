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
  const dateLength = fromFormat.length - 1;
  const iconSplit = fromFormat[dateLength];
  const iconJoin = toFormat[dateLength];
  const dateArr = date.split(iconSplit);
  const dateObj = {};
  const result = [];

  for (let i = 0; i < dateLength; i++) {
    dateObj[fromFormat[i]] = dateArr[i];
  }

  for (let j = 0; j < dateLength; j++) {
    if (dateObj[toFormat[j]]) {
      result.push(dateObj[toFormat[j]]);
    } else {
      if (toFormat[j] === 'YY') {
        result.push(dateObj['YYYY'].slice(-2));
      }

      if (toFormat[j] === 'YYYY') {
        if (dateObj['YY'] < 30) {
          result.push(`20${dateObj['YY']}`);
        } else {
          result.push(`19${dateObj['YY']}`);
        }
      }
    }
  }

  return result.join(iconJoin);
}

module.exports = formatDate;
