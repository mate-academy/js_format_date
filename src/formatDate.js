'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();

  const dateArray = date.split(fromSeparator);
  const modifiedDate = [];

  const fromFormatLength = fromFormat.join('').length;
  const toFormatLength = toFormat.join('').length;

  if (fromFormatLength > toFormatLength) {
    const fromYearIndex = fromFormat.indexOf('YYYY');
    const splitArrayDate = dateArray[fromYearIndex].split('');

    for (let i = 1; i < 3; i++) {
      splitArrayDate.shift();
    }

    dateArray[fromYearIndex] = splitArrayDate.join('');

    fromFormat[fromYearIndex] = 'YY';
  } else if (fromFormatLength < toFormatLength) {
    const fromYearIndex = fromFormat.indexOf('YY');
    const splitArrayDate = dateArray[fromYearIndex].split('');

    if (dateArray[fromYearIndex] < 30) {
      splitArrayDate.unshift(20);
    } else if (dateArray[fromYearIndex] >= 30) {
      splitArrayDate.unshift(19);
    }

    dateArray[fromYearIndex] = splitArrayDate.join('');

    fromFormat[fromYearIndex] = 'YYYY';
  }

  for (let i = 0; i < dateArray.length; i++) {
    const position = fromFormat.indexOf(toFormat[i]);

    if (position === -1) {
      return 'Value not found';
    }

    modifiedDate.push(dateArray[position]);
  }

  return modifiedDate.join(toSeparator);
}

module.exports = formatDate;
