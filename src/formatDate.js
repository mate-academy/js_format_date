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
  const arr = [];
  let separator = fromFormat[3];
  let year;
  let month;
  let day;

  const dateArr = date.split(separator);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')) {
      year = dateArr[i];
    }

    if (fromFormat[i].includes('D')) {
      day = dateArr[i];
    }

    if (fromFormat[i].includes('M')) {
      month = dateArr[i];
    }
  }

  toFormat
    .map((format) => {
      if (format.includes('Y')) {
        if (year.length === format.length) {
          arr.push(year);
        }

        if (format.length < year.length) {
          arr.push(year.slice(2));
        }

        if (format.length > year.length) {
          arr.push(year >= 30 ? '19' + year : '20' + year);
        }
      }

      if (format.includes('M')) {
        arr.push(month);
      }

      if (format.includes('D')) {
        arr.push(day);
      }
    });

  separator = toFormat[3];

  return arr.join(separator);
}

module.exports = formatDate;
