'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newArr = date.split(fromFormat[3]);
  const resultDate = [];
  let dateValue = 0;
  let monthValue = 0;
  let yearValue = 0;

  for (let index = 0; index < fromFormat.length; index++) {
    if (fromFormat[index] === 'YYYY' || fromFormat[index] === 'YY') {
      yearValue = newArr[index];
    }

    if (fromFormat[index] === 'MM') {
      monthValue = newArr[index];
    }

    if (fromFormat[index] === 'DD') {
      dateValue = newArr[index];
    }
  }

  for (const element of toFormat) {
    if (element === 'YYYY' || element === 'YY') {
      if (element.length === 2) {
        if (yearValue.length === 2) {
          resultDate.push(yearValue);
        } else if (yearValue.length === 4) {
          resultDate.push(`${yearValue[2]}${yearValue[3]}`);
        }
      } else if (element.length === 4) {
        if (yearValue.length === 4) {
          resultDate.push(yearValue);
        } else if (yearValue.length === 2) {
          resultDate.push(`${yearValue > 23 ? 19 : 20}${yearValue}`);
        }
      }
    }

    if (element === 'MM') {
      resultDate.push(monthValue);
    }

    if (element === 'DD') {
      resultDate.push(dateValue);
    }
  }

  return resultDate.join(toFormat[3]);
}

module.exports = formatDate;
