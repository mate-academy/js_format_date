'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const dateArray = date.split(separator);
  let day = '';
  let month = '';
  let year = '';

  if (fromFormat[0] === 'YYYY' || fromFormat[0] === 'YY') {
    year = dateArray[0];
    month = dateArray[1];
    day = dateArray[2];
  } else if (fromFormat[1] === 'YYYY') {
    year = dateArray[1];
    month = dateArray[0];
    day = dateArray[2];
  } else {
    year = dateArray[2];
    month = dateArray[1];
    day = dateArray[0];
  }

  if (toFormat[0] === 'YYYY' && year.length === 4) {
    return year + toFormat[3] + month + toFormat[3] + day;
  }

  if (toFormat[0] === 'YY' && year.length === 4) {
    return year.slice(2) + toFormat[3] + month + toFormat[3] + day;
  }

  if (toFormat[0] === 'YY' && year.length === 2) {
    return year + toFormat[3] + month + toFormat[3] + day;
  }

  if (toFormat[0] === 'YYYY' && year.length === 2) {
    if (+year >= 30) {
      year = '19' + year;
    } else {
      year = '20' + year;
    }

    return year + toFormat[3] + month + toFormat[3] + day;
  }

  if (toFormat[2] === 'YYYY' && year.length === 4) {
    return day + toFormat[3] + month + toFormat[3] + year;
  }

  if (toFormat[2] === 'YY' && year.length === 4) {
    return day + toFormat[3] + month + toFormat[3] + year.slice(2);
  }

  if (toFormat[2] === 'YY' && year.length === 2) {
    return day + toFormat[3] + month + toFormat[3] + year;
  }

  if (toFormat[2] === 'YYYY' && year.length === 2) {
    if (+year >= 30) {
      year = '19' + year;
    } else {
      year = '20' + year;
    }

    return day + toFormat[3] + month + toFormat[3] + year;
  }
}

module.exports = formatDate;
