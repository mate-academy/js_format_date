'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const parts = date.split(separator);

  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = parts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObj['YY'] = dateObj['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(dateObj['YY'], 10);

    dateObj['YYYY'] = year < 30 ? `20${dateObj['YY']}` : `19${dateObj['YY']}`;
  }

  const newSeparator = toFormat[3];
  const newDate = toFormat
    .slice(0, 3)
    .map((part) => dateObj[part])
    .join(newSeparator);

  return newDate;
}

module.exports = formatDate;
