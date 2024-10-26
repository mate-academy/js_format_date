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
  const dateArray = date.split(fromFormat.slice(-1));
  const day = dateArray[fromFormat.indexOf('DD')];
  const month = dateArray[fromFormat.indexOf('MM')];
  const yearFromFormat = fromFormat.indexOf('YY') === -1 ? 'YYYY' : 'YY';
  const year = dateArray[fromFormat.indexOf(yearFromFormat)];
  const yearToFormat = toFormat.indexOf('YY') === -1 ? 'YYYY' : 'YY';
  const formatedYear = format(year, yearFromFormat, yearToFormat);

  result[toFormat.indexOf('DD')] = day;
  result[toFormat.indexOf('MM')] = month;
  result[toFormat.indexOf(yearToFormat)] = formatedYear;

  return result.join(toFormat.slice(-1));
}

function format(year, yearFromFormat, yearToFormat) {
  if (yearFromFormat === yearToFormat) {
    return year;
  }

  if (yearToFormat.length < yearFromFormat.length) {
    return year.slice(2);
  }

  if (yearToFormat.length > yearFromFormat.length) {
    return +year < 30 ? '20' + year : '19' + year;
  }
}

module.exports = formatDate;
