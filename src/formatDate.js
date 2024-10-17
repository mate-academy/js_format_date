'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const dateParts = date.split(fromSeparator);

  const dateObject = {};

  dateObject[fromFormat[0]] = dateParts[0];
  dateObject[fromFormat[1]] = dateParts[1];
  dateObject[fromFormat[2]] = dateParts[2];

  const result = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YY') {
      if (dateObject['YYYY']) {
        const year = dateObject['YYYY'];

        result.push(year.slice(-2));
      }
    } else if (toFormat[i] === 'YYYY') {
      if (dateObject['YY']) {
        const year2 = dateObject['YY'];

        if (parseInt(year2) < 30) {
          result.push('20' + year2);
        } else {
          result.push('19' + year2);
        }
      } else if (dateObject['YYYY']) {
        result.push(dateObject['YYYY']);
      }
    } else {
      result.push(dateObject[toFormat[i]]);
    }
  }

  const arr = [];
  let arrToString = '';

  for (let i = 0; i < result.length; i++) {
    if (result[i] !== undefined) {
      arr.push(result[i]);
    }
  }

  arrToString = arr.join(toSeparator);

  return arrToString;
}

module.exports = formatDate;
