'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , slider] = fromFormat;
  const [, , , glue] = toFormat;
  const [year, month, day] = normalizeDate(
    date.split(slider),
    fromFormat,
    toFormat,
  );

  const newDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('YY') || toFormat[i].includes('YYYY')) {
      newDate.push(year);
      continue;
    }

    if (toFormat[i].includes('MM')) {
      newDate.push(month);
      continue;
    }

    if (toFormat[i].includes('DD')) {
      newDate.push(day);
      continue;
    }
  }

  return newDate.join(glue);
}

function normalizeDate(dateMass, formatMass, toFormat) {
  const normalDate = [];

  for (let i = 0; i < dateMass.length; i++) {
    if (formatMass[i].includes('YY') || formatMass[i].includes('YYYY')) {
      normalDate[0] = dateMass[i];
      continue;
    }

    if (formatMass[i].includes('MM')) {
      normalDate[1] = dateMass[i];
      continue;
    }

    if (formatMass[i].includes('DD')) {
      normalDate[2] = dateMass[i];
      continue;
    }
  }

  if (normalDate[0].length <= 2 && toFormat.includes('YYYY')) {
    if (+normalDate[0] >= 30) {
      normalDate[0] = +normalDate[0] + 1900;
    } else {
      normalDate[0] = +normalDate[0] + 2000;
    }
  } else if (normalDate[0].length > 2 && toFormat.includes('YY')) {
    if (+normalDate[0] < 2000) {
      normalDate[0] = +normalDate[0] - 1900;
    } else {
      normalDate[0] = +normalDate[0] - 2000;
    }
  }

  return normalDate;
}
module.exports = formatDate;
