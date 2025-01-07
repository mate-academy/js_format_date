'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const splittedDate = date.split(separator);

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const firstLetter = toFormat[i][0];

    for (const el of fromFormat) {
      if (el.includes(firstLetter)) {
        const index = fromFormat.indexOf(el);

        result[i] = splittedDate[index];
      }
    }
  }

  for (const el of toFormat) {
    if (el.includes('Y') && el.length === 2) {
      const index = toFormat.indexOf(el);

      if (result[index].length === 2) {
        return result.join(toFormat[toFormat.length - 1]);
      }

      if (result[index].length === 4) {
        result[index] = result[index].slice(-2);

        return result.join(toFormat[toFormat.length - 1]);
      }
    }

    if (el.includes('Y') && el.length === 4) {
      const index = toFormat.indexOf(el);

      if (result[index].length === 2) {
        if (+result[index] < 30) {
          result[index] = 20 + result[index];

          return result.join(toFormat[toFormat.length - 1]);
        } else {
          result[index] = 19 + result[index];

          return result.join(toFormat[toFormat.length - 1]);
        }
      }
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
