'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const sepatareDate = date.split(fromFormat[3]);
  const newDate = [];
  const oldYearIndex = fromFormat.indexOf('YY');
  const separator = toFormat[3];

  if (sepatareDate[oldYearIndex] >= 30) {
    sepatareDate[oldYearIndex] = '19' + sepatareDate[oldYearIndex];
  }

  if (sepatareDate[oldYearIndex] < 30) {
    sepatareDate[oldYearIndex] = '20' + sepatareDate[oldYearIndex];
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    let index = toFormat.indexOf(fromFormat[i]);

    if (index === -1) {
      if (fromFormat[i] === 'YYYY') {
        index = toFormat.indexOf('YY');

        sepatareDate[i] = sepatareDate[i].slice(2);
      }

      if (fromFormat[i] === 'YY') {
        index = toFormat.indexOf('YYYY');
      }
    }

    newDate[index] = sepatareDate[i];
  }

  return newDate.join(separator);
}

module.exports = formatDate;
