'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorInput = fromFormat[3];
  const separatorOutput = toFormat[3];
  const dateArr = date.split([separatorInput]);

  const formatAndDate = {};
  const formatedDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    formatAndDate[fromFormat[i]] = dateArr[i];
  }

  if (formatAndDate.hasOwnProperty('YYYY')) {
    formatAndDate.YY = formatAndDate.YYYY.slice(2);
  }

  if (formatAndDate.YY < 30) {
    formatAndDate.YYYY = `20${formatAndDate.YY}`;
  } else {
    formatAndDate.YYYY = `19${formatAndDate.YY}`;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];

    formatedDate.push(formatAndDate[key]);
  }

  return formatedDate.join([separatorOutput]);
}

module.exports = formatDate;
