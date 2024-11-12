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
  const dateParts = date.split(separator);

  const dateObj = {};

  fromFormat
    .slice(0, 3)
    .forEach((part, index) => (dateObj[part] = dateParts[index]));

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObj['YY'] = dateObj['YYYY'].slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(dateObj['YY'], 10);

    dateObj['YYYY'] = year < 30 ? `20${dateObj['YY']}` : `19${dateObj['YY']}`;
  }

  const newSeparator = toFormat[3];
  const formattedDate = toFormat
    .slice(0, 3)
    .map((part) => dateObj[part])
    .join(newSeparator);

  return formattedDate;
}

module.exports = formatDate;
