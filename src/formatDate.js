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

  const newDate = date.split(fromValue);

  const newArray = [];

  const toValue = toFormat[toFormat.length - 1];

  let newDay = 0;

  let newMonth = 0;

  let newYear = 0;

  for (let n of newDate) {
    if (Number(n) > 32) {
      newYear = n;
    }

    if (Number(n) > 12 && Number(n) < 32) {
      newDay = n;
    }

    if (Number(n) <= 12) {
      newMonth = n;
    }
  }

  for (let i of toFormat) {
    if (i === 'DD') {
      newArray.push(newDay);
    }

    if (i === 'MM') {
      newArray.push(newMonth);
    }

    if (i === 'YY') {
      newArray.push(newYear.slice(2));
    }

    if (i === 'YYYY') {
      newArray.push(newYear);
    }
  }

  return newArray.join(toValue);
}

module.exports = formatDate;
