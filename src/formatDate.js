'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateList = date.split(fromFormat[3]);
  const newDateList = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case `DD`:
        newDateList.push(dateList[fromFormat.indexOf(`DD`)]);
        break;

      case `MM`:
        newDateList.push(dateList[fromFormat.indexOf(`MM`)]);
        break;

      case `YY`:
        if (fromFormat.indexOf(`YY`) !== -1) {
          newDateList.push(dateList[fromFormat.indexOf(`YY`)]);
        } else {
          newDateList.push(dateList[fromFormat.indexOf(`YYYY`)].slice(2));
        }
        break;

      case `YYYY`:
        if (fromFormat.indexOf(`YYYY`) !== -1) {
          newDateList.push(dateList[fromFormat.indexOf(`YYYY`)]);
        } else if (dateList[fromFormat.indexOf(`YY`)][0] > 2) {
          newDateList.push(`19` + dateList[fromFormat.indexOf(`YY`)]);
        } else {
          newDateList.push(`20` + dateList[fromFormat.indexOf(`YY`)]);
        }
    }
  }

  return newDateList.join(toFormat[3]);
}

module.exports = formatDate;
