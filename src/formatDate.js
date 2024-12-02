'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const dateParts = date.split(fromSeparator);

  const mapping = {};

  for (let i = 0; i < fromFormat.length; i++) {
    const key = fromFormat[i];

    mapping[key] = dateParts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    mapping['YY'] = mapping['YYYY'].slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(mapping['YY'], 10);

    mapping['YYYY'] = year < 30 ? `20${mapping['YY']}` : `19${mapping['YY']}`;
  }

  const result = toFormat.map((part) => mapping[part]).join(toSeparator);

  return result;
}

module.exports = formatDate;
