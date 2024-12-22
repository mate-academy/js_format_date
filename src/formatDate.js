'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateValue = date.split(fromFormat[3]);
  const oldFormat = {};
  const newFormat = [];

  for (let i = 0; i < 3; i++) {
    oldFormat[fromFormat[i]] = dateValue[i];
  }

  if (oldFormat['YY'] < 30) {
    oldFormat['YY'] = '20' + oldFormat['YY'];
  } else {
    oldFormat['YY'] = '19' + oldFormat['YY'];
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'YYYY') {
      newFormat.push(oldFormat['YYYY'] || oldFormat['YY']);
    }

    if (toFormat[i] === 'YY') {
      newFormat.push(oldFormat['YYYY'].slice(-2) || oldFormat['YY'].slice(-2));
    }

    if (toFormat[i] === 'MM') {
      newFormat.push(oldFormat['MM']);
    }

    if (toFormat[i] === 'DD') {
      newFormat.push(oldFormat['DD']);
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
