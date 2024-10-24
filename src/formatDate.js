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

  const dateObject = {};

  fromFormat.forEach((part, index) => {
    dateObject[part] = dateParts[index];
  });

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObject['YY'] = dateObject['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(dateObject['YY'], 10);

    dateObject['YYYY'] =
      year < 30 ? '20' + dateObject['YY'] : '19' + dateObject['YY'];
  }

  const newSeparator = toFormat[3];

  return toFormat
    .slice(0, -1)
    .map((part) => dateObject[part])
    .join(newSeparator);
}

module.exports = formatDate;
