'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const separatorOld = fromFormat[fromFormat.length - 1];
  const separatorNew = toFormat[toFormat.length - 1];

  const fromFormatSlice = fromFormat.slice(0, 3);
  const dateSplit = date.split(separatorOld);
  const result = [];

  const dateObject = {};

  for (const type in fromFormatSlice) {
    if (fromFormatSlice[type] === 'YYYY') {
      dateObject.year = dateSplit[type];
    }

    if (fromFormatSlice[type] === 'YY') {
      dateObject.year = dateSplit[type];
    }

    if (fromFormatSlice[type] === 'MM') {
      dateObject.month = dateSplit[type];
    }

    if (fromFormatSlice[type] === 'DD') {
      dateObject.day = dateSplit[type];
    }
  }

  if (dateObject.year && dateObject.year.length === 2) {
    const yearNum = parseInt(dateObject.year, 10);

    dateObject.year =
      yearNum < 30 ? `20${dateObject.year}` : `19${dateObject.year}`;
  }

  for (const value in toFormat) {
    if (toFormat[value] === 'YYYY') {
      result.push(dateObject.year);
    }

    if (toFormat[value] === 'YY') {
      result.push(dateObject.year.slice(-2));
    }

    if (toFormat[value] === 'DD') {
      result.push(dateObject.day);
    }

    if (toFormat[value] === 'MM') {
      result.push(dateObject.month);
    }
  }

  return result.join(separatorNew);
}

module.exports = formatDate;
