'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  let newDate = '';
  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  addYearExtraFormat(dateMap);

  const newDateParts = [];

  for (let i = 0; i < 3; i++) {
    newDateParts.push(dateMap[toFormat[i]]);
  }

  newDate = newDateParts.join(toFormat[3]);

  return newDate;

  function addYearExtraFormat(map) {
    if (map.hasOwnProperty('YYYY')) {
      map['YY'] = map['YYYY'].slice(2);
    } else if (map['YY'] < 30) {
      map['YYYY'] = '20' + map['YY'];
    } else {
      map['YYYY'] = '19' + map['YY'];
    }

    return map;
  }
}

module.exports = formatDate;
