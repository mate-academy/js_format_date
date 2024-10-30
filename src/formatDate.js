'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateInOldFormat = Array.from(fromFormat);
  const newFormat = Array.from(toFormat);
  const dateOnly = date.split(fromFormat[3]);

  dateInOldFormat.pop();

  for (let i = 0; i < dateInOldFormat.length; i++) {
    dateInOldFormat[i] = dateOnly[i];
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const dateEntityTemplate = fromFormat[i];

    for (const el of toFormat) {
      if (el.includes(dateEntityTemplate[0])) {
        if (el.length === dateEntityTemplate.length) {
          newFormat[newFormat.indexOf(dateEntityTemplate)] = dateInOldFormat[i];
        } else {
          if (el.length < dateEntityTemplate.length) {
            newFormat[toFormat.indexOf(el)] = dateInOldFormat[i].slice(2);
          } else {
            newFormat[toFormat.indexOf(el)] =
              dateInOldFormat[i] < 30
                ? '20' + dateInOldFormat[i]
                : '19' + dateInOldFormat[i];
          }
        }
      }
    }
  }

  const newDelimiter = newFormat.pop();

  return newFormat.join(newDelimiter);
}

module.exports = formatDate;
// formatDate(
//   '18-02-2020',
//   ['DD', 'MM', 'YYYY', '-'],
//   ['DD', 'MM', 'YY', '/'],
// ); // '18/02/20'
