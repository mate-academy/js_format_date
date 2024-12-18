'use strict';

function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat.splice(3, 1);
  const newSeparator = toFormat.splice(3, 1);
  const dateSplit = date.split(separator);
  const result = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
      if (dateSplit[fromFormat.indexOf('YY')] < 30) {
        result[i] = `20${dateSplit[fromFormat.indexOf('YY')]}`;
      } else {
        result[i] = `19${dateSplit[fromFormat.indexOf('YY')]}`;
      }
    }

    if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
      result[i] = dateSplit[fromFormat.indexOf('YYYY')].slice(2, 4);
    }

    if (toFormat[i] === fromFormat[0]) {
      result[i] = dateSplit[0];
    }

    if (toFormat[i] === fromFormat[1]) {
      result[i] = dateSplit[1];
    }

    if (toFormat[i] === fromFormat[2]) {
      result[i] = dateSplit[2];
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
