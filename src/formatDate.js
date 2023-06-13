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
  const dateList = date.split(fromFormat[3]);
  const day = dateList[fromFormat.indexOf('DD')];
  const month = dateList[fromFormat.indexOf('MM')];
  let year;

  if (fromFormat.includes('YY')) {
    year = +dateList[fromFormat.indexOf('YY')];
  } else {
    year = +dateList[fromFormat.indexOf('YYYY')];
  }

  if (
    fromFormat.includes('YY')
    && toFormat.includes('YYYY')
  ) {
    if (year < 30) {
      year += 2000;
    } else if (year < 100) {
      year += 1900;
    }
  }

  if (
    fromFormat.includes('YYYY')
    && toFormat.includes('YY')
  ) {
    year = String(year).slice(2);
  }

  const newDateList = [];

  for (const format of toFormat) {
    if (format === 'DD') {
      newDateList.push(day);
    } else if (format === 'MM') {
      newDateList.push(month);
    } else if (format === 'YY' || format === 'YYYY') {
      newDateList.push(String(year));
    }
  }

  return newDateList.join(toFormat[3]);
}

module.exports = formatDate;
