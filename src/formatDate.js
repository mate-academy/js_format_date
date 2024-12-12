'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [aFrom, bFrom, cFrom, separator] = fromFormat;
  const fromFormatArray = [aFrom, bFrom, cFrom];
  const [aTo, bTo, cTo, newSeparator] = toFormat;
  const toFormatArray = [aTo, bTo, cTo];
  const dateinNumbers = date.split(separator);

  const dateInfo = getDateFromOld(fromFormatArray, dateinNumbers);

  return setDateOrderNew(toFormatArray, dateInfo).join(newSeparator);
}

function getDateFromOld(fromArray, dateNumbers) {
  const dateObj = {};

  for (let i = 0; i < fromArray.length; i++) {
    switch (fromArray[i]) {
      case 'DD': {
        dateObj.day = dateNumbers[i];
        break;
      }

      case 'MM': {
        dateObj.month = dateNumbers[i];
        break;
      }

      case 'YYYY': {
        dateObj.year = dateNumbers[i];
        break;
      }

      case 'YY': {
        if (dateNumbers[i] < 30) {
          dateObj.year = `20${dateNumbers[i]}`;
        } else {
          dateObj.year = `19${dateNumbers[i]}`;
        }
        break;
      }

      default: {
      }
    }
  }

  return dateObj;
}

function setDateOrderNew(toArray, dateNumbersObj) {
  const dateInArray = [];
  const objToOperate = { ...dateNumbersObj };

  for (let i = 0; i < toArray.length; i++) {
    switch (toArray[i]) {
      case 'DD': {
        dateInArray.push(objToOperate.day);
        break;
      }

      case 'MM': {
        dateInArray.push(objToOperate.month);
        break;
      }

      case 'YYYY': {
        dateInArray.push(objToOperate.year);
        break;
      }

      case 'YY': {
        dateInArray.push(objToOperate.year.slice(-2));
        break;
      }

      default: {
      }
    }
  }

  return dateInArray;
}
module.exports = formatDate;
