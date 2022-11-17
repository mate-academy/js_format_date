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
  const dataArr = date.split(fromFormat[3]);
  const updatedDate = [];
  const updateYear = (lengthDiff, year) => {
    if (lengthDiff > 0) {
      return year < 30 ? `20${year}` : `19${year}`;
    }

    if (lengthDiff < 0) {
      return year.slice(2);
    }

    return year;
  };

  const getYearData = (format) => {
    for (let i = 0; i < format.length; i++) {
      if (format[i].includes('Y')) {
        return { yearLength: format[i].length, yearIndex: i };
      }
    }
  };

  for (let i = 0; i < 3; i++) {
    if (!(toFormat[i].includes('Y'))) {
      updatedDate.push(dataArr[fromFormat.indexOf(toFormat[i])]);
    } else {
      const oldYearLength = getYearData(fromFormat).yearLength;
      const newYearLength = getYearData(toFormat).yearLength;
      const lenDiff = newYearLength - oldYearLength;
      const yearIndex = getYearData(fromFormat).yearIndex;

      updatedDate.push(updateYear(lenDiff, dataArr[yearIndex]));
    }
  }

  return updatedDate.join(toFormat[3]);
}

module.exports = formatDate;
