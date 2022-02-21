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
  const startDate = date.split(fromFormat[3]);
  const finishDate = [];
  let day;
  let month;
  let year;

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      day = startDate[i];
    } else if (fromFormat[i] === 'MM') {
      month = startDate[i];
    } else if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = startDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      finishDate.push(day);
    } else if (toFormat[i] === 'MM') {
      finishDate.push(month);
    } else if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      if (year.length > toFormat[i].length) {
        year = year.substring(2);
      }

      if (year.length < toFormat[i].length) {
        year = +year < 30 ? '20' + year : '19' + year;
      }

      finishDate.push(year);
    }
  }

  return finishDate.join(toFormat[3]);
}

module.exports = formatDate;
