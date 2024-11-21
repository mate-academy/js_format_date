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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];

  const oldDateArr = date.split(oldSeparator);
  const newDateArr = new Array(3);

  for (let i = 0; i < newDateArr.length; i++) {
    let oldDateItem = oldDateArr[i];
    const oldFormatItem = fromFormat[i];
    let newFormatIndex = toFormat.indexOf(oldFormatItem);

    if (newFormatIndex < 0) {
      newFormatIndex = oldFormatItem === 'YY' ? toFormat.indexOf('YYYY')
        : toFormat.indexOf('YY');

      oldDateItem = formatYearToAlternative(oldDateItem);
    }

    newDateArr[newFormatIndex] = oldDateItem;
  }

  return newDateArr.join(newSeparator);
}

function formatYearToAlternative(year) {
  if (year.length !== 2) {
    return year.slice(-2);
  }

  return year < 30 ? 20 + year : 19 + year;
}

module.exports = formatDate;
