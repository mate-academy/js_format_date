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
  let year = '';
  let mounth = '';
  let day = '';
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  const dateArr = date.split(separatorFrom);
  const newFormat = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (true) {
      case fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY':
        year = dateArr[i];
        break;
      case fromFormat[i] === 'MM':
        mounth = dateArr[i];
        break;
      case fromFormat[i] === 'DD':
        day = dateArr[i];
        break;
    }
  }

  toFormat.forEach(val => {
    switch (true) {
      case val === 'YY' || val === 'YYYY':
        if (year.length < val.length) {
          if (year < 30) {
            year = `20${year}`;
          } else {
            year = `19${year}`;
          }
        } else if (year.length > val.length) {
          year = year.split('').slice(2).join('');
        }
        newFormat.push(year);
        break;
      case val === 'MM':
        newFormat.push(mounth);
        break;
      case val === 'DD':
        newFormat.push(day);
        break;
    }
  });

  return newFormat.join(separatorTo);
}

module.exports = formatDate;
