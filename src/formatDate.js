'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  const dateObj = {};

  fromFormat.slice(0, 3).forEach((part, index) => {
    dateObj[part] = dateParts[index];
  });

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    const year = dateObj['YYYY'];

    dateObj['YY'] = year.slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    let year = dateObj['YY'];

    year = (parseInt(year, 10) < 30 ? '20' : '19') + year;
    dateObj['YYYY'] = year;
  }

  const result = toFormat.slice(0, 3).map((part) => {
    return dateObj[part];
  });

  return result.join(toFormat[3]);
}

module.exports = formatDate;
