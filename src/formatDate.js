'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatCopy = [...fromFormat];
  const toFormatCopy = [...toFormat];

  const separator = fromFormatCopy.pop();
  const parts = date.split(separator);

  const dateParts = {};

  fromFormatCopy.forEach((part, index) => {
    dateParts[part] = parts[index];
  });

  if (toFormatCopy.includes('YY') && dateParts['YYYY']) {
    dateParts['YY'] = dateParts['YYYY'].slice(-2);
  }

  if (toFormatCopy.includes('YYYY') && dateParts['YY']) {
    dateParts['YYYY'] =
      dateParts['YY'] < '30' ? '20' + dateParts['YY'] : '19' + dateParts['YY'];
  }

  const newSeparator = toFormatCopy.pop();

  const newDate = toFormatCopy
    .map((part) => dateParts[part])
    .join(newSeparator);

  return newDate;
}

module.exports = formatDate;
