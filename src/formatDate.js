'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const tempArr = date.split(fromFormat[3]);
  const resultArr = [];

  for (let i = 0; i <= 2; i++) {
    for (let n = 0; n <= 2; n++) {
      if (toFormat[i][0] === fromFormat[n][0]) {
        if (toFormat[i].length < fromFormat[n].length) {
          resultArr[i] = +tempArr[n] % 100;
        } else if (
          toFormat[i].length > fromFormat[n].length &&
          +tempArr[n] >= 30
        ) {
          resultArr[i] = +tempArr[n] + 1900;
        } else if (
          toFormat[i].length > fromFormat[n].length &&
          +tempArr[n] < 30
        ) {
          resultArr[i] = +tempArr[n] + 2000;
        } else {
          resultArr[i] = tempArr[n];
        }
      }
    }
  }

  return resultArr.join(toFormat[3]);
}

module.exports = formatDate;
