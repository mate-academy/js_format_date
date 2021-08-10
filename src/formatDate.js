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
  const dataTimeElements = date.split(`${fromFormat[fromFormat.length - 1]}`);
  let newFormat = [];
  const timeData = {
    'DD': 0,
    'MM': 0,
    'years': 0,

    get YYYY() {
      return this.years;
    },
    set YYYY(value) {
      this.years = value;
    },
    get YY() {
      return this.years.slice(2);
    },
    set YY(value) {
      if (+value > 30 || +value === 30) {
        this.years = '19' + value;
      } else {
        this.years = '20' + value;
      }
    },
  };

  fromFormat.forEach((item, index) => {
    timeData[item] = dataTimeElements[index];
  });

  toFormat.forEach((item, index) => {
    if (index !== toFormat.length - 1) {
      newFormat.push(
        index + 1 === toFormat.length - 1 ? timeData[item] : timeData[item]
          + toFormat[toFormat.length - 1]
      );
    }
  });

  newFormat = newFormat.join('');

  return newFormat;
}
module.exports = formatDate;
