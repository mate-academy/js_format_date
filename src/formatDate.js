'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const partsDate = date.split(fromFormat[3]);
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i <= 3; i++) {
    if (fromFormat[i] === 'DD') {
      day = partsDate[i];
    }

    if (fromFormat[i] === 'MM') {
      month = partsDate[i];
    }

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = partsDate[i];
    }
  }

  const newPartsDate = [];

  for (let i = 0; i <= 3; i++) {
    if (toFormat[i] === 'DD') {
      newPartsDate[i] = day;
    }

    if (toFormat[i] === 'MM') {
      newPartsDate[i] = month;
    }

    if (toFormat[i] === 'YY') {
      newPartsDate[i] = year.length === 2 ? year : year.slice(2);
    }

    if (toFormat[i] === 'YYYY') {
      if (year.length === 4) {
        newPartsDate[i] = year;
      } else if (Number(year) < 30) {
        newPartsDate[i] = '20' + year;
      } else {
        newPartsDate[i] = '19' + year;
      }
    }
  }

  return newPartsDate.join(toFormat[3]);
}

module.exports = formatDate;
