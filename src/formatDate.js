'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const dateValues = date.split(separator);
  const dateParts = {};

  for (let i = 0; i < dateValues.length; i++) {
    dateParts[fromFormat[i]] = dateValues[i];
  }

  if (dateParts['YYYY']) {
    dateParts['YY'] = dateParts['YYYY'].slice(-2);
  } else if (dateParts['YY'] < 30) {
    dateParts['YYYY'] = `20${dateParts['YY']}`;
  } else if (dateParts['YY'] >= 30) {
    dateParts['YYYY'] = `19${dateParts['YY']}`;
  }

  const newDateArr = [];
  const newSeparator = toFormat[toFormat.length - 1];

  for (let i = 0; i < 3; i++) {
    newDateArr.push(dateParts[toFormat[i]]);
  }

  const dateToFormat = newDateArr.join(newSeparator);

  return dateToFormat;
}

module.exports = formatDate;
