'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldYearIndex = getIndex(fromFormat);
  const newYearIndex = getIndex(toFormat);
  const oldYearLength = fromFormat[oldYearIndex].length;
  const newYearLength = toFormat[newYearIndex].length;
  const oldJoin = fromFormat[3];
  const newJoin = toFormat[3];
  const newDate = date.split(oldJoin);
  const reorderedDate = [];
  const oldYear = newDate[oldYearIndex];

  newDate[oldYearIndex] = getYear(oldYear, oldYearLength, newYearLength);

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (i === newYearIndex) {
      reorderedDate[i] = newDate[oldYearIndex];
    } else {
      const index = fromFormat.indexOf(toFormat[i]);

      reorderedDate[i] = newDate[index];
    }
  }

  return reorderedDate.join(newJoin);
}

function getIndex(index) {
  const shortYear = index.indexOf('YY');
  const longYear = index.indexOf('YYYY');

  return shortYear !== -1 ? shortYear : longYear;
}

function getYear(year, from, to) {
  if (from > to) {
    return year.slice(2);
  }

  if (from < to) {
    return year < 30 ? '20' + year : '19' + year;
  }

  return year;
}

module.exports = formatDate;
