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
  const arrDate = date.split(fromFormat[3]);
  const objDate = {};
  const separator = toFormat[3];

  for (let i = 0; i < 3; i++) {
    objDate[fromFormat[i]] = arrDate[i];
  }

  const normalizedDate = normalizeYear({ ...objDate }, toFormat);

  return `${normalizedDate[toFormat[0]]}${separator}${
    normalizedDate[toFormat[1]]
  }${separator}${normalizedDate[toFormat[2]]}`;
}

function normalizeYear(date, format) {
  const year = date.YY || date.YYYY;
  const shortFormat = format.includes('YY');
  let updYear = '';

  if (year.length === 4 && shortFormat) {
    updYear = year.substr(2);

    return { ...date, YY: updYear };
  } else if (year.length === 2 && !shortFormat) {
    const sentury = year < 30 ? '20' : '19';

    updYear = sentury + year;

    return { ...date, YYYY: updYear };
  }

  return date;
}

module.exports = formatDate;
