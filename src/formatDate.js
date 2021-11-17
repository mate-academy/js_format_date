'use strict';

//const { Console } = require("jest-util");

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

 function formatDate(date, fromFormat, toFormat) {

  const dateObj = {};
  const dateArr = date.split(fromFormat[3]);
  let newDate = [];
  
  for (let i = 0; i < dateArr.length; i++) {
    dateObj[fromFormat[i]] = dateArr[i]; 
  }

  for (let i = 0; i < dateArr.length; i++) {
    if (toFormat[i] === 'YYYY' && dateObj['YY']) { 
      let newYearString;
      if (Number(dateObj.YY) < 30) { 
        newDate[i] = '20' + dateObj.YY;  
      } else {
        newDate[i] = '19' + dateObj.YY;
      }
    } else if (toFormat[i] === 'YY' && dateObj['YYYY']) {
        newDate[i] = dateObj.YYYY[2]+dateObj.YYYY[3];
    } else {
      newDate[i] = dateObj[toFormat[i]];
  } 
}
return newDate.join(toFormat[3]);
}

module.exports = formatDate;
