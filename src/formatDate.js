'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = {};
  const separator = fromFormat.find(
    (part) =>
      part !== 'DD' && part !== 'MM' && part !== 'YYYY' && part !== 'YY',
  );
  const splitDate = date.split(separator);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YY') {
      const year = splitDate[i];

      dateParts['YYYY'] =
        year.length === 2 ? (+year < 30 ? `20${year}` : `19${year}`) : year;
      dateParts['YY'] = year.length === 2 ? year : year.slice(-2);
    } else {
      dateParts[fromFormat[i]] = splitDate[i];
    }
  }

  if (toFormat.includes('YY') && !dateParts['YY']) {
    dateParts['YY'] = dateParts['YYYY'].slice(-2);
  }

  const newSeparator = toFormat.find(
    (part) =>
      part !== 'DD' && part !== 'MM' && part !== 'YYYY' && part !== 'YY',
  );

  return toFormat
    .slice(0, -1)
    .map((part) => dateParts[part])
    .join(newSeparator);
}

module.exports = formatDate;
