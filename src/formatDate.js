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
  const dateObject = {};
  const dateParts = 3;
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  let dateFormatted = '';

  for (let i = 0; i < dateParts; i++) {
    dateObject[fromFormat[i]] = date.split(fromSeparator)[i];
  }

  if ('YY' in dateObject) {
    const today = new Date();
    const currentYear = today.getFullYear(new Date());

    dateObject['YYYY'] = currentYear.toString().slice(2) >= dateObject['YY']
      ? '20' + dateObject['YY']
      : '19' + dateObject['YY'];
  }

  if ('YYYY' in dateObject) {
    dateObject['YY'] = dateObject['YYYY'].slice(2);
  }

  for (let i = 0; i < dateParts; i++) {
    dateFormatted += i < (dateParts - 1)
      ? dateObject[toFormat[i]] + toSeparator
      : dateObject[toFormat[i]];
  }

  return dateFormatted;
}

module.exports = formatDate;
