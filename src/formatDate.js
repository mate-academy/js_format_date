'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrDate = date.split(fromFormat[fromFormat.length - 1]);
  const arrResult = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (toFormat[i] === 'YY' && fromFormat[j] === 'YYYY') {
        arrResult.push(arrDate[j].slice(-2));
      }

      if (toFormat[i] === 'YYYY' && fromFormat[j] === 'YY') {
        const year = parseInt(arrDate[j], 10);

        if (year < 30) {
          arrResult.push('20' + arrDate[j]);
        } else {
          arrResult.push('19' + arrDate[j]);
        }
      }

      if (toFormat[i] === fromFormat[j]) {
        arrResult.push(arrDate[j]);
      }
    }
  }

  return arrResult.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
