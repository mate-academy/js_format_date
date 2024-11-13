'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const separatedDate = date.split(oldSeparator);

  const sortedValues = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (let j = 0; j < fromFormat.length - 1; j++) {
      if (toFormat[i] === fromFormat[j]) {
        sortedValues.push(separatedDate[j]);
        break;
      }

      if (toFormat[i] === 'YY' && fromFormat[j] === 'YYYY') {
        sortedValues.push(separatedDate[j].slice(2));
        break;
      }

      if (toFormat[i] === 'YYYY' && fromFormat[j] === 'YY') {
        const numYear = +separatedDate[j] === 0 ? '00' : +separatedDate[j];

        sortedValues.push(numYear < 30 ? `20${numYear}` : `19${numYear}`);
        break;
      }
    }
  }

  return sortedValues.join(newSeparator);
}

module.exports = formatDate;
