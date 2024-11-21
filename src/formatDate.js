'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const beforSeparator = fromFormat[3];
  const dateBefore = date.split(beforSeparator);
  const dateObject = {};
  const yearFormatFull = 'YYYY';
  const yearFormatShort = 'YY';
  const monthFormat = 'MM';
  const dayFormat = 'DD';

  for (let i = 0; i < dateBefore.length; i++) {
    if (fromFormat[i] === yearFormatFull) {
      dateObject.year = dateBefore[i];
    }

    if (fromFormat[i] === yearFormatShort) {
      dateObject.year = +dateBefore[i] < 30
        ? '20' + dateBefore[i]
        : '19' + dateBefore[i];
    }
    dateObject[fromFormat[i]] = dateBefore[i];
  }

  const dateAfter = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case yearFormatFull:
        dateAfter[i] = dateObject.year;
        break;
      case yearFormatShort:
        dateAfter[i] = dateObject.year.slice(-2);
        break;
      case monthFormat:
        dateAfter[i] = dateObject[toFormat[i]];
        break;
      case dayFormat:
        dateAfter[i] = dateObject[toFormat[i]];
        break;
      default:
        throw new Error('Input data is not valid');
    }
  }

  const afterSeparator = toFormat[3];

  return dateAfter.join(afterSeparator);
}

module.exports = formatDate;
