'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const outputNeeded = {
    day: '',
    month: '',
    year: '',
    separator: '',
  };
  const separatedDate = date.split(fromFormat[fromFormat.length - 1]);
  const result = [];

  // check inData and start to build object for the result creating
  for (let i = 0; i < fromFormat.length; i++) {
    const item = fromFormat[i];

    switch (item[0].toLowerCase()) {
      case 'd':
        outputNeeded.day = `${separatedDate[i]}`;
        break;
      case 'm':
        outputNeeded.month = `${separatedDate[i]}`;
        break;
      case 'y':
        const yearIn =
          item.length === 2 && Number(separatedDate[i]) < 30
            ? `20${separatedDate[i].slice(-2)}`
            : `19${separatedDate[i].slice(-2)}`;

        outputNeeded.year = item.length === 2 ? yearIn : `${separatedDate[i]}`;
        break;
      default:
        outputNeeded.separator = `${toFormat[i]}`;
    }
  }

  // check output conditions and build our result
  for (let i = 0; i < toFormat.length - 1; i++) {
    const item = toFormat[i];

    switch (item[0].toLowerCase()) {
      case 'd':
        result.push(outputNeeded.day);
        break;
      case 'm':
        result.push(outputNeeded.month);
        break;
      case 'y':
        const year =
          item.length < 4 ? outputNeeded.year.slice(-2) : outputNeeded.year;

        result.push(year);
        break;
      default:
        outputNeeded.separator = `${toFormat[i]}`;
    }
  }

  return result.join(outputNeeded.separator);
}

module.exports = formatDate;
