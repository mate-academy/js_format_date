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
  const formatLength = fromFormat.length;
  const separatorFrom = fromFormat[formatLength - 1];
  const splitedDate = date.split(separatorFrom);
  const currentData = {};

  for (let i = 0; i < formatLength - 1; i++) {
    currentData[fromFormat[i]] = splitedDate[i];
  }

  createYearFormat(currentData);

  const convertedData = [];
  const separatorTo = toFormat[formatLength - 1];

  for (let i = 0; i < formatLength - 1; i++) {
    convertedData.push(currentData[toFormat[i]]);
  }

  return convertedData.join(separatorTo);
}

function createYearFormat(currentData) {
  const yearFormatCheck = currentData.hasOwnProperty('YY');

  switch (true) {
    case yearFormatCheck:
      const centuryCheck = +currentData.YY < 30;
      const twentys = '20' + currentData.YY;
      const ninteens = '19' + currentData.YY;

      currentData.YYYY = centuryCheck
        ? twentys
        : ninteens;

      break;
    default:
      currentData.YY = currentData.YYYY.slice(2);
  }

  return currentData;
}

module.exports = formatDate;
