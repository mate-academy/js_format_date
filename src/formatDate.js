'use strict';

function formatDate(date, fromFormat, toFormat) {
  const prevSplitter = fromFormat[3];
  const newSplitter = toFormat[3];
  const rawDate = date.split(prevSplitter);
  const newRawDate = [];

  function setTheDate(dateType, nextDateType = dateType) {
    newRawDate[toFormat.indexOf(nextDateType)] =
      rawDate[fromFormat.indexOf(dateType)];
  }

  setTheDate('DD');
  setTheDate('MM');

  if (fromFormat.includes('YYYY') && toFormat.includes('YYYY')) {
    setTheDate('YYYY');
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    setTheDate('YYYY', 'YY');

    newRawDate[toFormat.indexOf('YY')] = newRawDate[
      toFormat.indexOf('YY')
    ].slice(2, 4);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (rawDate[fromFormat.indexOf('YY')] < 30) {
      newRawDate[toFormat.indexOf('YYYY')] =
        `20${rawDate[fromFormat.indexOf('YY')]}`;
    }

    if (rawDate[fromFormat.indexOf('YY')] >= 30) {
      newRawDate[toFormat.indexOf('YYYY')] =
        `19${rawDate[fromFormat.indexOf('YY')]}`;
    }
  }

  const newDate = newRawDate.join(newSplitter);

  return newDate;
}

formatDate('2020-02-18', ['YYYY', 'MM', 'DD', '-'], ['YYYY', 'MM', 'DD', '.']);

formatDate('18-02-2020', ['DD', 'MM', 'YYYY', '-'], ['DD', 'MM', 'YY', '/']);

formatDate('20/02/18', ['YY', 'MM', 'DD', '/'], ['YYYY', 'MM', 'DD', '.']);

formatDate('97/02/18', ['YY', 'MM', 'DD', '/'], ['DD', 'MM', 'YYYY', '.']);

module.exports = formatDate;
