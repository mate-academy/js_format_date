'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const inputSeparator = fromFormat[fromFormat.length - 1];
  const inputDate = date.split(inputSeparator);
  const outputSeparator = toFormat[toFormat.length - 1];
  const inputYear = fromFormat.includes('YY')
    ? inputDate[fromFormat.indexOf('YY')]
    : inputDate[fromFormat.indexOf('YYYY')];
  const inputMonth = inputDate[fromFormat.indexOf('MM')];
  const inputDay = inputDate[fromFormat.indexOf('DD')];

  const outputDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY') {
      if (inputYear.length === 4) {
        outputDate[i] = inputYear;
        continue;
      }

      if (inputYear.length === 2) {
        outputDate[i] = inputYear < 30 ? `20${inputYear}` : `19${inputYear}`;
        continue;
      }
    }

    if (toFormat[i] === 'YY') {
      outputDate[i] = inputYear.slice(2);
      continue;
    }

    if (toFormat[i] === 'MM') {
      outputDate[i] = inputMonth;
      continue;
    }

    if (toFormat[i] === 'DD') {
      outputDate[i] = inputDay;
      continue;
    }
  }

  return outputDate.join(outputSeparator);
}

module.exports = formatDate;
