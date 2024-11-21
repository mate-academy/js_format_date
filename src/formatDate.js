'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const objDate = {};
  const fromSeparator = fromFormat.slice(-1);
  const toSeparator = toFormat.slice(-1);
  const mainDate = date.split(fromSeparator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    objDate[fromFormat[i]] = mainDate[i];

    if (fromFormat[i] === 'YY' && mainDate[i] >= 30) {
      objDate.YYYY = `19${mainDate[i]}`;
    }

    if (fromFormat[i] === 'YY' && mainDate[i] < 30) {
      objDate.YYYY = `20${mainDate[i]}`;
    }

    if (fromFormat[i] === 'YYYY') {
      objDate.YY = mainDate[i].slice(2);
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    for (const key in objDate) {
      if (key === toFormat[i]) {
        toFormat[i] = objDate[key];
      }
    }
  }

  return toFormat.slice(0, -1).join(toSeparator);
}

module.exports = formatDate;
