'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

const transformYear = (year, length) => {
  if (year.length === 4 && length === 2) {
    return year.slice(2);
  }

  if (year.length === 2 && length === 4) {
    const century = Number(year) >= 30 ? '19' : '20';

    return `${century}${year}`;
  }
};

function formatDate(date, fromFormat, toFormat) {
  const newDivider = toFormat[toFormat.length - 1];

  const fromDateParts = date.split(fromFormat[fromFormat.length - 1]);

  const newDateParts = [];

  const fromDateYearIndex =
    fromFormat.indexOf('YYYY') !== -1
      ? fromFormat.indexOf('YYYY')
      : fromFormat.indexOf('YY');
  const fromDateMonthIndex = fromFormat.indexOf('MM');
  const fromDateDayIndex = fromFormat.indexOf('DD');

  const fromDateYearLength = fromDateParts[fromDateYearIndex].length;

  const fromDateYear = fromDateParts[fromDateYearIndex];
  const fromDateMonth = fromDateParts[fromDateMonthIndex];
  const fromDateDay = fromDateParts[fromDateDayIndex];

  const toFormatYearIndex =
    toFormat.indexOf('YYYY') !== -1
      ? toFormat.indexOf('YYYY')
      : toFormat.indexOf('YY');
  const toFormatMonthIndex = toFormat.indexOf('MM');
  const toFormatDayIndex = toFormat.indexOf('DD');

  const toFormatYearLength = toFormat[toFormatYearIndex].length;

  newDateParts[toFormatYearIndex] =
    fromDateYearLength === toFormatYearLength
      ? fromDateYear
      : transformYear(fromDateYear, toFormatYearLength);
  newDateParts[toFormatMonthIndex] = fromDateMonth;
  newDateParts[toFormatDayIndex] = fromDateDay;

  const newDate = newDateParts.join(newDivider);

  return newDate;
}

module.exports = formatDate;
