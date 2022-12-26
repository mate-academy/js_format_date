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
  const separatorOld = fromFormat[3];
  const dateOld = date.split(separatorOld);

  const dateNew = dateOld;

  const separatorNew = toFormat[3];

  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        year = dateOld[i];
        break;

      case 'YY':
      year = dateOld[i];
        if (year < 30) {
          year = 20 + year;
        } else {
          year = 19 + year;
        }
        break;
      
      case 'MM':
        month = dateOld[i];
        break;
      case 'DD':
        day = dateOld[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch(toFormat[i]) {
      case 'YYYY':
        dateNew[i] = year;
        break;
      case 'YY':
        dateNew[i] = year.slice(-2);
        break;
      case 'MM':
        dateNew[i] = month;
        break;
      case 'DD':
        dateNew[i] = day;
    }
  }

  return dateNew.join(separatorNew);
}

module.exports = formatDate;
