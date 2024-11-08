'use strict';

/*
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObj = {};
  const delimiter = fromFormat.find((f) => f.length === 1);
  const splitDate = date.split(delimiter);

  let dataIndex = 0;

  fromFormat.forEach((format) => {
    if (format !== delimiter) {
      dateObj[format] = splitDate[dataIndex++];
    }
  });

  if (fromFormat.includes('YY') && toFormat.includes('YYYY') && dateObj.YY) {
    dateObj.YYYY = (dateObj.YY >= 30 ? '19' : '20') + dateObj.YY;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY') && dateObj.YYYY) {
    dateObj.YY = dateObj.YYYY.slice(-2);
  }

  const result = toFormat.map((format, index) => {
    const formattedPart = format === delimiter ? delimiter : dateObj[format];

    if (index === toFormat.length - 1 && formattedPart === delimiter) {
      return '';
    }

    return formattedPart;
  });

  return result.join(toFormat.at(-1)).slice(0, -1);
}

module.exports = formatDate;
