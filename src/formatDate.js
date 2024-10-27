'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const result = Array(3).fill(0);
  const fromSeparator = date.match(/[^\w\s]/);

  const toSeparator = toFormat[toFormat.length - 1].match(/[^\w\s]/)
    ? toFormat[toFormat.length - 1]
    : fromSeparator;
  const dateArray = date.split(fromSeparator);
  const day = dateArray[fromFormat.indexOf('DD')];
  const month = dateArray[fromFormat.indexOf('MM')];
  const yearFromFormat = fromFormat.indexOf('YY') === -1 ? 'YYYY' : 'YY';
  const year = dateArray[fromFormat.indexOf(yearFromFormat)];
  const yearToFormat = toFormat.indexOf('YY') === -1 ? 'YYYY' : 'YY';
  let formatedYear = year;

  if (yearToFormat.length < yearFromFormat.length) {
    formatedYear = year.slice(2);
  }

  if (yearToFormat.length > yearFromFormat.length) {
    formatedYear = +year < 30 ? '20' + year : '19' + year;
  }

  result[toFormat.indexOf('DD')] = day;
  result[toFormat.indexOf('MM')] = month;
  result[toFormat.indexOf(yearToFormat)] = formatedYear;

  return result.join(toSeparator);
}

module.exports = formatDate;
