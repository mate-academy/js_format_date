'use strict';

function formatDate(date, fromFormat, toFormat) {
  const arrayDate = date.split(fromFormat[3]);
  const oldFormat = {};

  for (let i = 0; i < fromFormat.length; i++) {
    for (let partOfDate = i; partOfDate < arrayDate.length; partOfDate++) {
      oldFormat[fromFormat[i]] = arrayDate[partOfDate];
      break;
    }
  }

  const oldFormatKeys = Object.keys(oldFormat);
  let yearOldFormat = '';

  for (const key of oldFormatKeys) {
    if (key.includes('Y')) {
      yearOldFormat += key;
      break;
    }
  }

  for (let n = 0; n < toFormat.length - 1; n++) {
    if (toFormat[n].includes('Y')) {
      if (toFormat[n] === 'YYYY') {
        if (toFormat[n] === yearOldFormat) {
          toFormat[n] = `${oldFormat['YYYY']}`;
        }

        if (toFormat[n] !== yearOldFormat) {
          if (`${oldFormat['YY']}` < 30) {
            toFormat[n] = `20${oldFormat['YY']}`;
          }

          if (`${oldFormat['YY']}` >= 30) {
            toFormat[n] = `19${oldFormat['YY']}`;
          }
        }
      }

      if (toFormat[n] === 'YY') {
        if (toFormat[n] === yearOldFormat) {
          toFormat[n] = `${oldFormat['YY']}`;
        }

        if (toFormat[n] !== yearOldFormat) {
          toFormat[n] = `${oldFormat['YYYY'][2]}${oldFormat['YYYY'][3]}`;
        }
      }

      continue;
    }

    if (toFormat[n].includes('M')) {
      toFormat[n] = `${oldFormat['MM']}`;

      continue;
    }

    if (toFormat[n].includes('D')) {
      toFormat[n] = `${oldFormat['DD']}`;

      continue;
    }
  }

  let newFormat = [...toFormat];
  const toSeparator = toFormat[toFormat.length - 1];

  newFormat = newFormat.slice(0, 3);
  newFormat = newFormat.join(`${toSeparator}`);

  return newFormat;
}

module.exports = formatDate;
