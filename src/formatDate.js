'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const SEPARATOR_BEFOR = fromFormat[fromFormat.length - 1];
  const SEPARATOR_AFTER = toFormat[toFormat.length - 1];

  let OLD_FORMAT_DATE = [];
  const NEW_FORMAT_DATE = [];
  const TEMP_OBJECT_BATE = {};

  const INDEX_FOOL = fromFormat.indexOf('YYYY');
  const INDEX_HALF_YEAR = fromFormat.indexOf('YY');

  OLD_FORMAT_DATE = date.split(SEPARATOR_BEFOR);

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    OLD_FORMAT_DATE[INDEX_FOOL] = (OLD_FORMAT_DATE[INDEX_FOOL]).slice(-2);
    fromFormat[INDEX_FOOL] = 'YY';
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (OLD_FORMAT_DATE[INDEX_HALF_YEAR] < 30) {
      OLD_FORMAT_DATE[INDEX_HALF_YEAR] = `20${OLD_FORMAT_DATE[INDEX_HALF_YEAR]}`;
      toFormat[toFormat.indexOf('YYYY')] = 'YY';
    } else {
      OLD_FORMAT_DATE[INDEX_HALF_YEAR] = `19${OLD_FORMAT_DATE[INDEX_HALF_YEAR]}`;
      toFormat[toFormat.indexOf('YYYY')] = 'YY';
    }
  }

  for (let i = 0; i < OLD_FORMAT_DATE.length; i++) {
    TEMP_OBJECT_BATE[fromFormat[i]] = OLD_FORMAT_DATE[i];
  }

  for (const key of toFormat) {
    if (!TEMP_OBJECT_BATE[key]) {
      break;
    }
    NEW_FORMAT_DATE.push(TEMP_OBJECT_BATE[key]);
  }

  return NEW_FORMAT_DATE.join(SEPARATOR_AFTER);
}

module.exports = formatDate;
