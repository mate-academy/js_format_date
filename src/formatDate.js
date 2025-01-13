'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateFormat = date.split(fromFormat[3]);

  const result = new Array(3);

  for (let j = 0; j < fromFormat.length - 1; j++) {
    let index = toFormat.indexOf(fromFormat[j]);

    if (index === -1 && fromFormat[j][0] === 'Y') {
      if (fromFormat[j].length > 2) {
        index = toFormat.indexOf(fromFormat[j].slice(2));
        result[index] = dateFormat[j].slice(2);
      } else {
        index = toFormat.indexOf(fromFormat[j].concat(fromFormat[j]));

        result[index] =
          parseInt(dateFormat[j].slice(0, 3)) < 30
            ? `20${dateFormat[j]}`
            : `19${dateFormat[j]}`;
      }
      continue;
    }

    if (index === -1) {
      continue;
    }

    result[index] = dateFormat[j];
  }

  return `${result[0] + toFormat[3] + result[1] + toFormat[3] + result[2]}`;
}

module.exports = formatDate;
