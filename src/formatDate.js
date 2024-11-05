'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[fromFormat.length - 1]);

  const dateParts = {
    DD: parts[fromFormat.indexOf('DD')],
    MM: parts[fromFormat.indexOf('MM')],
    YYYY: parts[fromFormat.indexOf('YYYY')],
    YY: parts[fromFormat.indexOf('YY')],
  };

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
    } else if (format === 'MM') {
      resultParts.push(dateParts['MM']);
    } else if (format === 'DD') {
      resultParts.push(dateParts['DD']);
    }
  }

  return resultParts.join(toFormat[toFormat.length - 1]);
}

function formatYear(year, format) {
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
}

module.exports = formatDate;
