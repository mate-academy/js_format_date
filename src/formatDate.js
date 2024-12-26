'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrFromDate = date.split(fromFormat[3]);
  let month = '';
  let year = '';
  let day = '';
  let dayIndex = null;
  let monthIndex = null;
  let yearIndex = null;
  const formattedDateArr = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'MM':
        month = arrFromDate[i];
        break;

      case 'DD':
        day = arrFromDate[i];
        break;

      case 'YY':
        year = arrFromDate[i];
        break;

      case 'YYYY':
        year = arrFromDate[i];
        break;

      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        dayIndex = i;
        break;

      case 'MM':
        monthIndex = i;
        break;

      case 'YY':
      case 'YYYY':
        yearIndex = i;
        break;

      default:
        break;
    }
  }

  if (year.length === 4 && toFormat[yearIndex].length === 2) {
    year = year.split('').splice(2).join('');
  }

  if (year.length === 2 && toFormat[yearIndex].length === 4) {
    if (year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  formattedDateArr[dayIndex] = day;
  formattedDateArr[monthIndex] = month;
  formattedDateArr[yearIndex] = year;

  return formattedDateArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
