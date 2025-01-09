'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arr = [];
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const elementsDate = date.split(separatorFrom);

  let day = '';
  let mounth = '';
  let year = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const dataElement = fromFormat[i][0];

    if (dataElement === 'D') {
      day += elementsDate[i];
    }

    if (dataElement === 'M') {
      mounth += elementsDate[i];
    }

    if (dataElement === 'Y') {
      year += elementsDate[i];
    }
  }

  for (let j = 0; j < toFormat.length - 1; j++) {
    if (toFormat[j][0] === 'D') {
      arr.push(day);
    }

    if (toFormat[j][0] === 'M') {
      arr.push(mounth);
    }

    if (toFormat[j][0] === 'Y') {
      if (toFormat[j].length === year.length) {
        arr.push(year);
      }

      if (toFormat[j].length < year.length) {
        arr.push(year.slice(2));
      }

      if (toFormat[j].length > year.length) {
        if (Number(year) >= 30) {
          arr.push('19' + year);
        }

        if (Number(year) < 30) {
          arr.push('20' + year);
        }
      }
    }
  }

  return arr.join(separatorTo);
}

module.exports = formatDate;
