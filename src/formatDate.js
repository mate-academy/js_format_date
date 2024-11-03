'use strict';

/*
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]); // split date by 4 position('-') to new array;
  const receivedDate = {}; // create an empty object
  const changedDate = [];
  // check each part of date(YY or YYYY) and saving year value to receivedDate;  
  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        receivedDate['YY'] = dateArr[i].slice(2);
        receivedDate['YYYY'] = dateArr[i];
        break;
      case 'YY':
        receivedDate['YYYY'] = `${dateArr[i] < 30 ? 20 : 19}${dateArr[i]}`;
        receivedDate['YY'] = dateArr[i];
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