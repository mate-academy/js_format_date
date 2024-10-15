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
    if (toFormat[i] === 'DD') {
      resArr.push(unformattedDate[0]);
    }

    if (toFormat[i] === 'MM') {
      resArr.push(unformattedDate[1]);
    }

    if (toFormat[i] === 'YYYY') {
      resArr.push(unformattedDate[2]);
    }

    if (toFormat[i] === 'YY') {
      resArr.push(unformattedDate[2] % 100);
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

  for (let i = 0; i < previousFormat.length; i++) {
    if (previousFormat[i] === 'DD') {
      unformattedDate.push(previousDate[i]);
    }
  }

  for (let i = 0; i < previousFormat.length; i++) {
    if (previousFormat[i] === 'MM') {
      unformattedDate.push(previousDate[i]);
    }
  }

  for (let i = 0; i < previousFormat.length; i++) {
    if (previousFormat[i] === 'YYYY') {
      unformattedDate.push(previousDate[i]);
    }

    if (previousFormat[i] === 'YY') {
      if (previousDate[i] < 30) {
        unformattedDate.push('20' + previousDate[i]);
      } else {
        unformattedDate.push('19' + previousDate[i]);
      }
    }
  }

  return unformattedDate;
}

module.exports = formatDate;
