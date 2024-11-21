'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = date.split(/,|-|\.|\//);
  const objDate = {
    [`${fromFormat[0]}`]: result[0],
    [`${fromFormat[1]}`]: result[1],
    [`${fromFormat[2]}`]: result[2],
  };

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (!objDate.hasOwnProperty(toFormat[i])) {
      if (toFormat[i] === 'YYYY') {
        objDate['YYYY'] = +objDate['YY'] >= 30
          ? '19' + objDate['YY']
          : '20' + objDate['YY'];
        delete objDate['YY'];
      }

      if (toFormat[i] === 'YY') {
        objDate['YY'] = objDate['YYYY'].slice(2);
        delete objDate['YYYY'];
      }
    }
  }

  let newDate = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (const smth in objDate) {
      if (smth === toFormat[i]) {
        newDate += objDate[smth];

        if (i !== toFormat.length - 2) {
          newDate += toFormat[3];
        }
      }
    }
  }

  return newDate;
}

module.exports = formatDate;
