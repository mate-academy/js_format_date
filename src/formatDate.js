'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromDateSeparator = fromFormat[3];
  const toDateSeparator = toFormat[3];
  const yearsMap = {};
  let formatMap = {};
  const dateParts = date.split(fromDateSeparator);
  const formatedDate = [];

  for (let i = 0; i < dateParts.length; i++) {
    if (fromFormat[i] === 'YY') {
      yearsMap['YY'] = dateParts[i];
      yearsMap['YYYY'] = getFullYear(dateParts[i]);
    }

    if (fromFormat[i] === 'YYYY') {
      yearsMap['YYYY'] = dateParts[i];
      yearsMap['YY'] = getShortYear(dateParts[i]);
    }

    formatMap[fromFormat[i]] = dateParts[i];
  }

  formatMap = {
    ...formatMap,
    ...yearsMap,
  };

  for (let i = 0; i < dateParts.length; i++) {
    const dateToPart = formatMap[toFormat[i]];

    formatedDate.push(dateToPart);
  }

  return formatedDate.join(toDateSeparator);
}

const getFullYear = (year) => {
  if (+year < 30) {
    return `20${year}`;
  }

  return `19${year}`;
};

const getShortYear = (year) => {
  return year.slice(2);
};

module.exports = formatDate;
