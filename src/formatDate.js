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
  const oldYearIndex = fromFormat.indexOf('YY');
  const separator = toFormat[3];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    let index = toFormat.indexOf(fromFormat[i]);

    if (index === -1) {
      if (fromFormat[i] === 'YYYY') {
        index = toFormat.indexOf('YY');

        separateDate[i] = separateDate[i].slice(2);
      }

      if (fromFormat[i] === 'YY') {
        index = toFormat.indexOf('YYYY');

        if (separateDate[oldYearIndex] >= 30) {
          separateDate[oldYearIndex] = '19' + separateDate[oldYearIndex];
        }

        if (separateDate[oldYearIndex] < 30) {
          separateDate[oldYearIndex] = '20' + separateDate[oldYearIndex];
        }
      }
    }

    newDate[index] = separateDate[i];
  }

  return newDate.join(separator);
}

module.exports = formatDate;
