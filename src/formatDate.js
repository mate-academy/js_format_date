'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitSeparator = fromFormat[fromFormat.length - 1];
  const splitDate = date.split(splitSeparator);

  const joinSeparator = toFormat[toFormat.length - 1];

  // variables of index date fromFormate
  const fromYYYY = fromFormat.includes('YY')
    ? fromFormat.indexOf('YY')
    : fromFormat.indexOf('YYYY');
  const fromMM = fromFormat.indexOf('MM');
  const fromDD = fromFormat.indexOf('DD');

  // variables of index date toFormate
  const toYYYY = toFormat.includes('YY')
    ? toFormat.indexOf('YY')
    : toFormat.indexOf('YYYY');
  const toMM = toFormat.indexOf('MM');
  const toDD = toFormat.indexOf('DD');

  if (fromFormat[fromYYYY].length > toFormat[toYYYY].length) {
    splitDate[fromYYYY] = splitDate[fromYYYY].slice(2);
  }

  if (fromFormat[fromYYYY].length < toFormat[toYYYY].length) {
    if (+splitDate[fromYYYY] < 30) {
      splitDate[fromYYYY] = '20' + splitDate[fromYYYY];
    } else {
      splitDate[fromYYYY] = '19' + splitDate[fromYYYY];
    }
  }

  const result = [];

  result[toYYYY] = splitDate[fromYYYY];
  result[toMM] = splitDate[fromMM];
  result[toDD] = splitDate[fromDD];

  return result.join(joinSeparator);
}

module.exports = formatDate;
