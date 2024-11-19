'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObject = {};
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);

  fromFormat.slice(0, -1).forEach((key, index) => {
    dateObject[key] = dateParts[index];
  });

  if (dateObject.YYYY) {
    const shortYear = dateObject.YYYY.slice(2);

    dateObject.YY = shortYear;
  }

  if (dateObject.YY) {
    const fullYear =
      dateObject.YY >= 30 ? '19' + dateObject.YY : '20' + dateObject.YY;

    dateObject.YYYY = fullYear;
  }

  const formattedDate = toFormat.slice(0, -1).map((key) => dateObject[key]);

  return formattedDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
