'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = {};
  const newDateParts = [];
  const split = fromFormat.pop();
  const newSplit = toFormat.pop();
  const cutDate = date.split(split);

  for (let i = 0; i < fromFormat.length; i++) {
    dateParts[fromFormat[i]] = cutDate[i];
  }

  for (const part of toFormat) {
    if (part === 'YY' && dateParts['YYYY']) {
      newDateParts.push(dateParts['YYYY'].slice(-2));
    } else if (part === 'YYYY' && dateParts['YY']) {
      const year = parseInt(dateParts['YY'], 10);

      if (year < 30) {
        newDateParts.push('20' + (year < 10 ? '0' + year : year));
      } else {
        newDateParts.push('19' + year);
      }
    } else {
      newDateParts.push(dateParts[part]);
    }
  }

  return newDateParts.join(newSplit);
}

module.exports = formatDate;
