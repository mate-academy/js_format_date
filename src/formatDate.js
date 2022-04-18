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
 *   '31/02/18',
 *   ['YY', 'MM', 'DD', '/'], fromFormat
 *   ['DD', 'MM', 'YY', '.'], toFormat
 * ) // '18.02.31'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const hasSeparator = fromFormat[3];
  const needSeparator = toFormat[3];

  const dataArr = date.split(hasSeparator);

  const dataResultArr = [];
  const dateObj = {
    'DD': null,
    'MM': null,
    'YY': null,
    'YYYY': null,
  };

  for (let i = 0; i < 3; i++) {
    if (fromFormat.indexOf(toFormat[i]) !== -1) {
      dateObj[toFormat[i]] = dataArr[fromFormat.indexOf(toFormat[i])];
      continue;
    }

    if (fromFormat[i].length > 2) {
      dateObj['YY'] = dataArr[i].slice(2);
      continue;
    }

    if (dataArr[i] >= 30) {
      dateObj['YYYY'] = '19' + dataArr[i];
    } else {
      dateObj['YYYY'] = '20' + dataArr[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD':
        dataResultArr[i] = dateObj['DD'];
        break;

      case 'MM':
        dataResultArr[i] = dateObj['MM'];
        break;

      case 'YY':
        dataResultArr[i] = dateObj['YY'];
        break;

      case 'YYYY':
        dataResultArr[i] = dateObj['YYYY'];
        break;
    }
  }

  return dataResultArr.join(needSeparator);
}

module.exports = formatDate;
