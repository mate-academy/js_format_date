'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
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
  const partOfDatesOfDate = date.split(fromFormat[formatLength - 1]);
  let formattedDate = '';
  let year = 0;
  let yearFormatted = 0;
  let i = 0;

  while (i < formatLength) {
    switch (fromFormat[i]) {
      case 'YYYY':
        year = parseInt(partOfDatesOfDate[i], 10);
        yearFormatted = year % 100;
        i = formatLength;
        break;

      case 'YY':
        yearFormatted = parseInt(partOfDatesOfDate[i], 10);
        year = yearFormatted < 30 ? 2000 + yearFormatted : 1900 + yearFormatted;
        i = formatLength;
        break;

      default:
        i++;
    }
  }

  for (i = 0; i < formatLength; i++) {
    const partOfDate = toFormat[i];

    switch (partOfDate) {
      case 'YYYY':
        formattedDate += year;
        break;

      case 'YY':
        formattedDate += yearFormatted.toString().padStart(2, '0');
        break;

      case 'MM':
        formattedDate += partOfDatesOfDate[fromFormat.indexOf('MM')];
        break;

      case 'DD':
        formattedDate += partOfDatesOfDate[fromFormat.indexOf('DD')];
        break;

      default:
        break;
    }

    if (i < formatLength - 2) {
      formattedDate += toFormat[formatLength - 1];
    }
  }

  return formattedDate;
}

module.exports = formatDate;
