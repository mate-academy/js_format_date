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
  const datePartsArray = date.split(fromSeparator);

  const dateParts = {};

  fromFormat.forEach((part, index) => {
    dateParts[part] = datePartsArray[index];
  });

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateParts['YY'] = dateParts['YYYY'].slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(dateParts['YY'], 10);

    dateParts['YYYY'] =
      year < 30 ? `20${dateParts['YY']}` : `19${dateParts['YY']}`;
  }

  const toSeparator = toFormat.pop();
  const formattedDate = toFormat
    .map((part) => dateParts[part])
    .join(toSeparator);

  return formattedDate;
}

module.exports = formatDate;
