'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitSing = fromFormat[3];
  const toSplitSing = toFormat[3];
  const dateFormated = date.split(splitSing);

  const result = [];
  const dateObj = {};

  for (let i = 0; i < dateFormated.length; i++) {
    if (fromFormat[i] === 'YY') {
      if (dateFormated[i] < '30') {
        dateFormated[i] = '20'.concat(dateFormated[i]);
      } else {
        dateFormated[i] = '19'.concat(dateFormated[i]);
      }

      fromFormat[i] = 'YYYY';
    }

    dateObj[fromFormat[i]] = dateFormated[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY') {
      result.push(dateObj.YYYY.slice(2));
    } else {
      result.push(dateObj[toFormat[i]]);
    }
  }

  return result.join(toSplitSing);
}

module.exports = formatDate;
