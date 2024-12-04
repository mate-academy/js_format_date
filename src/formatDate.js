'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const dateArray = date.split(oldSeparator);
  const dateObject = {};

  for (const i in fromFormat) {
    let key = fromFormat[i];
    let value = dateArray[i];

    if (key === 'YYYY' && toFormat.includes('YY')) {
      key = 'YY';
      value = [...value].slice(-2).join('');
    }

    if (key === 'YY' && toFormat.includes('YYYY')) {
      key = 'YYYY';
      value = parseInt(value) < 30 ? 20 + value : 19 + value;
    }

    dateObject[key] = value;
  }

  const newDate = {};

  for (const key of toFormat) {
    newDate[key] = dateObject[key];
  }

  return Object.values(newDate).join(newSeparator);
}

module.exports = formatDate;
