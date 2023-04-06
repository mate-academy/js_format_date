/* eslint-disable no-console */
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
  // write code here
  const newDate = date.split(fromFormat[3]);
  const result = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    result[fromFormat[i]] = newDate[i];
  }

  if (result.hasOwnProperty('YYYY')) {
    result['YY'] = result['YYYY'].slice(2);
  } else if (result['YY'] >= 30) {
    result['YYYY'] = '19' + result['YY'];
  } else {
    result['YYYY'] = '20' + result['YY'];
  }

  const massive = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    massive.push(result[toFormat[i]]);
    console.log(result[toFormat[i]]);
    console.log(massive);
  }

  return massive.join(toFormat[3]);
}

/* switch (fromFormat[i]) {
      case 'DD':
        result[toFormatDay] = newDate[i];
        break;

      case 'MM':
        result[toFormatMonth] = newDate[i];
        break;

      case 'YYYY':
        if (toFormat.includes('YY')) {
          result[toFormatYear] = newDate[i].slice(2); // shortYear
        }
        result[toFormatYear] = newDate[i];
        break;

      case 'YY':
        if (newDate[i] >= 30) {
          result[toFormatYear] = '19' + newDate[i];
          break;
        }

        result[toFormatYear] = '20' + newDate[i];
        break;
    } */

// return result.join(separator);

/* const [year, month, day] = date.split(separator);

  // робим об'єкт, ключами кладемо перший масив, значення - числа дати з рядочку

  const obj = {
    [fromFormatYear]: year,
    [fromFormatMonth]: month,
    [fromFormatDay]: day,
  };

  const lastTwo = obj.fromFormatYear.slice(2);

  for (const key of toFormat) {
    if (toFormat.includes('YY')) {
      return lastTwo;
    }

    if (lastTwo < 30) {
      obj.fromFormatYear = '20' + lastTwo;
    }

    if (lastTwo >= 30) {
      obj.fromFormatYear = '19' + lastTwo;
    }
  }

  return newDate.join(separator);
} */

module.exports = formatDate;
