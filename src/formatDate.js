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
  const parts = date.split(fromFormat[fromFormat.length - 1]);
  const resultMap = new Map();

  fromFormat.forEach((part, index) => {
    resultMap.set(part, parts[index]);
  });

  const result = toFormat
    .map((part) => {
      const LONG_YEAR_FORMAT = 'YYYY';
      const SHORT_YEAR_FORMAT = 'YY';

      if (part.includes(SHORT_YEAR_FORMAT)) {
        let year = resultMap.get(LONG_YEAR_FORMAT);

        if (resultMap.has(SHORT_YEAR_FORMAT)) {
          year = resultMap.get(SHORT_YEAR_FORMAT);
        } else if (resultMap.has(LONG_YEAR_FORMAT)) {
          year = year.slice(-2);
        }

        if (part.includes('YYYY')) {
          if (resultMap.has(SHORT_YEAR_FORMAT)) {
            year = resultMap.get(SHORT_YEAR_FORMAT);
          } else if (resultMap.has(LONG_YEAR_FORMAT)) {
            year = year.slice(-2);
          }

          if (year < 30) {
            year = `20${year}`;
          } else {
            year = `19${year}`;
          }
        }

        return year;
      }

      return resultMap.get(part);
    })
    .join(toFormat[toFormat.length - 1]);

  return result.endsWith(toFormat[toFormat.length - 1])
    ? result.slice(0, -toFormat[toFormat.length - 1].length)
    : result;
}

module.exports = formatDate;
