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
  const parts = date.split(fromSeparator);

  const dateObject = {};

  for (let i = 0; i < fromFormat.length; i++) {
    dateObject[fromFormat[i]] = parts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObject['YY'] = dateObject['YYYY'].slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = +dateObject['YY'];

    dateObject['YYYY'] =
      year >= 30 ? `19${dateObject['YY']}` : `20${dateObject['YY']}`;
  }

  let formattedDate = '';

  for (let i = 0; i < toFormat.length; i++) {
    if (i > 0) {
      formattedDate += toSeparator;
    }
    formattedDate += dateObject[toFormat[i]];
  }

  return formattedDate;
}

module.exports = formatDate;
