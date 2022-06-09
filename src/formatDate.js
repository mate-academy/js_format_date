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
  const formatedDate = [];
  const separator = toFormat[3];
  const arrayDate = date.split(fromFormat[3]);
  const yearShort = arrayDate[fromFormat.indexOf('YY')];
  const yearLong = arrayDate[fromFormat.indexOf('YYYY')];

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD':
        formatedDate.push(arrayDate[fromFormat.indexOf('DD')]);
        break;

      case 'MM':
        formatedDate.push(arrayDate[fromFormat.indexOf('MM')]);
        break;

      case 'YY':
        if (fromFormat.includes('YY')) {
          formatedDate.push(yearShort);
        } else {
          formatedDate.push(yearLong.slice(2));
        }
        break;

      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          formatedDate.push(yearLong);
        } else {
          if (arrayDate[fromFormat.indexOf('YY')] >= 30) {
            formatedDate.push('19' + yearShort);
          } else {
            formatedDate.push('20' + yearShort);
          };
        }
    }
  }

  return formatedDate.join(separator);
}

module.exports = formatDate;
