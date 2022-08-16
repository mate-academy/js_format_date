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
  const a = fromFormat[3];
  const b = toFormat[3];
  const newDate = date.split(a);
  const arr = [];
  const obj = {};

  for (let i = 0; i < newDate.length; i++) {
    obj[fromFormat[i]] = newDate[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const x = obj.YY;

    delete obj.YY;

    if (+x < 30) {
      obj.YYYY = '20' + x;
    } else {
      obj.YYYY = '19' + x;
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    const x = obj.YYYY.slice(2);

    delete obj.YYYY;
    obj.YY = x;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    arr.push(obj[toFormat[i]]);
  };

  return arr.join(b);
}

module.exports = formatDate;
