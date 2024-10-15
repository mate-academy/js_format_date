'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const { day, month, year } = dateSplitter(date, fromFormat);
  const separator = toFormat[3];

  const dateMap = {
    DD: day,
    MM: month,
    YYYY: year,
    YY: year % 100,
  };

  const formattedDate = toFormat.map((part) => dateMap[part]).join(separator);

  return formattedDate.slice(0, -1);
}

function dateSplitter(date, fromFormat) {
  const separator = fromFormat[3];
  const previousFormat = fromFormat.slice(0, 3);
  const previousDate = date.split(separator);

  let day, month, year;

  for (let i = 0; i < previousFormat.length; i++) {
    const format = previousFormat[i];
    const datePart = previousDate[i];

    switch (format) {
      case 'DD':
        day = datePart;
        break;

      case 'MM':
        month = datePart;
        break;

      case 'YYYY':
        year = datePart;
        break;

      case 'YY':
        year = datePart < 30 ? '20' + datePart : '19' + datePart;
        break;
    }
  }

  return { day, month, year };
}

module.exports = formatDate;
