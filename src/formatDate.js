'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();

  const dateParts = date.split(separatorFrom);
  const dateMap = {};

  fromFormat.forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  const formattedDateParts = toFormat.map((part) => {
    if (part === 'YYYY' && dateMap['YY']) {
      return dateMap['YY'] < 30 ? '20' + dateMap['YY'] : '19' + dateMap['YY'];
    } else if (part === 'YY' && dateMap['YYYY']) {
      return dateMap['YYYY'].slice(-2);
    } else {
      return dateMap[part];
    }
  });

  return formattedDateParts.join(separatorTo);
}

module.exports = formatDate;
