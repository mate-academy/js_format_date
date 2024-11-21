'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const division = fromFormat[fromFormat.length - 1];
  const dividedDate = date.split(division);

  const formatMap = {};

  fromFormat.forEach((part, index) => {
    if (part !== division) {
      formatMap[part] = dividedDate[index];
    }
  });

  let year = formatMap['YYYY'] || formatMap['YY'];
  const month = formatMap['MM'];
  const day = formatMap['DD'];

  if (year) {
    if (year.length === 4 && toFormat.includes('YY')) {
      year = year.substring(2);
    } else if (year === '00' && toFormat.includes('YYYY')) {
      year = 2000;
    } else if (year.length === 2 && toFormat.includes('YYYY')) {
      year = parseInt(year, 10);

      if (year === 2000) {
        return;
      }

      if (year < 30) {
        year = '20' + year;
      } else {
        year = '19' + year;
      }
    }
  }

  const formattedDateParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      formattedDateParts.push(year);
    } else if (toFormat[i] === 'MM') {
      formattedDateParts.push(month);
    } else if (toFormat[i] === 'DD') {
      formattedDateParts.push(day);
    }
  }

  const formattedDate = formattedDateParts.join(toFormat[toFormat.length - 1]);

  return formattedDate;
}

module.exports = formatDate;
