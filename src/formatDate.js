'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let result = '';
  const oldDate = date;
  const newFormat = toFormat;
  let array = [];
  let year = '';
  let yearBig = '';
  const newArray = [];
  let indexYear = 0;
  let indexYearbig = 0;

  const [, , , oldSeparator] = fromFormat;
  const [, , , newSeparator] = newFormat;

  array = oldDate.split(oldSeparator);

  if (newFormat.includes('YYYY') && fromFormat.includes('YYYY')) {
    for (const n of newFormat) {
      const searchInd = fromFormat.indexOf(n);

      newArray.push(array[searchInd]);
    }
    newArray.pop();
    result = newArray.join(newSeparator);

    return result;
  }

  if (newFormat.includes('YY')) {
    for (const n of array) {
      if (n.length > 3) {
        indexYear = array.indexOf(n);
        year = n.slice(2);
      }
    }
    array[indexYear] = year;

    const newFormatYY = newFormat;
    const newYY = newFormatYY.indexOf('YY');

    newFormatYY[newYY] = 'YYYY';

    for (const n of newFormatYY) {
      const searchInd = fromFormat.indexOf(n);

      newArray.push(array[searchInd]);
    }
    newArray.pop();

    result = newArray.join(newSeparator);

    return result;
  }

  if (newFormat.includes('YYYY')) {
    indexYearbig = fromFormat.indexOf('YY');

    if (parseInt(array[indexYearbig]) >= 30) {
      yearBig = '19' + array[indexYearbig];
    }

    if (parseInt(array[indexYearbig]) < 30) {
      yearBig = '20' + array[indexYearbig];
    }

    array[indexYearbig] = yearBig;

    const newFormatYYYY = newFormat;
    const newY = newFormatYYYY.indexOf('YYYY');

    newFormatYYYY[newY] = 'YY';

    for (const n of newFormatYYYY) {
      const searchInd = fromFormat.indexOf(n);

      newArray.push(array[searchInd]);
    }
    newArray.pop();

    result = newArray.join(newSeparator);

    return result;
  }
}

module.exports = formatDate;
