'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObject = date.split(fromFormat[3]);
  const dateMapping = {};
  const dateResult = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMapping[fromFormat[i]] = dateObject[i];

    if (fromFormat[i] === 'YY') {
      convertingDate(dateMapping, dateObject[i]);
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY') {
      dateResult.push(dateMapping.YYYY.slice(2, 4));
    } else {
      dateResult.push(dateMapping[toFormat[i]]);
    }
  }

  return dateResult.join(toFormat[3]);
}

function convertingDate(dateMapping, dateObject) {
  if (dateObject < 30) {
    dateMapping.YYYY = '20' + dateObject;
  } else {
    dateMapping.YYYY = '19' + dateObject;
  }
}

module.exports = formatDate;
