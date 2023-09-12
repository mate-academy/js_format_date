'use strict';

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
  const SPLITTER_IN = fromFormat[3];
  const SPLITTER_OUT = toFormat[3];
  const YEAR_2_SYM = 'YY';
  const YEAR_4_SYM = 'YYYY';
  const MONTH_SYM = 'MM';
  const DAY_SYM = 'DD';
  const compDateArrIn = date.split(SPLITTER_IN);
  const arrOut = [];

  let yearStrIn2;
  let yearStrIn4;
  const monthStrIn = compDateArrIn[fromFormat.indexOf(MONTH_SYM)];
  const dayStrIn = compDateArrIn[fromFormat.indexOf('DD')];

  if (fromFormat.includes(YEAR_2_SYM)) {
    const index = fromFormat.indexOf(YEAR_2_SYM);

    yearStrIn2 = compDateArrIn[index];

    if (!yearStrIn4 && Number(compDateArrIn[index]) < 30) {
      yearStrIn4 = 20 + yearStrIn2;
    } else {
      yearStrIn4 = 19 + yearStrIn2;
    }
  }

  if (fromFormat.includes(YEAR_4_SYM)) {
    const index = fromFormat.indexOf(YEAR_4_SYM);

    yearStrIn4 = compDateArrIn[index];

    if (!yearStrIn2) {
      yearStrIn2 = yearStrIn4.slice(yearStrIn4.length - 2);
    }
  }

  arrOut[toFormat.indexOf(YEAR_4_SYM)] = yearStrIn4;
  arrOut[toFormat.indexOf(YEAR_2_SYM)] = yearStrIn2;
  arrOut[toFormat.indexOf(DAY_SYM)] = dayStrIn;
  arrOut[toFormat.indexOf(MONTH_SYM)] = monthStrIn;

  const resultArr = arrOut.splice(0);

  return resultArr.join(SPLITTER_OUT);
}

module.exports = formatDate;
