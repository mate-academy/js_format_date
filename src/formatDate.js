'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [oldData, idFromYear, oldYear, fromSymbol] = getFormat(fromFormat);
  const [newData, , newYear, toSymbol] = getFormat(toFormat);

  const fromDate = date.split(fromSymbol);
  const toDate = [];

  const year = fromDate[idFromYear];

  let formatYear = '';

  if (oldYear !== newYear) {
    if (newYear < oldYear) {
      formatYear += year.slice(2);
    }

    if (newYear > oldYear) {
      if (year >= 30) {
        formatYear += '19' + year;
      } else {
        formatYear += '20' + year;
      }
    }

    fromDate[idFromYear] = formatYear;
  }

  oldData[idFromYear] = newYear;

  for (const format of newData) {
    const index = oldData.indexOf(format);

    toDate.push(fromDate[index]);
  }

  return toDate.join(toSymbol);
}

function getFormat(format) {
  const [first, second, third, symbol] = format;
  const formatData = [first, second, third];

  const idYear = formatData.includes('YYYY')
    ? formatData.indexOf('YYYY')
    : formatData.indexOf('YY');

  const formatYear = formatData[idYear];

  return [formatData, idYear, formatYear, symbol];
}

module.exports = formatDate;
