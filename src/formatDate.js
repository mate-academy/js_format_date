'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const toYearIndex = toFormat.indexOf('YY') === -1
    ? toFormat.indexOf('YYYY')
    : toFormat.indexOf('YY');

  const isChangedYear = !fromFormat.includes(toFormat[toYearIndex]);
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const resultArr = Array(3);

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('YY')) {
      const index = fromFormat.indexOf('YY') === -1
        ? fromFormat.indexOf('YYYY')
        : fromFormat.indexOf('YY');

      resultArr[i] = dateArr[index];
      continue;
    }
    resultArr[i] = dateArr[fromFormat.indexOf(toFormat[i])];
  }

  if (isChangedYear) {
    const year = resultArr[toYearIndex];

    resultArr[toYearIndex] = (year.length === 4)
      ? year.slice(-2)
      : +year < 30
        ? `20${year}`
        : `19${year}`;
  }

  return resultArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
