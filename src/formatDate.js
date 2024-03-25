'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[fromFormat.length - 1]);
  const obj = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const key = fromFormat[i];
    const value = oldDate[i];

    obj[key] = value;
  }

  for (const part of toFormat) {
    if (part === 'YY' && obj[part] < 30) {
      result.push(`20${obj[part]}`);
    } else if (part === 'YY' && obj[part] >= 30) {
      result.push(`19${obj[part]}`);
    } else if (part === 'YYYY' || part === 'DD' || part === 'MM') {
      result.push(obj[part]);
    }
  }

  const answer = result.join(toFormat[toFormat.length - 1]);

  return answer;
}

module.exports = formatDate;
