'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(dateStr, fromFormat, toFormat) {
  const formatMap = {
    YYYY: (d) => d,
    YY: (d) => d.slice(-2),
    MM: (d) => d.padStart(2, '0'),
    DD: (d) => d.padStart(2, '0'),
  };

  const parseDate = (date, format) => {
    const sep = format.find((f) => !formatMap[f]);
    const parts = date.split(sep);
    const dateObj = {};

    format.forEach((part, index) => {
      if (formatMap[part]) {
        dateObj[part] = parts[index];
      }
    });

    return dateObj;
  };

  const convertYear = (year, from, to) => {
    if (from === 'YYYY' && to === 'YY') {
      return year.slice(-2);
    } else if (from === 'YY' && to === 'YYYY') {
      return year < 30 ? `20${year}` : `19${year}`;
    }

    return year;
  };

  const fromYearFormat = fromFormat.find((f) => f.includes('Y'));

  const dateParts = parseDate(dateStr, fromFormat);
  const outputSeparator = toFormat.find((f) => !formatMap[f]);

  const convertedDate = toFormat
    .filter((part) => formatMap[part])
    .map((formatPart) => {
      if (formatMap[formatPart]) {
        if (formatPart === 'YYYY' || formatPart === 'YY') {
          return convertYear(
            dateParts[fromYearFormat],
            fromYearFormat,
            formatPart,
          );
        }

        return formatMap[formatPart](dateParts[formatPart]);
      }

      return formatPart;
    });

  return convertedDate.join(outputSeparator);
}

module.exports = formatDate;
