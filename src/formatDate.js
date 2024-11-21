'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(`${fromFormat[3]}`);
  const sep = toFormat[3];
  const result = [];

  toFormat.length = toFormat.length - 1;
  fromFormat.length = fromFormat.length - 1;

  const year = fromFormat.findIndex(number => number.startsWith('Y'));
  const month = fromFormat.findIndex(number => number.startsWith('M'));
  const day = fromFormat.findIndex(number => number.startsWith('D'));

  if (fromFormat[year].length > 2) {
    dateArr[year] = dateArr[year].slice(2);
  }

  const isLongYear = toFormat.some(type => type.length > 2);

  if (isLongYear) {
    if (dateArr[year] < 30) {
      dateArr[year] = `20${dateArr[year]}`;
    } else {
      dateArr[year] = `19${dateArr[year]}`;
    }
  }

  for (const type of toFormat) {
    const isDType = type.startsWith('D');
    const isMType = type.startsWith('M');

    if (isDType) {
      result.push(dateArr[day]);
    } else if (isMType) {
      result.push(dateArr[month]);
    } else {
      result.push(dateArr[year]);
    }
  }

  return result.join(`${sep}`);
}

module.exports = formatDate;
