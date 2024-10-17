'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separateDate = date.split(fromFormat[3]);
  const newDate = [];
  const separator = toFormat[3];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    let index = toFormat.indexOf(fromFormat[i]);

    if (index === -1) {
      if (fromFormat[i].length === 2) {
        index = toFormat.indexOf('YYYY');

        if (separateDate[i] >= 30) {
          separateDate[i] = '19' + separateDate[i];
        }

        if (separateDate[i] < 30) {
          separateDate[i] = '20' + separateDate[i];
        }
      }

      if (fromFormat[i].length === 4) {
        index = toFormat.indexOf('YY');

        separateDate[i] = separateDate[i].slice(2);
      }
    }

    newDate[index] = separateDate[i];
  }

  return newDate.join(separator);
}

module.exports = formatDate;
