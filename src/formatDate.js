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

  for (const num of fromFormat) {
    switch (num) {
      case 'MM':
        month = arrFromDate[fromFormat.indexOf(num)];
        break;

      case 'DD':
        day = arrFromDate[fromFormat.indexOf(num)];
        break;

      case 'YY':
        year = arrFromDate[fromFormat.indexOf(num)];
        break;

      case 'YYYY':
        year = arrFromDate[fromFormat.indexOf(num)];
        break;

      default:
        break;
    }
  }

  for (const num of toFormat) {
    switch (num) {
      case 'DD':
        dayIndex = toFormat.indexOf(num);
        break;

      case 'MM':
        monthIndex = toFormat.indexOf(num);
        break;

      case 'YY':
        yearIndex = toFormat.indexOf(num);
        break;

      case 'YYYY':
        yearIndex = toFormat.indexOf(num);
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

  return formattedDateArr.join(toFormat[3]);
}

module.exports = formatDate;
