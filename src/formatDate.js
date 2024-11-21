'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();
  const dateParts = date.split(separatorFrom);
  const dateData = {};

  for (const [index, part] of Object.entries(dateParts)) {
    if (fromFormat[index].startsWith('YY')) {
      dateData['year'] = dateParts[index];
      continue;
    }

    dateData[fromFormat[index]] = part;
  }

  const yearFormat = toFormat.find(
    dateFormat => ['YY', 'YYYY'].includes(dateFormat)
  );
  const formatedYear = formatYear(dateData['year'], yearFormat);
  const formatedDate = [];

  for (const part of toFormat) {
    if (!part.startsWith('YY')) {
      formatedDate.push(dateData[part]);
      continue;
    }

    formatedDate.push(formatedYear);
  }

  return formatedDate.join(separatorTo);
}

function formatYear(year, format) {
  if (year.length === format.length) {
    return year;
  }

  if (format === 'YY') {
    return year.slice(2);
  }

  return year < 30 && format === 'YYYY'
    ? `20${year}`
    : `19${year}`;
}

module.exports = formatDate;
