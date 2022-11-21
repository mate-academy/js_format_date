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
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  const dateArrFrom = date.split(separatorFrom);
  const dateArrTo = [];
  
  let day, month, year;

  for (let i = 0; i < toFormat.length - 1; i++) {
    const current = fromFormat[i];

      if (current.includes('Y') && toFormat.indexOf(current) === -1) {
        year = dateArrFrom[i];

      switch (current) {
        case 'YYYY':
          year = year.slice(2);
          break;
        case 'YY':
          year = year < 30 ? `20${year}` : `19${year}`;
          break;
      }
    } else {
      if (current.includes('Y')) {
        year = dateArrFrom[i];
      }

      if (current.includes('D')) {
        day = dateArrFrom[i];
      }

      if (current.includes('M')) {
        month = dateArrFrom[i];
      }
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    const current = toFormat[i];

    if (current.includes('Y')) {
      dateArrTo.push(year);
    }

    if (current.includes('D')) {
      dateArrTo.push(day);
    }

    if (current.includes('M')) {
      dateArrTo.push(month);
    }
  }

  return dateArrTo.join(separatorTo);
}

module.exports = formatDate;
