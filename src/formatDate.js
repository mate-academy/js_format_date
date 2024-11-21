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
  const deleteLastElement = fromFormatCopy.pop();
  const partOfDate = date.split(deleteLastElement);
  const partsOfDate = {};

  fromFormatCopy.forEach((part, index) => {
    partsOfDate[part] = partOfDate[index];
  });

  if (toFormatCopy.includes('YY') && partsOfDate['YYYY']) {
    partsOfDate['YY'] = partsOfDate['YYYY'].slice(-2);
  }

  if (toFormatCopy.includes('YYYY') && partsOfDate['YY']) {
    partsOfDate['YYYY'] =
      partsOfDate['YY'] < '30'
        ? '20' + partsOfDate['YY']
        : '19' + partsOfDate['YY'];
  }

  const newDeleteLastElement = toFormatCopy.pop();
  const newDate = toFormatCopy
    .map((part) => partsOfDate[part])
    .join(newDeleteLastElement);

  return newDate;
}

module.exports = formatDate;
