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
  const oldDelim = fromFormat[3];
  const newDelim = toFormat[3];
  const dateToArr = date.split(oldDelim);
  const toFormatArray = [];
  const day = dateToArr[fromFormat.indexOf('DD')];
  const month = dateToArr[fromFormat.indexOf('MM')];
  const year = (fromFormat.includes('YY'))
    ? dateToArr[fromFormat.indexOf('YY')]
    : dateToArr[fromFormat.indexOf('YYYY')];

  for (let i = 0; i < dateToArr.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        toFormatArray.push(day);
        break;

      case 'MM':
        toFormatArray.push(month);
        break;

      case 'YY':
        if (fromFormat.includes('YY')) {
          toFormatArray.push(year);
        } else {
          toFormatArray.push(dateToArr[fromFormat.indexOf('YYYY')].slice(2, 4));
        }
        break;

      case 'YYYY':
        // if (dateToArr[fromFormat.indexOf('YYYY')] > -1) {
        if (dateToArr[fromFormat.indexOf('YYYY')] > -1) {
          toFormatArray.push(year);
        } else {
          if (dateToArr[fromFormat.indexOf('YY')] >= 30) {
            toFormatArray.push('19' + year);
          } else {
            toFormatArray.push('20' + year);
          }
        }
        break;
    }
  }

  return toFormatArray.join(newDelim);
}

module.exports = formatDate;
