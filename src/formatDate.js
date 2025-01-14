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
  const separator = fromFormat[fromFormat.length - 1];
  const splitDate = date.split(separator);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YY') {
      dateParts['YYYY'] =
        +splitDate[i] < 30 ? `20${splitDate[i]}` : `19${splitDate[i]}`;
    } else {
      dateParts[fromFormat[i]] = splitDate[i];
    }
  }

  if (toFormat.includes('YY') && !dateParts['YY']) {
    dateParts['YY'] = dateParts['YYYY'].slice(-2);
  }

  const newSeparator = toFormat[toFormat.length - 1];

  return toFormat
    .slice(0, -1)
    .map((part) => dateParts[part])
    .join(newSeparator);
}

module.exports = formatDate;
