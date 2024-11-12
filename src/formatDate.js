'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const dateParts = date.split(fromSeparator);
  const obj = {};
  const result = [];

  for (let i = 0; i <= fromFormat.length - 2; i++) {
    if (fromFormat[i] === 'DD') {
      obj.day = dateParts[i];
    }

    if (fromFormat[i] === 'MM') {
      obj.month = dateParts[i];
    }

    if (fromFormat[i] === 'YYYY') {
      obj.year = dateParts[i];
    }

    if (fromFormat[i] === 'YY') {
      if (dateParts[i] < 30) {
        obj.year = `20${dateParts[i]}`;
      } else {
        obj.year = `19${dateParts[i]}`;
      }
    }
  }

  for (const part of toFormat) {
    if (part === 'YYYY') {
      result.push(obj.year);
    }

    if (part === 'YY') {
      result.push(obj.year.split('').slice(2).join(''));
    }

    if (part === 'DD') {
      result.push(obj.day);
    }

    if (part === 'MM') {
      result.push(obj.month);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
