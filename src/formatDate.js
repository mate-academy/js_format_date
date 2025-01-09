'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let splDate = date.split(fromFormat[3]); // [20, 02, 18];
  const dateObject = {};
  let result = [];

  for (let i = 0; i < 3; i++) {
    dateObject[fromFormat[i]] = splDate[i];
  }

  for (let i = 0; i < 3; i++) {
    const part = toFormat[i];

    if (part === 'YY' && dateObject['YYYY']) {
      result.push(dateObject['YYYY'].slice(2));
    } else if (part === 'YYYY' && dateObject['YY']) {
      const year = parseInt(dateObject['YY'], 10);
      result.push(year < 30 ? `20${dateObject['YY']}` : `19${dateObject['YY']}`)
    } else {
      result.push(dateObject[part]);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
