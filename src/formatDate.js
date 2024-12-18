'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat.find((part) => part.length === 1);
  const dateParts = date.split(separator);
  const dateMap = {};

  fromFormat.forEach((part, index) => {
    if (part !== separator) {
      dateMap[part] = dateParts[index];
    }
  });

  if (dateMap['YYYY']) {
    dateMap['YY'] = dateMap['YYYY'].slice(2);
  } else if (dateMap['YY']) {
    const year = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = year < 30 ? '20' + dateMap['YY'] : '19' + dateMap['YY'];
  }

  // 4. Reorganizar e formatar a data no novo formato
  const newSeparator = toFormat.find((part) => part.length === 1);
  const formattedDate = toFormat
    .filter((part) => part !== newSeparator)
    .map((part) => dateMap[part])
    .join(newSeparator);

  return formattedDate;
}

module.exports = formatDate;
