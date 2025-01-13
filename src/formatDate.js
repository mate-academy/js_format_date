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
  const datArr = date.split(fromFormat[fromFormat.length - 1]);

  const dateObj = {};

  for (let i = 0; i < datArr.length; i++) {
    if (fromFormat[i].startsWith('Y')) {
      dateObj.year = datArr[i];
    } else if (fromFormat[i].startsWith('M')) {
      dateObj.month = datArr[i];
    } else if (fromFormat[i].startsWith('D')) {
      dateObj.day = datArr[i];
    }
  }

  const needYearLength = toFormat.find((el) => el.startsWith('Y')).length;

  if (dateObj.year.length !== needYearLength) {
    const shortYear = dateObj.year.slice(-2);

    if (needYearLength === 2) {
      dateObj.year = shortYear;
    } else {
      dateObj.year = shortYear < 30 ? 20 + shortYear : 19 + shortYear;
    }
  }

  const dateSeparator = toFormat.at(-1);

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

module.exports = formatDate;
