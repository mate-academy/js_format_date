'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [fromParts, fromSeparator] = [
    fromFormat.slice(0, -1),
    fromFormat.slice(-1)[0],
  ];
  const [toParts, toSeparator] = [toFormat.slice(0, -1), toFormat.slice(-1)[0]];

  const dateParts = date.split(fromSeparator);
  const dateMap = {};

  fromParts.forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  const result = toParts.map((part) => {
    if (part === 'YY' && dateMap['YYYY']) {
      return dateMap['YYYY'].slice(-2);
    }

    if (part === 'YYYY' && dateMap['YY']) {
      const year = parseInt(dateMap['YY'], 10);

      return year < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;
    }

    return dateMap[part];
  });

  return result.join(toSeparator);
}

module.exports = formatDate;
