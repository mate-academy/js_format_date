'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const dateObject = {};
  const dateValues = date.split(fromFormat.at(-1));

  for (let i = 0; i < dateValues.length; i++) {
    dateObject[fromFormat[i]] = dateValues[i];
  }

  if (fromFormat.includes('YYYY')) {
    if (toFormat.includes('YY')) {
      dateObject['YY'] = dateObject['YYYY'].slice(2);
    }
  } else if (toFormat.includes('YYYY')) {
    dateObject['YYYY'] =
      +dateObject['YY'] < 30
        ? `20${dateObject['YY']}`
        : `19${dateObject['YY']}`;
  }

  for (const name of toFormat.slice(0, -1)) {
    newDate.push(dateObject[name]);
  }

  return newDate.join(toFormat.at(-1));
}

module.exports = formatDate;
