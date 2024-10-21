'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObj = {};
  const splitDate = date.split(fromFormat[fromFormat.length - 1]);

  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = splitDate[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (dateObj.YY) {
      if (dateObj.YY >= 30) {
        dateObj.YYYY = '19' + dateObj.YY;
      } else {
        dateObj.YYYY = '20' + dateObj.YY;
      }
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    if (dateObj.YYYY) {
      dateObj.YY = dateObj.YYYY.slice(-2);
    }
  }

  if (dateObj.hasOwnProperty('YYYY')) {
    dateObj.YY = dateObj.YYYY.slice(2);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(dateObj[toFormat[i]]);
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
