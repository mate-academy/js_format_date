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
  const oldDateFormat = {};
  const separatedDate = date.split(separator);

  fromFormat.slice(0, 3).forEach((key, index) => {
    oldDateFormat[key] = separatedDate[index];
  });

  if (fromFormat.includes('YY')) {
    oldDateFormat['YYYY'] =
      parseInt(oldDateFormat['YY'], 10) < 30
        ? '20' + oldDateFormat['YY']
        : '19' + oldDateFormat['YY'];
  } else if (fromFormat.includes('YYYY')) {
    oldDateFormat['YY'] = oldDateFormat['YYYY'].slice(-2);
  }

  const newSeparator = toFormat[3];
  const resultDate = toFormat
    .slice(0, 3)
    .map((part) => oldDateFormat[part])
    .join(newSeparator);

  return resultDate;
}

module.exports = formatDate;
