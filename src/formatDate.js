'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let fromSeparator = '';

  for (const arg of fromFormat) {
    if (arg !== 'YYYY' || arg !== 'YY' || arg !== 'MM' || arg !== 'DD') {
      fromSeparator = arg;
    }
  }

  const dateParts = date.split(fromSeparator);

  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = dateParts[i];
    } else if (fromFormat[i] === 'MM') {
      month = dateParts[i];
    } else {
      day = dateParts[i];
    }
  }

  if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    year = year < 30 ? `20${year}` : `19${year}`;
  } else if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    year = year.slice(-2);
  }

  const newDateParts = [];

  let toSeparator;

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      newDateParts.push(year);
    } else if (toFormat[i] === 'MM') {
      newDateParts.push(month);
    } else if (toFormat[i] === 'DD') {
      newDateParts.push(day);
    } else {
      toSeparator = toFormat[i];
    }
  }

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
