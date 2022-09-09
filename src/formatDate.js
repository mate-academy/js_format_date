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

// - I ve tried to use minimum of magic methods
// |-- like: x.split().map().reduce().filter().sort().join() =).
// |-- SO here is the result:
function formatDate(date, fromFormat, toFormat) {
  // Base setup:
  const dateOld = date.split(fromFormat[3]);
  const separator = toFormat[3];
  const dateValidator = {};
  const res = [];
  let oldYear = '';
  let newYear = '';
  let century = '19';

  // Adding MM\DD\YY\YYYY keys-values to the obj:
  for (let i = 0; i < dateOld.length; i++) {
    if (fromFormat[i].indexOf('YY') !== -1) {
      oldYear = fromFormat[i];
    }

    if (toFormat[i].indexOf('YY') !== -1) {
      newYear = toFormat[i];
    }

    dateValidator[fromFormat[i]] = dateOld[i];
  }

  // Changing a year format and check the century of the year:
  if (oldYear !== newYear) {
    if (oldYear === 'YYYY' && newYear === 'YY') {
      dateValidator[newYear] = dateOld[fromFormat.indexOf(oldYear)].slice(2);
    } else if (oldYear === 'YY' && newYear === 'YYYY') {
      if (parseInt(dateValidator['YY']) < 30) {
        century = '20';
      }
      dateValidator[newYear] = century + dateOld[fromFormat.indexOf(oldYear)];
    }
  }

  // Adding new format date in to result array for return:
  for (let i = 0; i < dateOld.length; i++) {
    res.push(dateValidator[toFormat[i]]);
  }

  // Something we r looking for is here with a new separator =):
  return res.join(separator);
}

module.exports = formatDate;
