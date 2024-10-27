'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);

  let day, month, year;

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i].includes('D')) {
      day = dateArray[i];
    }

    if (fromFormat[i].includes('M')) {
      month = dateArray[i];
    }

    if (fromFormat[i].includes('Y')) {
      year = dateArray[i];

      if (year.length === 2 && year < 30) {
        year = 20 + dateArray[i];
      }

      if (year.length === 2 && year >= 30) {
        year = 19 + dateArray[i];
      }
    }
  }

  const newDateArray = [];

  for (const part of toFormat) {
    if (part.includes('DD')) {
      newDateArray.push(day);
    }

    if (part.includes('MM')) {
      newDateArray.push(month);
    }

    if (part.includes('Y')) {
      if (part.includes('YYYY')) {
        newDateArray.push(year);
      } else {
        newDateArray.push(year.slice(-2));
      }
    }
  }

  return newDateArray.join(toFormat[3]);
}

module.exports = formatDate;
