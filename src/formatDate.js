'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrDate = date.split(fromFormat[3]);
  const slash = toFormat[3];
  const newFormat = [];
  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = arrDate[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const part = toFormat[i];

    if (part === 'YY' && dateMap['YYYY']) {
      newFormat.push(dateMap['YYYY'].slice(-2));
    } else if (part === 'YYYY' && dateMap['YY']) {
      const year = parseInt(dateMap['YY'], 10);

      newFormat.push(
        year < 30 ? `20${year.toString().padStart(2, '0')}` : `19${year}`,
      );
    } else {
      newFormat.push(dateMap[part]);
    }
  }

  return newFormat.join(slash);
}

module.exports = formatDate;
