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
  const dateInArrey = date.split(fromFormat[3]);
  const yearFull = 'YYYY';
  const yearShort = 'YY';
  const month = 'MM';
  const day = 'DD';
  const sortNum = {};
  const formatedDay = [];

  for (let i = 0; i < dateInArrey.length; i++) {
    sortNum[fromFormat[i]] = dateInArrey[i];
  }

  for (let i = 0; i < dateInArrey.length; i++) {
    switch (toFormat[i]) {
      case day:
        formatedDay.push(sortNum[day]);
        break;

      case month:
        formatedDay.push(sortNum[month]);
        break;

      case yearFull:
        const newFullForm = sortNum[yearShort] < 30 ? `20${sortNum[yearShort]}` : `19${sortNum[yearShort]}`;

        if (sortNum[yearShort]) {
          formatedDay.push(newFullForm);
        } else {
          formatedDay.push(sortNum[yearFull]);
        }
        break;

      case yearShort:
        if (sortNum[yearFull]) {
          const newForm = sortNum[yearFull].slice(-2);

          formatedDay.push(newForm);
        } else {
          formatedDay.push(sortNum[yearShort]);
        }
        break;

      default:
        break;
    }
  }

  return formatedDay.join(toFormat[3]);
}

module.exports = formatDate;
