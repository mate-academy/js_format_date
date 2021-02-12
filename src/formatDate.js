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
  const oldDate = date.split(fromFormat[3]);
  const monthIndex = fromFormat.indexOf('MM');
  const dateIndex = fromFormat.indexOf('DD');

  let yearIndex = null;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      yearIndex = i;
    }
  }

  const newDate = oldDate[dateIndex];
  const newMonth = oldDate[monthIndex];
  let newYear = oldDate[yearIndex];

  const newMonthIndex = toFormat.indexOf('MM');
  const newDateIndex = toFormat.indexOf('DD');

  const result = [];

  result.length = 3;
  result.fill('null');

  result[newDateIndex] = newDate;
  result[newMonthIndex] = newMonth;

  const emptyYearIndex = result.indexOf('null');

  if (newYear.length > toFormat[emptyYearIndex].length) {
    newYear = newYear.slice(2);
  }

  if (newYear.length < toFormat[emptyYearIndex].length) {
    if (+newYear < 30) {
      newYear = 20 + newYear;
    } else {
      newYear = 19 + newYear;
    }
  }

  result[emptyYearIndex] = newYear;

  return result.join(toFormat[3]);
}

module.exports = formatDate;
