'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const dateArray = date.split(fromFormat.pop());
  const dayIndex = dateArray[fromFormat.indexOf('DD')];
  const monthIndex = dateArray[fromFormat.indexOf('MM')];
  const yearIndex = dateArray[fromFormat.indexOf('YYYY')];

  let shortYear = dateArray[fromFormat.indexOf('YY')];

  for (let index = 0; index < 3; index++) {
    switch (true) {
      case shortYear < '30': {
        shortYear = '20' + shortYear;

        break;
      }

      case shortYear === '30' || shortYear > '30': {
        shortYear = '19' + shortYear;
      }
    }

    switch (toFormat[index]) {
      case 'DD': {
        newDate[index] = dayIndex;

        break;
      }

      case 'MM': {
        newDate[index] = monthIndex;

        break;
      }

      case 'YY': {
        newDate[index] = yearIndex.slice(2);

        break;
      }

      case 'YYYY': {
        if (fromFormat.indexOf('YYYY') !== -1) {
          newDate[index] = yearIndex;
        } else {
          newDate[index] = shortYear;
        }
      }
    }
  }

  return newDate.join(toFormat.pop());
}

module.exports = formatDate;
