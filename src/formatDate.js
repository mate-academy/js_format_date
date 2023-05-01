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
  const formattedArray = [];

  const dateInput = {

    convertDateComponent(format, value) {
      this[format] = value;

      if (format === 'YYYY') {
        this.YY = value.substring(value.length - 2);
      } else {
        this.YYYY = value < 30 ? `20${value}` : `19${value}`;
      }
    },

    separator: fromFormat[fromFormat.length - 1],
  };

  const dateArray = date.split(dateInput.separator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      dateInput.convertDateComponent(
        fromFormat[i], dateArray[i]
      );
    } else {
      dateInput[fromFormat[i]] = dateArray[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const currentType = toFormat[i];

    formattedArray.push(dateInput[currentType]);
  }

  return formattedArray.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
