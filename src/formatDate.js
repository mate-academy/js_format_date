'use strict';

/**

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
//  The function can change a separator, reorder the date parts of convert a
//  * year from 4 digits to 2 digits and back.
//  *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
//  *   When converting from
// *   Time flies, standards change. Let's get rid of the routine of changing
//      the
// * date format. Create a `formatDate` function that accepts the `date` string,
// * the old `fromFormat` array and the new `toFormat` array. Function returns
// * given date in new format.
// *   YY to YYYY use 20YY if YY < 30 and 19YY otherwise.

function formatDate(date, fromFormat, toFormat) {
  const newDate = date.split(fromFormat[3]);
  const day = newDate[fromFormat.indexOf('DD')];
  const month = newDate[fromFormat.indexOf('MM')];
  const year = newDate[fromFormat.indexOf('YYYY')]
  || newDate[fromFormat.indexOf('YY')];

  const newFormat = [...toFormat];
  const separator = newFormat[3];
  const century = (year < 30) ? 20 : 19;

  newFormat[newFormat.indexOf('DD')] = day;
  newFormat[newFormat.indexOf('MM')] = month;

  newFormat[newFormat.indexOf('YYYY')] = (year.length === 4)
    ? year
    : century + year;

  newFormat[newFormat.indexOf('YY')] = (year.length === 2)
    ? year
    : year.slice(2);

  const finalDate = newFormat.splice(0, 3).join(separator);

  return finalDate;
}

module.exports = formatDate;
