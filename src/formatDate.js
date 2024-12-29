'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dataParts = date.split(fromFormat[fromFormat.length - 1]);

  const dateObject = {};
  let result = '';

  for (let i = 0; i < fromFormat.length; i++) {
    dateObject[fromFormat[i]] = dataParts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObject['YY'] = dateObject['YYYY'].slice(2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const yy = dateObject['YY'];

    if (parseInt(yy, 10) < 30) {
      dateObject['YYYY'] = `20${yy}`;
    }

    if (parseInt(yy, 10) >= 30) {
      dateObject['YYYY'] = `19${yy}`;
    }
  }

  const resultParts = toFormat.slice(0, -1).map((part) => dateObject[part]);

  result = resultParts.join(toFormat[toFormat.length - 1]);

  return result;
}

module.exports = formatDate;
