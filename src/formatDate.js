'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);
  let day = '';
  let month = '';
  let year = '';
  const res = [];

  for (let i = 0; i < dateArr.length; i++) {
    switch (fromFormat[i]) {
      case 'YY': {
        year = dateArr[i] < 30 ? `20${dateArr[i]}` : `19${dateArr[i]}`;
        break;
      }

      case 'YYYY': {
        year = dateArr[i];
        break;
      }

      case 'DD': {
        day = dateArr[i];
        break;
      }

      case 'MM': {
        month = dateArr[i];
        break;
      }
    }
  }

  for (const i of toFormat) {
    switch (i) {
      case 'DD': {
        res.push(day);
        break;
      }

      case 'MM': {
        res.push(month);
        break;
      }

      case 'YY': {
        res.push(year.slice(2));
        break;
      }

      case 'YYYY': {
        res.push(year);
        break;
      }
    }
  }

  return res.join(toFormat[3]);
}

module.exports = formatDate;
