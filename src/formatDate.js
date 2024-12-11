'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [fromParts, separator] = [fromFormat.slice(0, -1), fromFormat[3]];
  const [toParts, separatorNew] = [toFormat.slice(0, -1), toFormat[3]];
  const dateParts = date.split(separator);
  const dateFrom = {};
  const dateTo = [];

  for (let i = 0; i < fromParts.length; i++) {
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

  for (let i = 0; i < toParts.length; i++) {
    dateTo.push(dateFrom[toParts[i]]);
  }

  return dateTo.join(separatorNew);
}

module.exports = formatDate;
