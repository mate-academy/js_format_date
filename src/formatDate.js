'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator1 = fromFormat.splice(-1, 1);
  const separator2 = toFormat.splice(-1, 1);

  const changedDate = date.split(separator1[0]);
  let year;
  let month;
  let day;
  const result = [];

  for (let data = 0; data < fromFormat.length; data++) {
    if (fromFormat[data].includes('Y')) {
      year = changedDate[data];
    }

    if (fromFormat[data].includes('M')) {
      month = changedDate[data];
    }

    if (fromFormat[data].includes('D')) {
      day = changedDate[data];
    }
  }

  for (const d of toFormat) {
    if (d.includes('Y')) {
      let formattedYear;

      if (d.length === 4 && year.length === 2) {
        formattedYear = +year < 30 ? `20${year}` : `19${year}`;
      } else if (d.length === 2 && year.length === 4) {
        formattedYear = year.slice(-2);
      } else {
        formattedYear = year;
      }

      result.push(formattedYear);
    }

    if (d.includes('M')) {
      result.push(month);
    }

    if (d.includes('D')) {
      result.push(day);
    }
  }

  return result.join(separator2[0]);
}

module.exports = formatDate;
