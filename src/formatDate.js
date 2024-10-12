'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const fromFormatParts = fromFormat.slice(0, -1);
  const toFormatParts = toFormat.slice(0, -1);
  const dateParts = date.split(oldSeparator);
  const dateObj = {};

  fromFormatParts.forEach((part, index) => {
    if (part === 'YYYY') {
      dateObj['YYYY'] = dateParts[index];
      dateObj['YY'] = dateParts[index].slice(-2);
    } else if (part === 'YY') {
      const year = parseInt(dateParts[index], 10);

      dateObj['YY'] = dateParts[index];

      dateObj['YYYY'] =
        year < 30 ? `20${dateParts[index]}` : `19${dateParts[index]}`;
    } else {
      dateObj[part] = dateParts[index];
    }
  });

  const newDate = toFormatParts.map((part) => dateObj[part]).join(newSeparator);

  return newDate;
}

module.exports = formatDate;
