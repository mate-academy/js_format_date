'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , fromSeparator] = fromFormat;
  const [, , , toSeparator] = toFormat;
  const resultDate = date.split(`${fromSeparator}`);
  const day = resultDate[fromFormat.indexOf('DD')];
  const month = resultDate[fromFormat.indexOf('MM')];
  let year;
  let indexOfYear;

  if (fromFormat.includes('YY')) {
    const yearFormat = 'YY';

    indexOfYear = fromFormat.indexOf(yearFormat);
    year = resultDate[indexOfYear];

    if (toFormat.includes('YYYY')) {
      resultDate[indexOfYear] = yearChanger(resultDate[indexOfYear]);
    }

    if (fromFormat.indexOf('DD') !== toFormat.indexOf('DD')) {
      resultDate[toFormat.indexOf('DD')] = day;
      resultDate[toFormat.indexOf('MM')] = month;
      resultDate[toFormat.includes(yearFormat)] = year;
    }
  }

  if (fromFormat.includes('YYYY')) {
    const yearFormat = 'YYYY';

    indexOfYear = fromFormat.indexOf(yearFormat);
    year = resultDate[indexOfYear];

    if (toFormat.includes('YY')) {
      resultDate[indexOfYear] = yearChanger(resultDate[indexOfYear]);
    }

    if (fromFormat.indexOf('DD') !== toFormat.indexOf('DD')) {
      resultDate[toFormat.indexOf('DD')] = day;
      resultDate[toFormat.indexOf('MM')] = month;
      resultDate[toFormat.indexOf(yearFormat)] = year;
    }
  }

  return resultDate.join(`${toSeparator}`);
}

function yearChanger(year) {
  if (year.length === 4) {
    return `${year[2]}${year[3]}`;
  }

  if (year.length === 2) {
    if (year < 30) {
      return `20${year}`;
    } else {
      return `19${year}`;
    }
  }
}

module.exports = formatDate;
