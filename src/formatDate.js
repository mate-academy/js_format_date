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
  const separator = fromFormat.pop();
  const joiner = toFormat.pop();
  const dateParts = date.split(separator);
  const newDate = [];

  if (fromFormat[2] === toFormat[0]) {
    if (fromFormat[0] !== toFormat[2]) {
      newDate.unshift(dateParts[0].slice(-2));

      for (let i = 1; i < dateParts.length; i++) {
        newDate.unshift(dateParts[i]);
      }

      return newDate.join(joiner);
    } else {
      for (let i = 0; i < dateParts.length; i++) {
        newDate.unshift(dateParts[i]);
      }

      return newDate.join(joiner);
    }
  } else if (fromFormat[0] === toFormat[0]) {
    if (fromFormat[2] === 'YYYY' && toFormat[2] === 'YY') {
      for (let i = 0; i < dateParts.length - 1; i++) {
        newDate.push(dateParts[i]);
      }
      newDate.push(dateParts[2].slice(-2));

      return newDate.join(joiner);
    } else {
      for (let i = 0; i < dateParts.length; i++) {
        newDate.push(dateParts[i]);
      }

      return newDate.join(joiner);
    }
  } else {
    if (+dateParts[0] >= +'00' && +dateParts[0] <= '20') {
      newDate[0] = '20'.concat(dateParts[0]);

      for (let i = 1; i < dateParts.length; i++) {
        newDate.push(dateParts[i]);
      }

      return newDate.join(joiner);
    } else {
      newDate[0] = '19'.concat(dateParts[0]);

      for (let i = 1; i < dateParts.length; i++) {
        newDate.push(dateParts[i]);
      }

      return newDate.join(joiner);
    }
  }
}

module.exports = formatDate;
