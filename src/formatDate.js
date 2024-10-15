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
  const unformattedDate = dateSplitter(date, fromFormat);
  const separator = toFormat[3];
  const resArr = [];
  let res = '';

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        resArr.push(unformattedDate[0]);
        break;
      case 'MM':
        resArr.push(unformattedDate[1]);
        break;
      case 'YYYY':
        resArr.push(unformattedDate[2]);
        break;
      case 'YY':
        resArr.push(unformattedDate[2] % 100);
        break;
    }
  }

  res = resArr.join(separator);

  return res;
}

function dateSplitter(date, fromFormat) {
  const separator = fromFormat[3];
  const previousFormat = fromFormat.slice(0, 3);
  const previousDate = date.split(separator);
  const unformattedDate = [];

  let day, month, year;

  for (let i = 0; i < previousFormat.length; i++) {
    const format = previousFormat[i];
    const datePart = previousDate[i];

    if (format === 'DD') {
      day = datePart;
    } else if (format === 'MM') {
      month = datePart;
    } else if (format === 'YYYY') {
      year = datePart;
    } else if (format === 'YY') {
      year = datePart < 30 ? '20' + datePart : '19' + datePart;
    }
  }

  unformattedDate.push(day, month, year);

  return unformattedDate;
}

module.exports = formatDate;
