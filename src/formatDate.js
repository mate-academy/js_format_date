'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let dateArr = [];
  let resultString = '';
  let index = 0;

  if (date.includes('-')) {
    dateArr = date.split('-');
  } else if (date.includes('/')) {
    dateArr = date.split('/');
  } else {
    dateArr = date.split('.');
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const fromIndex = fromFormat.indexOf(toFormat[i]);

    index++;

    if (toFormat[i] === 'YY' && fromFormat.includes('YYYY')) {
      const number = dateArr[index - 1];

      resultString += number.slice(2);
    } else if (toFormat[i] === 'YYYY' && fromFormat.includes('YY')) {
      const year = Number(dateArr[index - 1]);

      if (dateArr[index - 1] === '00') {
        resultString += '2000.';
        continue;
      } else {
        const fullYear = year < 30 ? `20${year}` : `19${year}`;

        resultString += fullYear;
      }
    } else {
      resultString += dateArr[fromIndex];
    }

    if (i < toFormat.length - 2) {
      resultString += toFormat[3];
    }
  }

  return resultString;
}

module.exports = formatDate;
