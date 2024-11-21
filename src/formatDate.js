'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSep = fromFormat.slice(-1);
  const numbers = date.split(oldSep);
  const oldDate = fromFormat.slice(0, 3);
  const newDate = toFormat.slice(0, 3);
  const result = [];
  const newSep = toFormat.slice(-1);

  let year, month, day;

  for (let i = 0; i < oldDate.length; i++) {
    switch (oldDate[i]) {
      case 'DD':
        day = numbers[i];
        break;

      case 'MM':
        month = numbers[i];
        break;

      case 'YY':
        year = numbers[i];

        if (year.length < 4) {
          year = Number(year) < 30 ? `20${year}` : `19${year}`;
        }
        break;

      case 'YYYY':
        year = numbers[i];
        break;
    }
  }

  for (let j = 0; j < newDate.length; j++) {
    switch (newDate[j]) {
      case 'DD':
        result.push(day);
        break;

      case 'MM':
        result.push(month);
        break;

      case 'YYYY':
        result.push(year);
        break;

      case 'YY':
        result.push(year.slice(-2));
        break;
    }
  }

  return result.join(newSep).toString();
}

module.exports = formatDate;
