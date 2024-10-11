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

  function getIndex(index) {
    return index.indexOf('YY') !== -1
      ? index.indexOf('YY')
      : index.indexOf('YYYY');
  }

  function getYear(number, from, to) {
    if (from > to) {
      return number.slice(2);
    }

    if (from < to) {
      return number < 30 ? '20' + number : '19' + number;
    }

    return number;
  }

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

module.exports = formatDate;
