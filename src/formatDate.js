'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formatedDate = date.split(fromFormat[3]);
  const sliceFromFormat = fromFormat.slice(0, -1);
  const sliceToFormat = toFormat.slice(0, -1);
  const newFormatDate = {
    days: null,
    months: null,
    years: null,
    oldFormatYear: findFormatYear(sliceFromFormat),
    newFormatYear: findFormatYear(sliceToFormat),
  };

  for (let i = 0; i < sliceFromFormat.length; i++) {
    if (sliceFromFormat[i].includes('DD')) {
      newFormatDate.days = formatedDate[i];
    } else if (sliceFromFormat[i].includes('MM')) {
      newFormatDate.months = formatedDate[i];
    } else {
      newFormatDate.years = formatedDate[i];
    }
  }

  const { oldFormatYear, newFormatYear, years: year } = newFormatDate;

  if (oldFormatYear < newFormatYear) {
    if (year < 30) {
      newFormatDate.years = 20 + year.slice(0);
    } else {
      newFormatDate.years = 19 + year.slice(0);
    }
  }

  if (oldFormatYear > newFormatYear) {
    newFormatDate.years = year.slice(2);
  }

  const { days, months, years } = newFormatDate;

  for (let i = 0; i < sliceToFormat.length; i++) {
    if (sliceToFormat[i].includes('DD')) {
      formatedDate[i] = days;
    } else if (sliceToFormat[i].includes('MM')) {
      formatedDate[i] = months;
    } else {
      formatedDate[i] = years;
    }
  }

  return formatedDate.join(toFormat[3]);
}

function findFormatYear(array) {
  for (const item of array) {
    if (item.includes('YY')) {
      return item.length;
    }
  }
}

module.exports = formatDate;
