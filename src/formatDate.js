'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitted = date.split(fromFormat[fromFormat.length - 1]);
  const period = {};
  let newDate = '';

  for (let i = 0; i < fromFormat.length; i++) {
    period[fromFormat[i]] = splitted[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    period['YY'] = period['YYYY'].slice(2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const yy = period['YY'];

    if (parseInt(yy, 10) < 30) {
      period['YYYY'] = `20${yy}`;
    } else {
      period['YYYY'] = `19${yy}`;
    }
  }

  const newDateParts = toFormat.slice(0, -1).map((part) => period[part]);

  newDate = newDateParts.join(toFormat[toFormat.length - 1]);

  return newDate;
}

module.exports = formatDate;
