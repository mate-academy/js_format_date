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
  const YEAR_SHORT_DIGITS = 'YY';
  const YEAR_FULL_DIGITS = 'YYYY';
  

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case YEAR_FULL_DIGITS:
        receivedDate[YEAR_SHORT_DIGITS] = dateArr[i].slice(2);
        receivedDate[YEAR_FULL_DIGITS] = dateArr[i];
        break;
      case YEAR_SHORT_DIGITS:
        receivedDate[YEAR_FULL_DIGITS] = `${dateArr[i] < 30 ? 20 : 19}${dateArr[i]}`;
        receivedDate[YEAR_SHORT_DIGITS] = dateArr[i];
        break;
      default:
        receivedDate[fromFormat[i]] = dateArr[i];
        break;
    }
  }

  // add parts of final date to new array with rules of toFormat;
  for (const formatPart of toFormat.slice(0, -1)) {
    changedDate.push(receivedDate[elem]);
  }

  return changedDate.join(toFormat[3]);
}

module.exports = formatDate;
