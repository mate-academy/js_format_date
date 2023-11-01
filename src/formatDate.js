"use strict";

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 */
function formatDate(date, fromFormat, toFormat) {
  const dateInfo = date.split(fromFormat[3]);
  const formatedDate = [];
  const separator = toFormat[3];

  fromFormat.pop();
  toFormat.pop();

  if (toFormat.includes("YY") && fromFormat.includes("YYYY")) {
    fromFormat[fromFormat.indexOf("YYYY")] = "YY";

    dateInfo[fromFormat.indexOf("YY")] =
      dateInfo[fromFormat.indexOf("YY")].slice(2);
  } else if (toFormat.includes("YYYY") && fromFormat.includes("YY")) {
    fromFormat[fromFormat.indexOf("YY")] = "YYYY";

    let year = dateInfo[fromFormat.indexOf("YYYY")];

    if (+year < 30) {
      year = "20" + year;
    } else {
      year = "19" + year;
    }

    dateInfo[fromFormat.indexOf("YYYY")] = year;
  }

  for (let i = 0; i < toFormat.length; i++) {
    const index = fromFormat.indexOf(toFormat[i]);

    formatedDate[i] = dateInfo[index];
  }

  return formatedDate.join(separator);
}

module.exports = formatDate;
