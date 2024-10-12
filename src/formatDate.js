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
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const dateParts = date.split(oldSeparator);
  const dateObj = {};

  fromFormat.forEach((part, index) => {
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

  const newDate = toFormat
    .map((part) => {
      return dateObj[part];
    })
    .join(newSeparator);

  return newDate;
}

module.exports = formatDate;
