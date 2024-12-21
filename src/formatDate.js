'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [fromParts, fromSeparator] = [
    fromFormat.slice(0, -1),
    fromFormat.at(-1),
  ];
  const [toParts, toSeparator] = [toFormat.slice(0, -1), toFormat.at(-1)];

  // Split the input date into its components based on the fromFormat separator
  const dateComponents = date.split(fromSeparator);

  // Create a mapping of parts (e.g., 'YYYY', 'MM', etc.) to their values
  const dateMap = {};

  fromParts.forEach((part, index) => {
    dateMap[part] = dateComponents[index];
  });

  // Adjust year format if needed
  if (dateMap['YY'] && !dateMap['YYYY']) {
    const year = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = year < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;
  } else if (dateMap['YYYY'] && !dateMap['YY']) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  // Build the output date using the toFormat
  const newDate = toParts.map((part) => dateMap[part]).join(toSeparator);

  return newDate;
}

module.exports = formatDate;
