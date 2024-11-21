'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrResult = [];

  const getYearIndex = arr =>
    arr.indexOf('YYYY') === -1
      ? arr.indexOf('YY')
      : arr.indexOf('YYYY');

  const getValue = (from, to, realValue) => {
    if (from.length === 2 && to.length === 4) {
      return Number(realValue) < 30
        ? `20${realValue}`
        : `19${realValue}`;
    }

    if (from.length === 4 && to.length === 2) {
      return realValue.slice(-2);
    }

    return realValue;
  };

  const splited = date.split(fromFormat[3]);

  [...fromFormat]
    .slice(0, 3)
    .forEach((el, index) => {
      if (toFormat.indexOf(el) === -1) {
        const newIndex = getYearIndex(toFormat);

        arrResult[newIndex] = getValue(el, toFormat[newIndex], splited[index]);
      } else {
        arrResult[toFormat.indexOf(el)] = splited[index];
      }
    });

  return arrResult.join(toFormat[3]);
}

module.exports = formatDate;
