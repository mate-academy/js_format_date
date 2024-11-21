'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const inputSeparator = fromFormat[3];
  const outputSeparator = toFormat[3];
  const formatDay = 'DD';
  const formatMonth = 'MM';
  const shortFormatYear = 'YY';
  const maxYear = 30;
  const nineteenthСentury = '19';
  const twentiethCentury = '20';

  const inputDate = date.split(inputSeparator);
  let yearInput;
  let monthInput;
  let dayInput;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes(shortFormatYear)) {
      if (inputDate[i].length === shortFormatYear.length) {
        yearInput = (inputDate[i] < maxYear)
          ? twentiethCentury + inputDate[i] : nineteenthСentury + inputDate[i];
      } else {
        yearInput = inputDate[i];
      }
      continue;
    }

    if (fromFormat[i].includes(formatMonth)) {
      monthInput = inputDate[i];
      continue;
    }

    if (fromFormat[i].includes(formatDay)) {
      dayInput = inputDate[i];
    }
  }

  const outputDateFormat = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes(shortFormatYear)) {
      if (toFormat[i] === shortFormatYear) {
        outputDateFormat[i] = yearInput.slice(-2);
      } else {
        outputDateFormat[i] = yearInput;
      }
    }

    if (toFormat[i].includes(formatMonth)) {
      outputDateFormat[i] = monthInput;
    }

    if (toFormat[i].includes(formatDay)) {
      outputDateFormat[i] = dayInput;
    }
  }

  return outputDateFormat.join(outputSeparator);
}

module.exports = formatDate;
