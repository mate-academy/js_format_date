'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const getSeparator = (format) => {
    return format.find((part) => /^[^A-Za-z]+$/.test(part));
  };

  const formatYear = (year, format) => {
    if (format === 'YYYY') {
      if (year) {
        if (year.length === 2) {
          const prefix = parseInt(year) < 30 ? '20' : '19';

          return prefix + year;
        } else {
          return year;
        }
      }

      return '';
    } else if (format === 'YY') {
      return year ? year.slice(-2) : '';
    }
  };

  const parts = date.split(getSeparator(fromFormat));

  const dateParts = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateParts[fromFormat[i]] = parts[i];
  }

  const resultParts = [];

  for (const format of toFormat) {
    if (format === 'YYYY') {
      resultParts.push(
        formatYear(dateParts['YYYY'] || dateParts['YY'], format),
      );
    } else if (format === 'YY') {
      resultParts.push(
        formatYear(dateParts['YY'] || dateParts['YYYY'], format),
      );
    } else if (format === 'MM' && 'MM' in dateParts) {
      resultParts.push(dateParts['MM']);
    } else if (format === 'DD' && 'DD' in dateParts) {
      resultParts.push(dateParts['DD']);
    }
  }

  return resultParts.join(getSeparator(toFormat));
}

module.exports = formatDate;
