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
  const dateToArray = date.split(fromFormat.slice(-1));

  const dateToObject = {};

  const result = [];

  for (let i = 0; i < dateToArray.length; i++) {
    Object.assign(dateToObject, { [fromFormat[i]]: dateToArray[i] });
  }

  for (const part of toFormat) {
    switch (part) {
      case 'DD':
      case 'MM':
        result.push(dateToObject[part]);
        break;

      case 'YY':
        dateToObject['YYYY'] = dateToObject['YYYY'].slice(-2);

        result.push(dateToObject['YY'] || dateToObject['YYYY']);
        break;

      case 'YYYY':
        if (+dateToObject['YY'] < 30) {
          dateToObject['YY'] = '20' + dateToObject['YY'];
        } else {
          dateToObject['YY'] = '19' + dateToObject['YY'];
        }

        result.push(dateToObject['YYYY'] || dateToObject['YY']);
        break;
    }
  }

  return result.join(toFormat.slice(-1));
}

module.exports = formatDate;
