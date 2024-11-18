'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat.pop();
  const parts = date.split(separator);

  const dateParts = {};

  fromFormat.forEach((part, index) => {
    dateParts[part] = parts[index];
  });

  if (toFormat.includes('YY') && dateParts['YYYY']) {
    dateParts['YY'] = dateParts['YYYY'].slice(-2);
  }

  if (toFormat.includes('YYYY') && dateParts['YY']) {
    dateParts['YYYY'] =
      dateParts['YY'] < '30' ? '20' + dateParts['YY'] : '19' + dateParts['YY'];
  }

  const newSeparator = toFormat.pop();

  const newDate = toFormat.map((part) => dateParts[part]).join(newSeparator);

  return newDate;
}

module.exports = formatDate;
