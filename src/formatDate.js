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

// [from-to]
const format = {
  'DD-DD': (d) => d,
  'MM-MM': (m) => m,
  'YYYY-YY': (y) => y.slice(-2), // use 2 last digit (1997 -> 97).
  'YY-YYYY': (y) => (y < 30 ? `20${y}` : `19${y}`), // use 20YY if YY < 30 and 19YY otherwise.
  'YYYY-YYYY': (y) => y,
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
    ({ from, to, value }) => format[`${from}-${to}`](value),
  );

  return dateFormatted.join(separatorTo);
}

module.exports = formatDate;
