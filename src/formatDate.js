'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  const fromFormatParts = fromFormat.slice(0, -1);
  const toFormatParts = toFormat.slice(0, -1);

  const regexParts = fromFormatParts.map((part) => {
    switch (part) {
      case 'YYYY':
        return '\\d{4}';
      case 'YY':
        return '\\d{2}';
      case 'MM':
        return '0[1-9]|1[0-2]';
      case 'DD':
        return '0[1-9]|[12][0-9]|3[01]';
      default:
        return '';
    }
  });
  const regex = new RegExp(`^${regexParts.join(fromSeparator)}$`);

  if (!regex.test(date)) {
    throw new Error('Invalid date format');
  }

  const datePartsArray = date.split(fromSeparator);

  const dateParts = {};

  fromFormatParts.forEach((part, index) => {
    dateParts[part] = datePartsArray[index];
  });

  if (fromFormatParts.includes('YYYY') && toFormatParts.includes('YY')) {
    dateParts['YY'] = dateParts['YYYY'].slice(-2);
  } else if (fromFormatParts.includes('YY') && toFormatParts.includes('YYYY')) {
    const year = parseInt(dateParts['YY'], 10);

    dateParts['YYYY'] =
      year < 30 ? `20${dateParts['YY']}` : `19${dateParts['YY']}`;
  }

  const formattedDate = toFormatParts
    .map((part) => dateParts[part])
    .join(toSeparator);

  return formattedDate;
}

module.exports = formatDate;
