'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splittedDate = date.split(fromFormat[3]);
  const shortYear = 'YY';
  const longYear = 'YYYY';
  const dateMap = {};
  const toFormatShort = [];

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i].slice(0, 1)] = splittedDate[i];
    toFormatShort.push(toFormat[i].slice(0, 1));
  }

  if (fromFormat.includes(longYear) && toFormat.includes(shortYear)) {
    dateMap['Y'] = dateMap['Y'].slice(2, 4);
  }

  if (fromFormat.includes(shortYear) && toFormat.includes(longYear)) {
    switch (dateMap['Y'] < 30) {
      case (true):
        dateMap['Y'] = '20' + dateMap['Y'];
        break;

      case (false):
        dateMap['Y'] = '19' + dateMap['Y'];
        break;
    }
  }

  const newDate = [];

  for (const item of toFormatShort) {
    newDate.push(dateMap[item]);
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
