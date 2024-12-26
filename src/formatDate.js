'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let year, month, day;
  const parts = date.split(fromFormat[3]);

  fromFormat.slice(0, 3).forEach((format, index) => {
    if (format === 'YYYY' || format === 'YY') {
      year = parts[index];
    } else if (format === 'MM') {
      month = parts[index];
    } else if (format === 'DD') {
      day = parts[index];
    }
  });

  if (year.length === 4 && toFormat.includes('YY')) {
    year = year.slice(2);
  } else if (year.length === 2 && toFormat.includes('YYYY')) {
    year = (year < 30 ? '20' : '19') + year;
  }

  const newDateParts = [];

  toFormat.slice(0, 3).forEach((format) => {
    if (format === 'YYYY') {
      newDateParts.push(year);
    } else if (format === 'YY') {
      newDateParts.push(year.slice(-2));
    } else if (format === 'MM') {
      newDateParts.push(month);
    } else if (format === 'DD') {
      newDateParts.push(day);
    }
  });

  return newDateParts.join(toFormat[3]);
}

module.exports = formatDate;
