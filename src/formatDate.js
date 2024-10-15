'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldYearIndex = dateFormatArray(fromFormat);
  const newYearIndex = dateFormatArray(toFormat);
  const oldYearLength = fromFormat[oldYearIndex].length;
  const newYearLength = toFormat[newYearIndex].length;
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const oldDateParts = date.split(oldSeparator);
  const newDateParts = [];
  const oldYear = oldDateParts[oldYearIndex];

  oldDateParts[oldYearIndex] = convertYearFormat(
    oldYear,
    oldYearLength,
    newYearLength,
  );

  for (let partIndex = 0; partIndex < toFormat.length - 1; partIndex++) {
    if (partIndex === newYearIndex) {
      newDateParts[partIndex] = oldDateParts[oldYearIndex];
    } else {
      const index = fromFormat.indexOf(toFormat[partIndex]);

      newDateParts[partIndex] = oldDateParts[index];
    }
  }

  return newDateParts.join(newSeparator);
}

function dateFormatArray(datePattern) {
  const shortYear = datePattern.indexOf('YY');
  const longYear = datePattern.indexOf('YYYY');

  return shortYear !== -1 ? shortYear : longYear;
}

function convertYearFormat(year, from, to) {
  const TWO_LAST_YEAR_DIGITS = '30';

  if (from > to) {
    return year.slice(2);
  }

  if (from < to) {
    return year < TWO_LAST_YEAR_DIGITS ? `20${year}` : `19${year}`;
  }

  return year;
}

module.exports = formatDate;
