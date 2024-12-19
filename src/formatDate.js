'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [toParts] = [toFormat.slice()];
  const [fromParts] = [fromFormat.slice()];
  const separators = ['-', '/', ' ', '.'];
  const separator = findSeparator(date, separators);
  const newSeparator = findSeparator(toFormat, separators);

  function findSeparator(enterDate, separatorsArr) {
    for (let i = 0; i < separatorsArr.length; i++) {
      if (enterDate.includes(separatorsArr[i])) {
        return separatorsArr[i];
      }
    }
  }

  const dateParts = date.split(separator);
  const dateFrom = {};
  const dateTo = [];

  for (let i = 0; i < fromFormat.length; i++) {
    dateFrom[fromParts[i]] = dateParts[i];
  }

  if (dateFrom.YYYY) {
    dateFrom.YY = dateFrom.YYYY.slice(-2);
  } else if (dateFrom.YY) {
    if (dateFrom.YY < 30) {
      dateFrom.YYYY = `20${dateFrom.YY}`;
    } else {
      dateFrom.YYYY = `19${dateFrom.YY}`;
    }
  }

  for (let i = 0; i < toParts.length - 1; i++) {
    dateTo.push(dateFrom[toParts[i]]);
  }

  return dateTo.join(newSeparator);
}

module.exports = formatDate;
