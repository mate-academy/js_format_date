'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const fullYear = 'YYYY';
  const partYear = 'YY';
  const dataArray = date.split(fromFormat[3]);
  const newDataFormat = [];

  for (let i = 0; i < 3; i++) {
    const twoToFullDigitYear
    = dataArray[fromFormat.indexOf(toFormat[i].slice(-2))];

    if (toFormat[i] === fullYear && !fromFormat.includes(fullYear)) {
      if (twoToFullDigitYear < 30) {
        newDataFormat.push(
          `20${twoToFullDigitYear}`
        );
      } else {
        newDataFormat.push(
          `19${twoToFullDigitYear}`
        );
      }
    } else if (toFormat[i] === partYear && fromFormat.includes(fullYear)) {
      newDataFormat.push(
        dataArray[fromFormat.indexOf(`YY${toFormat[i]}`)].slice(-2)
      );
    } else {
      newDataFormat.push(dataArray[fromFormat.indexOf(toFormat[i])]);
    }
  }

  return newDataFormat.join(toFormat[3]);
}

module.exports = formatDate;
