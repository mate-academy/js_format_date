'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);

  let day;
  let month;
  let year;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateArr[i];
        break;
      case 'MM':
        month = dateArr[i];
        break;
      default:
        year = dateArr[i];
        break;
    };
  };

  const resultDate = [];
  const separator = toFormat[toFormat.length - 1];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      resultDate.push(day);
    };

    if (toFormat[i] === 'MM') {
      resultDate.push(month);
    };

    if (toFormat[i] === 'YY') {
      if (year.length > 2) {
        resultDate.push(year.slice(2));
      } else {
        resultDate.push(year);
      };
    };

    if (toFormat[i] === 'YYYY') {
      if (year.length === 2 && year >= 30) {
        resultDate.push(`19${year}`);
      };

      if (year.length === 2 && year < 30) {
        resultDate.push(`20${year}`);
      };

      if (year.length === 4) {
        resultDate.push(year);
      };
    };
  };

  return resultDate.join(separator);
}

module.exports = formatDate;
