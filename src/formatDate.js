'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let day;
  let month;
  let year;
  const oldDate = date.split(fromFormat[fromFormat.length - 1]);
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = oldDate[i];
    }

    if (fromFormat[i] === 'MM') {
      month = oldDate[i];
    }

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = oldDate[i];
    }
  }

  for (let j = 0; j < toFormat.length; j++) {
    if (toFormat[j] === 'DD') {
      newDate.push(day);
    }

    if (toFormat[j] === 'MM') {
      newDate.push(month);
    }

    if (toFormat[j] === 'YY') {
      if (year.length === toFormat[j].length) {
        newDate.push(year);
      } else {
        newDate.push(year.slice(-2));
      }
    }

    if (toFormat[j] === 'YYYY') {
      if (year.length === toFormat[j].length) {
        newDate.push(year);
      } else {
        if (year < 30) {
          newDate.push('20' + year);
        } else {
          newDate.push('19' + year);
        }
      }
    }
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
