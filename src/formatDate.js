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
  let day = '';
  let month = '';
  let year = '';
  const sepOldDate = fromFormat[fromFormat.length - 1];
  const sepNewDate = toFormat[toFormat.length - 1];
  const dateSeparatedArray = date.split(sepOldDate);
  const newDateArray = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day += dateSeparatedArray[i];

        break;

      case 'MM':
        month += dateSeparatedArray[i];

        break;

      case 'YY':
      case 'YYYY':
        year += dateSeparatedArray[i];

        break;

      default:
        throw new Error('Bad format date');
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('Y') && toFormat[i].length === year.length) {
      newDateArray[i] = year;
    } else if (toFormat[i] === 'YY' && year.length === 4) {
      newDateArray[i] = year.slice(-2);
    } else if (toFormat[i] === 'YYYY' && year.length === 2) {
      if (+year < 30) {
        newDateArray[i] = 20 + year;
      } else {
        newDateArray[i] = 19 + year;
      }
    } else if (toFormat[i] === 'MM') {
      newDateArray[i] = month;
    } else if (toFormat[i] === 'DD') {
      newDateArray[i] = day;
    }
  }

  return newDateArray.join(sepNewDate);
}

module.exports = formatDate;
