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
  // write code here
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const oldDate = date.split(oldSeparator);
  const oldYearFormat = fromFormat.includes('YYYY') ? 'YYYY' : 'YY';
  const newYearFormat = toFormat.includes('YYYY') ? 'YYYY' : 'YY';
  const oldYearPosition = fromFormat.includes('YYYY')
    ? fromFormat.indexOf('YYYY') : fromFormat.indexOf('YY');
  const newYearPosition = toFormat.includes('YYYY')
    ? toFormat.indexOf('YYYY') : toFormat.indexOf('YY');

  const newDate = [];

  // find a day and a month
  newDate[toFormat.indexOf('DD')] = oldDate[fromFormat.indexOf('DD')];
  newDate[toFormat.indexOf('MM')] = oldDate[fromFormat.indexOf('MM')];

  // find a year
  fromFormat.indexOf('YYYY', 'YY');

  switch (oldYearFormat) {
    case newYearFormat: {
      newDate[newYearPosition]
        = oldDate[oldYearPosition];
      break;
    }

    case 'YYYY': {
      newDate[newYearPosition]
        = oldDate[oldYearPosition].slice(2, 4);
      break;
    }

    default: {
      if (+oldDate[oldYearPosition] >= 30) {
        newDate[newYearPosition]
          = '19' + oldDate[oldYearPosition];
      } else {
        newDate[newYearPosition]
          = '20' + oldDate[oldYearPosition];
      }
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
