'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  function findSeparator(format) {
    for (let i = 0; i < format.length; i++) {
      if (!['DD', 'MM', 'YYYY', 'YY'].includes(format[i])) {
        return format[i];
      }
    }
  }

  const separator = findSeparator(fromFormat);
  const newSeparator = findSeparator(toFormat);
  const dateParts = date.split(separator);

  const result = [];

  result[toFormat.indexOf('DD')] = dateParts[fromFormat.indexOf('DD')];
  result[toFormat.indexOf('MM')] = dateParts[fromFormat.indexOf('MM')];

  let year = fromFormat.includes('YYYY')
    ? dateParts[fromFormat.indexOf('YYYY')]
    : dateParts[fromFormat.indexOf('YY')];

  if (!toFormat.includes('YYYY')) {
    year = year.length > 2 ? year.slice(2, 4) : year;
    result[toFormat.indexOf('YY')] = year;
  } else {
    year = year.length === 2 ? (year < 30 ? `20${year}` : `19${year}`) : year;
    result[toFormat.indexOf('YYYY')] = year;
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
