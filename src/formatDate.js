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
  const fromArray = date.split(fromSpliter);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        longYear = fromArray[i];
        break;

      case 'YY':
        shortYear = fromArray[i];
        break;

      case 'MM':
        month = fromArray[i];
        break;

      default:
        day = fromArray[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        if (longYear !== 0) {
          dateArray.push(longYear);
        } else {
          if (shortYear < 30) {
            year += '20' + shortYear;
          } else {
            year += '19' + shortYear;
          }
          dateArray.push(Number(year));
        }
        break;

      case 'YY':
        if (shortYear !== 0) {
          dateArray.push(shortYear);
        } else {
          year += longYear;
          year = year.split('').splice(2).join('');
          dateArray.push(Number(year));
        }
        break;

      case 'MM':
        dateArray.push(month);
        break;

      default:
        dateArray.push(day);
    }
  }

  return dateArray.join(toSpliter);
}
module.exports = formatDate;
