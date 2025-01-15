'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [fromPart1, fromPart2, fromPart3, separatorFrom] = fromFormat; //
  const [toPart1, toPart2, toPart3, separatorTo] = toFormat; //
  const [part1, part2, part3] = date.split(separatorFrom);
  let result = date.split(separatorFrom).join(separatorTo);
  let newPart;

  if (fromPart1 === toPart3) {
    result = date.split(separatorFrom).reverse().join(separatorTo);
  }

  if (fromPart1 === toPart2 && fromPart2 === toPart3) {
    result = [part3, part1, part2].join(separatorTo);
  }

  if (fromPart3 === 'YYYY' && toPart3 === 'YY') {
    newPart = part3.slice(-2);

    result = [part1, part2, newPart].join(separatorTo);
  }

  if (fromPart3 === 'YYYY' && toPart3 === 'YY') {
    newPart = part3.slice(-2);
    result = [part1, part2, newPart].join(separatorTo);
  }

  if (fromPart1 === 'YY' && toPart1 === 'YYYY') {
    if (Number(part1) < 30) {
      result = '20' + result;
    }
  }

  if (fromPart1 === 'YY' && toPart1 === 'YYYY') {
    if (part1 >= 30) {
      result = '19' + result;
    }
  }

  return result;
}

module.exports = formatDate;
