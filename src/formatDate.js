'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorNew = toFormat[toFormat.length - 1];
  const separatorOld = fromFormat[fromFormat.length - 1];
  const dateSplited = date.split(separatorOld);
  const oldFormat = {};
  const newFormatDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    oldFormat[fromFormat[i]] = dateSplited[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (oldFormat[toFormat[i]]) {
      newFormatDate.push(oldFormat[toFormat[i]]);
    }

    if (toFormat[i] === 'YYYY' && fromFormat[i] === 'YY') {
      newFormatDate.push(formatYears(oldFormat['YY']))
    }

    if (toFormat[i] === 'YY' && fromFormat[i] === 'YYYY') {
      newFormatDate.push(oldFormat['YYYY'].slice(-2));
    }
  }

  return newFormatDate.join(separatorNew);
}

function formatYears(string) {
  return string < 30 ? 20 + string : 19 + string;
}

module.exports = formatDate;
