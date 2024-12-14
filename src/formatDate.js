'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const partsDate = date.split(fromFormat[3]);
  let year = 0;

  if (fromFormat.includes('YY')) {
    year = parseInt(partsDate[fromFormat.indexOf('YY')]);
    year = year < 30 ? 2000 + year : 1900 + year;
  } else {
    year = partsDate[fromFormat.indexOf('YYYY')];
  }

  const month = partsDate[fromFormat.indexOf('MM')];
  const day = partsDate[fromFormat.indexOf('DD')];

  const newSper = toFormat[3];

  toFormat.pop();

  const newDateString = toFormat
    .map((part) => {
      switch (part) {
        case 'YYYY':
          return year;
        case 'YY':
          return year.toString().slice(-2);
        case 'MM':
          return month;
        case 'DD':
          return day;
      }
    })
    .join(newSper);

  return newDateString;
}
module.exports = formatDate;
