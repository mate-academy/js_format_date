'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  if (date !== undefined) {
    const valuesOfDate = date.split(fromFormat[3]);

    let DD = 0;
    let MM = 0;
    let year = 0;
    let result = '';

    for (let i = 0; i <= fromFormat.length - 2; i++) {
      switch (fromFormat[i]) {
        case 'YYYY':
          year = valuesOfDate[i];
          break;
        case 'YY':
          year = valuesOfDate[i];
          break;
        case 'MM':
          MM = valuesOfDate[i];
          break;
        case 'DD':
          DD = valuesOfDate[i];
          break;
      }
    }

    for (let i = 0; i <= toFormat.length - 2; i++) {
      switch (toFormat[i]) {
        case 'YYYY':
          if (year.length === 4) {
            result += year;
          } else {
            if (parseInt(year, 10) > 24) {
              year = `19${year}`;
              result += year;
            } else {
              year = `20${year}`;
              result += year;
            }
          }
          break;
        case 'YY':
          if (year.length === 2) {
            result += year;
          } else {
            result += year.slice(-2);
          }
          break;
        case 'MM':
          result += MM;
          break;
        case 'DD':
          result += DD;
          break;
      }

      if (i < 2) {
        result += toFormat[3];
      }
    }

    return result;
  } else {
    return '';
  }
}

module.exports = formatDate;
