/* eslint-disable no-var */
'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 * @param {string} separatorFrom
 * @param {string} separatorTo
 *
 * @returns {string}
 */
// eslint-disable-next-line no-unused-vars
function formatDate(date, fromFormat, toFormat) {
  if (
    typeof fromFormat[fromFormat.length - 1] === 'string' &&
    fromFormat[fromFormat.length - 1].length === 1
  ) {
    // eslint-disable-next-line no-var
    var separatorFrom = fromFormat.pop();
  } else {
    // eslint-disable-next-line no-var, no-redeclare
    var separatorFrom = '-';
  }

  if (
    typeof toFormat[toFormat.length - 1] === 'string' &&
    toFormat[toFormat.length - 1].length === 1
  ) {
    var separatorTo = toFormat.pop();
  } else {
    // eslint-disable-next-line no-redeclare
    var separatorTo = '-';
  }

  const dateParts = date.split(separatorFrom);
  const dateMap = {};

  fromFormat.forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  const formattedDatePart = toFormat.map((part) => {
    if (part === 'YYYY' && dateMap['YY']) {
      return dateMap['YY'] < 30 ? '20' + dateMap['YY'] : '19' + dateMap['YY'];
    } else if (part === 'YY' && dateMap['YYYY']) {
      return dateMap['YYYY'].slice(-2);
    } else {
      return dateMap[part];
    }
  });

  return formattedDatePart.join(separatorTo);
}

module.exports = formatDate;
