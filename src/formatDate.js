'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateParts = date.split(fromSeparator);

  // console.log(dateParts);

  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  // console.log(dateMap);

  const convertYear = (year, toFormatYear) => {
    // console.log(year);
    // console.log(toFormatYear);

    if (toFormatYear === 'YY' && year.length === 4) {
      return year.slice(-2);
    }

    if (toFormatYear === 'YYYY' && year.length === 2) {
      let yy = parseInt(year);

      if (yy === 0) {
        yy = '00';
      }

      return yy < 30 ? `20${yy}` : `19${yy}`;
    }

    return year;
  };

  const formattedDate = [];

  for (const format of toFormat) {
    if (format === toSeparator) {
      continue;
    }

    if (format === 'YY' || format === 'YYYY') {
      const year = dateMap['YYYY'] || dateMap['YY'];

      formattedDate.push(convertYear(year, format));
    } else {
      formattedDate.push(dateMap[format]);
    }
  }

  // console.log(formattedDate);

  return formattedDate.join(toSeparator);
}

// console.log(
//   formatDate(
//     '2020-02-18',
//     ['YYYY', 'MM', 'DD', '-'],
//     ['YYYY', 'MM', 'DD', '.'],
//   ),
// );

module.exports = formatDate;
