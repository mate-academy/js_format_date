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
  const splitedDate = date.split(fromFormat[3]);
  const newFormatToDate = toFormat.slice(0, 3);
  const curentYear = splitedDate[fromFormat.findIndex(el => el.includes('Y'))];
  const dateObj = {
    DD: splitedDate[fromFormat.findIndex(el => el.includes('D'))],
    MM: splitedDate[fromFormat.findIndex(el => el.includes('M'))],
    separator: [toFormat[3]],
  };

  if (curentYear.length > 2) {
    dateObj.YY = curentYear.slice(2);
    dateObj.YYYY = curentYear;
  } else {
    dateObj.YY = curentYear;

    if (curentYear < 30) {
      dateObj.YYYY = '20' + curentYear;
    } else {
      dateObj.YYYY = '19' + curentYear;
    }
    // curentYear < 30
    //   ? dateObj.YYYY = '20' + curentYear
    //   : dateObj.YYYY = '19' + curentYear;
    // ^^^^^^^- Just want to understand why commented code above make this:
    // --->   "error  Expected an assignment or function call and instead saw an expression"
  }

  newFormatToDate.forEach((element, i, arr) => {
    arr[i] = dateObj[element];
  });

  return newFormatToDate.join(dateObj.separator);
}

module.exports = formatDate;
