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
  const oldDate = date;
  // 3 is always the index of the separator
  const oldDateSplitted = oldDate.split(fromFormat[3]);

  const oldFormatYearIndex = fromFormat.indexOf('YY') === -1
    ? fromFormat.indexOf('YYYY')
    : fromFormat.indexOf('YY');
  const oldFormatMonthIndex = fromFormat.indexOf('MM');
  const oldFormatDayIndex = fromFormat.indexOf('DD');

  let newDate = '';
  const newDateSplitted = [];

  for (const formatItem of toFormat) {
    switch (formatItem) {
      case 'YY':
        newDateSplitted.push(oldDateSplitted[oldFormatYearIndex].slice(-2));
        break;

      case 'YYYY':
        let newDateYear = oldDateSplitted[oldFormatYearIndex];

        if (newDateYear.length === 2) {
          newDateYear = +newDateYear < 30
            ? '20' + newDateYear
            : '19' + newDateYear;
        }

        newDateSplitted.push(newDateYear);
        break;

      case 'MM':
        newDateSplitted.push(oldDateSplitted[oldFormatMonthIndex]);
        break;

      case 'DD':
        newDateSplitted.push(oldDateSplitted[oldFormatDayIndex]);
        break;

      default:
        break;
    }
  }

  newDate = newDateSplitted.join(toFormat[3]);

  return newDate;
}

module.exports = formatDate;
