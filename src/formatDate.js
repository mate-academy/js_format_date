'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const separator = toFormat[toFormat.length - 1];

  const dateArr = date.split(oldSeparator);

  let yearIndex;

  if (fromFormat.indexOf('YYYY') !== -1) {
    yearIndex = fromFormat.indexOf('YYYY');
  } else {
    yearIndex = fromFormat.indexOf('YY');
  }

  const monthIndex = fromFormat.indexOf('MM');
  const dayIndex = fromFormat.indexOf('DD');

  let year = dateArr[yearIndex];
  const month = dateArr[monthIndex];
  const day = dateArr[dayIndex];

  if (year.length === 2 && toFormat.includes('YYYY')) {
    if (year < 30) {
      year = `20${year}`;
    } else {
      year = `19${year}`;
    }
  } else if (year.length === 4 && toFormat.includes('YY')) {
    year = year.slice(-2);
  }

  const dateParts = {
    YYYY: year,
    YY: year,
    MM: month,
    DD: day,
  };

  const result = toFormat
    .filter((part) => part !== separator)
    .map((part) => dateParts[part])
    .join(separator);

  return result;
}

module.exports = formatDate;
