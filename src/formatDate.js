'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  // Розбиваємо вхідну дату за роздільником
  const dateParts = date.split(fromSeparator);

  // Створюємо мапу для зручного доступу до частин дати
  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  // Обробка року (перетворення між YY та YYYY)
  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    dateMap['YYYY'] = (dateMap['YY'] < 30 ? '20' : '19') + dateMap['YY'];
  } else if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  // Формуємо новий формат
  const newDateParts = toFormat.slice(0, 3).map((part) => dateMap[part]);

  // Повертаємо результат з новим роздільником
  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
