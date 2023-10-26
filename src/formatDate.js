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
  const dateInArr = date.split(fromFormat[fromFormat.length - 1]);

  const dateInObj = {
    [fromFormat[0]]: dateInArr[0],
    [fromFormat[1]]: dateInArr[1],
    [fromFormat[2]]: dateInArr[2],
  };

  const dateOutObj = {
    [toFormat[0]]: '',
    [toFormat[1]]: '',
    [toFormat[2]]: '',
  };

  for (const key of Object.keys(dateOutObj)) {
    if (fromFormat.includes(key)) {
      dateOutObj[key] = dateInObj[key];
    } else {
      if ((key === 'YYYY')) {
        if (dateInObj['YY'] < 30) {
          dateOutObj[key] = 20 + dateInObj['YY'];
        } else {
          dateOutObj[key] = 19 + dateInObj['YY'];
        }
      }

      if ((key === 'YY')) {
        dateOutObj[key] = (dateInObj['YYYY'].slice(2));
      }
    }
  }

  return Object.values(dateOutObj).join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
