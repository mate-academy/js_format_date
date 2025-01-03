'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

const dateFormats = {
  d: ['DD'],
  m: ['MM'],
  y: ['YYYY', 'YY'],
};

const makeFormat = (format, value) => {
  // format => [from-to]
  switch (format) {
    case 'YYYY-YY':
      return value.slice(-2);
    case 'YY-YYYY':
      return value < 30 ? `20${value}` : `19${value}`;

    default:
      return value;
  }
};

function formatDate(date, fromFormat, toFormat) {
  // write code here
  const [fFrom, sFrom, tFrom, separatorFrom] = fromFormat;
  const [fTo, sTo, tTo, separatorTo] = toFormat;

  const dateSplitted = date.split(separatorFrom);

  const fromStructure = {};

  [fFrom, sFrom, tFrom].forEach((structureFrom, idx) => {
    Object.entries(dateFormats).forEach(([key, values]) => {
      if (values.includes(structureFrom)) {
        fromStructure[key] = {
          value: dateSplitted[idx],
          from: structureFrom,
        };
      }
    });
  });

  const toStructure = {};

  [fTo, sTo, tTo].forEach((structureTo) => {
    Object.entries(dateFormats).forEach(([key, values]) => {
      if (values.includes(structureTo)) {
        toStructure[key] = {
          to: structureTo,
        };
      }
    });
  });

  const unionStructure = {};

  Object.entries(toStructure).forEach(([key, value]) => {
    unionStructure[key] = { ...value, ...fromStructure[key] };
  });

  const dateFormatted = Object.values(unionStructure).map(
    ({ from, to, value }) => makeFormat(`${from}-${to}`, value),
  );

  return dateFormatted.join(separatorTo);
}

module.exports = formatDate;
