'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromDelimiter = fromFormat[fromFormat.length - 1];
  const toDelimiter = toFormat[toFormat.length - 1];

  const fromParts = fromFormat.slice(0, -1);
  const toParts = toFormat.slice(0, -1);

  const dateParts = date.split(fromDelimiter);

  const dateMap = {};

  fromFormat.forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  if (fromParts.includes('YY') && toParts.includes('YYYY')) {
    dateMap['YYYY'] =
      parseInt(dateMap['YY']) < 30
        ? '20' + dateMap['YY']
        : '19' + dateMap['YY'];
  } else if (fromParts.includes('YYYY') && toParts.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  const newDateParts = toParts.map((part) => dateMap[part]);

  return newDateParts.join(toDelimiter);
}

module.exports = formatDate;
