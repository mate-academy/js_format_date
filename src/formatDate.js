'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const arrayFromDate = date.split(oldSeparator);
  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (let j = 0; j < fromFormat.length; j++) {
      if (toFormat[i] === 'YYYY' && fromFormat[j] === 'YY') {
        fromFormat[j] = 'YYYY';

        if (arrayFromDate[j] < 30) {
          arrayFromDate[j] = '20' + arrayFromDate[j];
        } else {
          arrayFromDate[j] = '19' + arrayFromDate[j];
        }
      }

      if (toFormat[i] === 'YY' && fromFormat[j] === 'YYYY') {
        fromFormat[j] = 'YY';

        const newFormatYear = arrayFromDate[j].slice(2);

        arrayFromDate[j] = newFormatYear;
      }

      if (toFormat[i] === fromFormat[j]) {
        result[i] = arrayFromDate[j];
      }
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
