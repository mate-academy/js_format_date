'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat, cutoffYear = 30) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const dateParts = date.split(fromSeparator);
  const dateSet = {};

  for (let i = 0; i < dateParts.length; i++) {
    dateSet[fromFormat[i]] = dateParts[i];
  }

  const newFormat = [];

  for (const key of toFormat) {
    if (dateSet[key]) {
      newFormat.push(dateSet[key]);
    } else if (key === 'YY') {
      newFormat.push(dateSet.YYYY.slice(2));
    } else if (key === 'YYYY') {
      if (dateSet.YY < cutoffYear) {
        newFormat.push('20' + dateSet.YY);
      } else {
        newFormat.push('19' + dateSet.YY);
      }
    }
  }

  return newFormat.join(toSeparator);
}

module.exports = formatDate;
