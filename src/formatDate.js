'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);
  const dateObj = {};

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i].charAt(fromFormat[i].length - 1)) {
      case 'Y':
        dateObj.year = dateArr[i];
        break;
      case 'M':
        dateObj.month = dateArr[i];
        break;
      case 'D':
        dateObj.day = dateArr[i];
        break;
    }
  }

  const newDateArr = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i].charAt(toFormat[i].length - 1) === 'Y') {
      if (toFormat[i].length > dateObj.year.length) {
        if (parseInt(dateObj.year) < 30) {
          const newYear = '20' + dateObj.year;

          dateObj.year = newYear;
        } else {
          const newYear = '19' + dateObj.year;

          dateObj.year = newYear;
        }
      }

      if (toFormat[i].length < dateObj.year.length) {
        dateObj.year = dateObj.year.split('').splice(2).join('');
      }
      newDateArr.push(dateObj.year);
    } else if (toFormat[i].charAt(toFormat[i].length - 1) === 'M') {
      newDateArr.push(dateObj.month);
    } else if (toFormat[i].charAt(toFormat[i].length - 1) === 'D') {
      newDateArr.push(dateObj.day);
    }
  }

  return newDateArr.join(toFormat[3]);
}

module.exports = formatDate;
