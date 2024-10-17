'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const lastElement = fromFormat[fromFormat.length - 1];
  const lastElement2 = toFormat[toFormat.length - 1];
  const dateParts = date.split(lastElement);

  const dateObject = {};

  dateObject[fromFormat[0]] = dateParts[0];
  dateObject[fromFormat[1]] = dateParts[1];
  dateObject[fromFormat[2]] = dateParts[2];

  const result = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YY') {
      if (dateObject['YY']) {
        result.push(dateObject['YY']);
      }

      const year = dateObject['YYYY'];

      if (dateObject['YYYY']) {
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
      }

      if (dateObject['YYYY']) {
        result.push(dateObject['YYYY']);
      }
    } else {
      result.push(dateObject[toFormat[i]]);
    }
  }

  const arr = [];

  for (let i = 0; i < result.length; i++) {
    if (result[i] !== undefined) {
      arr.push(result[i]);
    }
  }

  let arrToString = '';

  arrToString = arr.join(lastElement2);

  return arrToString;
}

module.exports = formatDate;
