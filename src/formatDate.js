'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrDate = date.split(fromFormat[3]);
  const year = arrDate[getYYYYIndex(fromFormat)];
  const month = arrDate[fromFormat.indexOf('MM')];
  const day = arrDate[fromFormat.indexOf('DD')];

  const result = setResult(year, month, day, toFormat);

  function getYYYYIndex(format) {
    const index = format.indexOf('YY') === -1 ? format.indexOf('YYYY')
      : format.indexOf('YY');

    return index;
  }

  function setResult(toYear, toMonth, toDay, outputFormat) {
    const dateOutArr = [];
    const newYear = toFullFormat(toYear);

    dateOutArr[toFormat.indexOf('DD')] = toDay;
    dateOutArr[toFormat.indexOf('MM')] = toMonth;

    const id = getYYYYIndex(outputFormat);

    if (outputFormat[id] === 'YY') {
      dateOutArr[id] = newYear.substring(2);
    } else {
      dateOutArr[id] = newYear;
    }

    const dateResult = dateOutArr.join(toFormat[3]);

    function toFullFormat(yearInt) {
      if (yearInt > 100) {
        return yearInt;
      }

      if (yearInt < 30) {
        return '20' + yearInt;
      }

      return '19' + yearInt;
    }

    return dateResult;
  }

  return result;
}

module.exports = formatDate;
