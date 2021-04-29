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
  const dateArr = date.split(fromFormat[3]);
  const newDate = [];

  for (const iterator of toFormat) {
    if (iterator === 'DD') {
      newDate.push(dateArr[fromFormat.indexOf('DD')]);
    }

    if (iterator === 'MM') {
      newDate.push(dateArr[fromFormat.indexOf('MM')]);
    }

    if (iterator === 'YY') {
      if (fromFormat.includes('YY')) {
        newDate.push(dateArr[fromFormat.indexOf('YY')]);
      } else {
        newDate.push(dateArr[fromFormat.indexOf('YYYY')]
          .split('').splice(2).join(''));
      }
    }

    if (iterator === 'YYYY') {
      if (fromFormat.includes('YYYY')) {
        newDate.push(dateArr[fromFormat.indexOf('YYYY')]);
      } else {
        if (dateArr[fromFormat.indexOf('YY')] < 30) {
          newDate.push('20' + dateArr[fromFormat.indexOf('YY')]);
        } else {
          newDate.push('19' + dateArr[fromFormat.indexOf('YY')]);
        }
      }
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
