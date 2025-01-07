'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSpliter = fromFormat[fromFormat.length - 1];
  const toSpliter = toFormat[toFormat.length - 1];
  let longYear = 0;
  let shortYear = 0;
  let year = '';
  let month = 0;
  let day = 0;
  const dateArray = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY') {
      longYear = date.split(fromSpliter)[i];
    } else if (fromFormat[i] === 'YY') {
      shortYear = date.split(fromSpliter)[i];
    } else if (fromFormat[i] === 'MM') {
      month = date.split(fromSpliter)[i];
    } else {
      day = date.split(fromSpliter)[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' && longYear !== 0) {
      dateArray.push(longYear);
    } else if (toFormat[i] === 'YY' && shortYear !== 0) {
      dateArray.push(shortYear);
    } else if (toFormat[i] === 'YY' && longYear !== 0) {
      year += longYear;
      year = year.split('').splice(2).join('');
      dateArray.push(Number(year));
    } else if (toFormat[i] === 'YYYY' && shortYear !== 0) {
      if (shortYear < 30) {
        year += '20' + shortYear;
      } else {
        year += '19' + shortYear;
      }
      dateArray.push(Number(year));
    } else if (toFormat[i] === 'MM') {
      dateArray.push(month);
    } else {
      dateArray.push(day);
    }
  }

  return dateArray.join(toSpliter);
}
module.exports = formatDate;
