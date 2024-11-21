'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const delim = fromFormat.pop();
  const glue = toFormat.pop();

  const previousDatePosition = fromFormat.indexOf('DD');
  const nextDatePosition = toFormat.indexOf('DD');
  const previousMonthPosition = fromFormat.indexOf('MM');
  const nextMonthPosition = toFormat.indexOf('MM');
  const previousYearPosition = 3 - previousDatePosition
    - previousMonthPosition;
  const nextYearPosition = 3 - nextDatePosition - nextMonthPosition;

  const periodNumbers = date.split(delim);

  const dateNumber = periodNumbers[previousDatePosition];
  const monthNumber = periodNumbers[previousMonthPosition];
  let yearNumber = periodNumbers[previousYearPosition];

  switch (toFormat[nextYearPosition].length) {
    case 2:
      yearNumber = yearNumber.slice(-2);
      break;

    case 4:
      if (fromFormat[previousYearPosition].length === 2) {
        if (yearNumber < 30) {
          yearNumber = '20' + yearNumber;
          break;
        }

        yearNumber = '19' + yearNumber;
      }
  }

  return (
    periodNumbers.fill(dateNumber, nextDatePosition, nextDatePosition + 1)
      .fill(monthNumber, nextMonthPosition, nextMonthPosition + 1)
      .fill(yearNumber, nextYearPosition, nextYearPosition + 1).join(glue)
  );
}

module.exports = formatDate;
