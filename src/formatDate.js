'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromValue = fromFormat[fromFormat.length - 1];

  const toValue = toFormat[toFormat.length - 1];

  const newDate = date.split(fromValue);

  const newArray = [];

  const dateObject = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObject[fromFormat[i]] = newDate[i];
  }

  const indexOfYear = fromFormat.includes('YYYY')
    ? fromFormat.indexOf('YYYY')
    : fromFormat.indexOf('YY');

  if (!('YYYY' in dateObject)) {
    if (newDate[indexOfYear] >= 30) {
      dateObject.YYYY = '19' + newDate[indexOfYear];
    }

    if (newDate[indexOfYear] < 30) {
      dateObject.YYYY = '20' + newDate[indexOfYear];
    }
  }

  if ('YYYY' in dateObject) {
    dateObject.YY = newDate[indexOfYear].slice(2);
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      newArray.push(dateObject.DD);
    }

    if (toFormat[i] === 'MM') {
      newArray.push(dateObject.MM);
    }

    if (toFormat[i] === 'YYYY') {
      newArray.push(dateObject.YYYY);
    }

    if (toFormat[i] === 'YY') {
      newArray.push(dateObject.YY);
    }
  }

  return newArray.join(toValue);
}

module.exports = formatDate;
