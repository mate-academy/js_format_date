'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formatedDate = [];
  const fromSeparator = getSeparator(fromFormat);
  const dateArr = date.split(fromSeparator);

  const dateObj = {};

  for (let i = 0; i < dateArr.length; i++) {
    if (fromFormat[i].startsWith('Y')) {
      dateObj.year = dateArr[i];
    } else if (fromFormat[i].startsWith('M')) {
      dateObj.month = dateArr[i];
    } else if (fromFormat[i].startsWith('D')) {
      dateObj.day = dateArr[i];
    }
  }

  const needYearLength = toFormat.find((el) => el.startsWith('Y')).length;

  if (dateObj.year.length !== needYearLength) {
    const shortYear = +dateObj.year.slice(-2);

    if (needYearLength === 2) {
      dateObj.year = shortYear;
    } else {
      dateObj.year = shortYear < 30 ? 2000 + shortYear : 1900 + shortYear;
    }
  }

  const dateSeparator = getSeparator(toFormat);

  for (const partDate of toFormat) {
    if (partDate.startsWith('Y')) {
      formatedDate.push(dateObj.year);
    } else if (partDate.startsWith('M')) {
      formatedDate.push(dateObj.month);
    } else if (partDate.startsWith('D')) {
      formatedDate.push(dateObj.day);
    }
  }

  return formatedDate.join(dateSeparator);
}

function getSeparator(date) {
  return date.join('').replace(/[a-zA-Z]/g, '');
}
module.exports = formatDate;
