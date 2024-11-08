'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const dateParts = date.split(fromSeparator);

  let year, month, day;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      year = dateParts[i];
    } else if (fromFormat[i] === 'YY') {
      year =
        parseInt(dateParts[i]) < 30 ? '20' + dateParts[i] : '19' + dateParts[i];
    } else if (fromFormat[i] === 'MM') {
      month = dateParts[i];
    } else if (fromFormat[i] === 'DD') {
      day = dateParts[i];
    }
  }

  if (toFormat.includes('YY') && year.length === 4) {
    year = year.slice(-2);
  }

  const resultParts = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      resultParts.push(year);
    } else if (toFormat[i] === 'MM') {
      resultParts.push(month);
    } else if (toFormat[i] === 'DD') {
      resultParts.push(day);
    }
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
