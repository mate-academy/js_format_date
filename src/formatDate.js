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
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const oldFormat = date.split(oldSeparator);
  const newFormat = new Array(oldFormat.length);

  for (let i = 0; i < oldFormat.length; i++) {
    if (fromFormat[i][0] === 'Y' && toFormat.indexOf(fromFormat[i]) < 0) {
      const oldYearFormat = fromFormat[i];
      let yearShort = oldFormat[i];

      if (oldYearFormat === 'YYYY') {
        yearShort = yearShort.slice(-2);

        newFormat[toFormat.indexOf('YY')] = yearShort;
      } else if (oldYearFormat === 'YY') {
        const century = +oldFormat[i] < 30 ? 20 : 19;

        newFormat[toFormat.indexOf('YYYY')] = century + yearShort;
      }
    } else {
      newFormat[toFormat.indexOf(fromFormat[i])] = oldFormat[i];
    }
  }

  return newFormat.join(newSeparator);
}

module.exports = formatDate;
