'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  const newFormat = fromFormat.slice(0, -1);
  const newForm = toFormat.slice(0, -1);

  const parts = date.split(fromSeparator);

  const dateObject = {};

  for (let i = 0; i < newFormat.length; i++) {
    dateObject[newFormat[i]] = parts[i];
  }

  if (newFormat.includes('YYYY') && newForm.includes('YY')) {
    dateObject['YY'] = dateObject['YYYY'].slice(-2);
  } else if (newFormat.includes('YY') && newForm.includes('YYYY')) {
    const year = +dateObject['YY'];

    dateObject['YYYY'] =
      year >= 30 ? `19${dateObject['YY']}` : `20${dateObject['YY']}`;
  }

  let formattedDate = '';

  for (let i = 0; i < newForm.length; i++) {
    if (i > 0) {
      formattedDate += toSeparator;
    }
    formattedDate += dateObject[newForm[i]];
  }

  return formattedDate;
}

module.exports = formatDate;
