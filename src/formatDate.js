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
  const oldData = date.split(oldSeparator);
  const newDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    let partIndex;

    for (let j = 0; j < fromFormat.length - 1; j++) {
      // Exact fit
      if (
        toFormat[i] === fromFormat[j] ||
        // Extension 'YY' to 'YYYY'
        (toFormat[i] === 'YYYY' && fromFormat[j] === 'YY') ||
        // Shorteing 'YYYY' to 'YY'
        (toFormat[i] === 'YY' && fromFormat[j] === 'YYYY')
      ) {
        partIndex = j;
        break;
      }
    }

    if (toFormat[i] === 'YYYY' && fromFormat[partIndex] === 'YY') {
      // Extension YY to YYYY
      const year =
        Number(oldData[partIndex]) < 30
          ? '20' + oldData[partIndex]
          : '19' + oldData[partIndex];

      newDate.push(year);
    } else if (toFormat[i] === 'YY' && fromFormat[partIndex] === 'YYYY') {
      // Shortening YYYY to YY
      newDate.push(oldData[partIndex].slice(-2));
    } else {
      // Assigning values unchanged for MM, DD or when the formats match
      newDate.push(oldData[partIndex]);
    }
  }

  // return new Array conect with a new separator
  return newDate.join(newSeparator);
}

module.exports = formatDate;
