'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const dateSplit = date.split(fromSeparator);
  const newDateFormat = [];

  let day;
  let month;
  let year;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('D')) {
      day = dateSplit[i];
    }

    if (fromFormat[i].includes('M')) {
      month = dateSplit[i];
    }

    if (fromFormat[i].includes('Y')) {
      year = dateSplit[i];
    }
  }

  for (let n = 0; n < toFormat.length - 1; n++) {
    if (toFormat[n].includes('D')) {
      newDateFormat[n] = day;
    }

    if (toFormat[n].includes('M')) {
      newDateFormat[n] = month;
    }

    if (toFormat[n] === 'YY') {
      newDateFormat[n] = year;

      if (year.length > 2) {
        newDateFormat[n] = year.slice(2);
      }
    }

    if (toFormat[n] === 'YYYY') {
      newDateFormat[n] = year;

      if (year.length < 4 && +year < 30) {
        newDateFormat[n] = '20' + year;
      }

      if (year.length < 4 && +year >= 30) {
        newDateFormat[n] = '19' + year;
      }
    }
  }

  return newDateFormat.join(toSeparator);
}

module.exports = formatDate;
