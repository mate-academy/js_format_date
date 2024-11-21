'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromDelimiter = fromFormat[3];
  const toDelimiter = toFormat[3];
  const dateParts = date.split(fromDelimiter);
  const finalResult = [];
  let day, month, year;

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateParts[i];
        break;

      case 'MM':
        month = dateParts[i];
        break;

      case 'YYYY':
        year = dateParts[i];
        break;

      case 'YY':
        if (+dateParts[i] < 30) {
          year = 20 + dateParts[i];
        } else {
          year = 19 + dateParts[i];
        }
        break;

      default:
        throw new Error('unspecified format to conver from');
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'DD':
        finalResult[i] = day;
        break;

      case 'MM':
        finalResult[i] = month;
        break;

      case 'YYYY':
        finalResult[i] = year;
        break;

      case 'YY':
        finalResult[i] = year.slice(2);
        break;

      default:
        throw new Error('unspecified format to convert into');
    }
  }

  return finalResult.join(toDelimiter);
}

module.exports = formatDate;
