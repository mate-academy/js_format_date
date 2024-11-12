'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // Визначення роздільника
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  // Розбиваємо дату за поточним роздільником
  const dateParts = date.split(fromSeparator);

  // Створюємо об'єкт, щоб зберігати частини дати
  const dateObject = {};

  // Заповнюємо dateObject відповідно до поточного формату
  fromFormat.forEach((part, index) => {
    if (part !== fromSeparator) {
      dateObject[part] = dateParts[index];
    }
  });

  // Перетворення року з YY в YYYY або навпаки
  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObject['YY'] = dateObject['YYYY'].slice(-2); // 1997 -> 97
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(dateObject['YY'], 10);

    dateObject['YYYY'] =
      year < 30 ? `20${dateObject['YY']}` : `19${dateObject['YY']}`; // 97 -> 1997, 20 -> 2020
  }

  // Формуємо нову дату відповідно до нового формату
  const formattedDate = toFormat
    .filter((part) => part !== toSeparator) // Фільтруємо новий роздільник
    .map((part) => dateObject[part]) // Беремо відповідну частину дати
    .join(toSeparator); // З'єднуємо з новим роздільником

  return formattedDate;
}

module.exports = formatDate;
