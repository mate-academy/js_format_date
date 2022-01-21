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
  const fromYearIndex = fromFormat.indexOf('YY') !== -1
    ? fromFormat.indexOf('YY') : fromFormat.indexOf('YYYY');
  const fromMonthIndex = fromFormat.indexOf('MM');
  const fromDayIndex = fromFormat.indexOf('DD');

  const splittedDate = date.split(fromFormat[3]);

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case ('DD'): {
        toFormat[i] = splittedDate[fromDayIndex];
        break;
      }

      case ('MM'): {
        toFormat[i] = splittedDate[fromMonthIndex];
        break;
      }

      case ('YY'): {
        toFormat[i] = splittedDate[fromYearIndex].length === 2
          ? splittedDate[fromYearIndex]
          : splittedDate[fromYearIndex].slice(2);
        break;
      }

      case ('YYYY'): {
        toFormat[i] = splittedDate[fromYearIndex].length === 4
          ? splittedDate[fromYearIndex]
          : splittedDate[fromYearIndex].slice(0, 2) < 30
            ? 20 + splittedDate[fromYearIndex]
            : 19 + splittedDate[fromYearIndex];
        break;
      }

      default: {
        break;
      }
    }
  }

  return toFormat.slice(0, 3).join(toFormat[3]);
}

module.exports = formatDate;
