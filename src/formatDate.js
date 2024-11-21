'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeperator = fromFormat[fromFormat.length - 1];
  const toSeperator = toFormat[toFormat.length - 1];
  const dateArray = date.split(fromSeperator);
  const resultArray = [];

  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = dateArray[i];
  }

  for (let i = 0; i < 3; i++) {
    const value = toFormat[i];

    switch (true) {
      case (value === 'MM' || value === 'DD'):
        resultArray.push(dateObj[value]);
        break;

      case ((value === 'YY' || value === 'YYYY') && value in dateObj):
        resultArray.push(dateObj[value]);
        break;

      case (value === 'YY' && 'YYYY' in dateObj):
        resultArray.push((dateObj.YYYY).slice(2));

        break;

      case (value === 'YYYY' && 'YY' in dateObj):
        if (dateObj.YY < 30) {
          resultArray.push('20' + dateObj.YY);
        } else {
          resultArray.push('19' + dateObj.YY);
        }

        break;
    }
  }

  return resultArray.join(toSeperator);
}

module.exports = formatDate;
