'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = {};
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const dateArray = date.split(fromSeparator);

  fromFormat.slice(0, -1).forEach((part, index) => {
    dateParts[part] = dateArray[index];
  });

  // Перетворення року, якщо потрібно
  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateParts['YY'] = dateParts['YYYY'].slice(-2);
    delete dateParts['YYYY'];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(dateParts['YY'], 10);

    dateParts['YYYY'] =
      year < 30 ? `20${dateParts['YY']}` : `19${dateParts['YY']}`;
    delete dateParts['YY'];
  }

  // Збірка нової дати з новим роздільником
  const newSeparator = toFormat[toFormat.length - 1];
  const format = toFormat.slice(0, -1);
  const result = format.map((part) => dateParts[part]).join(newSeparator);

  return result;
}

module.exports = formatDate;
