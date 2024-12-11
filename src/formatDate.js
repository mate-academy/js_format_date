'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrayFromDate = date.split(fromFormat[fromFormat.length - 1]);
  const arrForResulf = [];
  const objectFromDate = {};

  for (let i = 0; i < arrayFromDate.length; i++) {
    objectFromDate[fromFormat[i]] = arrayFromDate[i];
  }

  const { MM: month, DD: day, ...lastElement } = objectFromDate;
  const [year] = Object.values(lastElement);

  for (const y of toFormat) {
    if (y === 'YYYY' || y === 'YY') {
      if (year.length === y.length) {
        arrForResulf.push(year);
      }

      if (year.length > y.length) {
        arrForResulf.push(year.slice(-2));
      }

      if (year.length < y.length) {
        if (year < 30) {
          arrForResulf.push('20' + year);
        } else {
          arrForResulf.push('19' + year);
        }
      }
    }

    if (y === 'MM') {
      arrForResulf.push(month);
    }

    if (y === 'DD') {
      arrForResulf.push(day);
    }
  }

  return arrForResulf.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
