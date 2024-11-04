'use strict';

/*
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // split date by 4 position('-') to new array;
  const dateArr = date.split(fromFormat[3]);
  const receivedDate = {}; // create an empty object
  const changedDate = [];

  // define constance for year formats
  const YEAR_2_DIGITS = 'YY';
  const YEAR_4_DIGITS = 'YYYY';
  

  // check each part of date(YY or YYYY) and saving year value to receivedDate;
  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case YEAR_4_DIGITS:
        receivedDate[YEAR_2_DIGITS] = dateArr[i].slice(2);
        receivedDate[YEAR_4_DIGITS] = dateArr[i];
        break;
      case YEAR_2_DIGITS:
        receivedDate[YEAR_4_DIGITS] = `${dateArr[i] < 30 ? 20 : 19}${dateArr[i]}`;
        receivedDate[YEAR_2_DIGITS] = dateArr[i];
        break;
      default:
        receivedDate[fromFormat[i]] = dateArr[i];
        break;
    }
  }

  // add parts of final date to new array with rules of toFormat;
  for (const elem of toFormat.slice(0, -1)) {
    changedDate.push(receivedDate[elem]);
  }

  return changedDate.join(toFormat[3]);
}

module.exports = formatDate;
