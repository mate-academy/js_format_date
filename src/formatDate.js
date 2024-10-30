'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const keysFrom = fromFormat.slice(0, -1);
  const keysTo = toFormat.slice(0, -1);

  const dateObj = {};
  const components = date.split(separatorFrom);

  for (let i = 0; i < keysFrom.length; i++) {
    switch (keysFrom[i]) {
      case 'YY':
        const year = Number(components[i]);

        dateObj['YYYY'] = year < 30 ? 2000 + year : 1900 + year;
        break;
      case 'YYYY':
        dateObj['YYYY'] = Number(components[i]);
        break;
      default:
        dateObj[keysFrom[i]] = Number(components[i]);
        break;
    }
  }

  let resultString = '';

  for (let j = 0; j < keysTo.length; j++) {
    const key = keysTo[j];

    if (key === 'YY') {
      resultString += String(dateObj.YYYY).slice(-2);
    } else {
      resultString += dateObj[key].toString().padStart(2, '0');
    }

    if (j < keysTo.length - 1) {
      resultString += separatorTo;
    }
  }

  return resultString;
}

module.exports = formatDate;
