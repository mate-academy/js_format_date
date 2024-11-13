'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateParts = date.split(fromSeparator);

  const dateObject = {};

  fromFormat.forEach((part, index) => {
    if (part !== fromSeparator) {
      dateObject[part] = dateParts[index];
    }
  });

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObject['YY'] = dateObject['YYYY'].slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(dateObject['YY'], 10);

    dateObject['YYYY'] =
      year < 30 ? `20${dateObject['YY']}` : `19${dateObject['YY']}`;
  }

  const formattedDate = toFormat
    .filter((part) => part !== toSeparator)
    .map((part) => dateObject[part])
    .join(toSeparator);

  return formattedDate;
}

module.exports = formatDate;
