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
  const dateArrFromFormat = date.split(fromFormat[fromFormat.length - 1]);
  const dateArrToFormat = [];
  const dateObject = {};

  for (let i = 0; i < dateArrFromFormat.length; i++) {
    dateObject[fromFormat[i]] = dateArrFromFormat[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (!(toFormat[i] in dateObject)) {
      switch (toFormat[i]) {
        case 'YYYY':
          if (+dateObject['YY'] < 30) {
            dateObject['YY'] = '20' + dateObject['YY'];
          } else {
            dateObject['YY'] = '19' + dateObject['YY'];
          }

          dateArrToFormat.push(dateObject['YY']);
          break;

        case 'YY':
          dateObject['YYYY'] = dateObject['YYYY'].substr(2);

          dateArrToFormat.push(dateObject['YYYY']);
          break;
      }

      continue;
    }

    dateArrToFormat.push(dateObject[toFormat[i]]);
  }

  return dateArrToFormat.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
