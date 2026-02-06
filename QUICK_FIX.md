# Быстрое исправление ошибки загрузки Google Sheets

## Шаг 1: Проверьте консоль браузера

Откройте консоль (F12) и найдите ошибки. Должны быть сообщения вида:
- `[Google Sheets] Error fetching Stats: ...`
- Или `[Google Sheets] Response for Stats: {error: "..."}`

## Шаг 2: Проверьте подключение вручную

В консоли браузера выполните:

```javascript
checkGoogleSheets()
```

Это проверит все листы и покажет детальную информацию.

## Шаг 3: Проверьте Google Apps Script

1. Откройте ваш Google Sheet
2. **Extensions** → **Apps Script**
3. Убедитесь, что код из `backend/GoogleAppsScript.gs` вставлен
4. **Deploy** → **Manage deployments**
5. Проверьте:
   - ✅ Есть активный deployment
   - ✅ "Who has access" = **Anyone**
   - ✅ URL совпадает с тем, что в `.env`

## Шаг 4: Проверьте лист Stats в Google Sheet

1. Откройте ваш Google Sheet
2. Найдите лист с названием **Stats** (точно так, с большой буквы)
3. Проверьте структуру:
   - Первая строка должна содержать: `id | value | label | icon | order`
   - Данные начинаются со второй строки
   - Пример данных:
     ```
     id | value | label | icon | order
     1  | 50+   | Projects Delivered | | 1
     2  | 98%   | Client Satisfaction | | 2
     3  | 10+   | Years Experience | Zap | 3
     ```

## Шаг 5: Тестируйте API напрямую

Откройте в браузере (замените YOUR_SCRIPT_ID на ваш из .env):

```
https://script.google.com/macros/s/AKfycbzcgBWWM0gXGIKxgrpks0PspsSGBNk3KZIj-hXG0g3449E7-X1qWMBFVWVkXq3Kogd9/exec?path=/api/Stats
```

Должен вернуться JSON. Если ошибка - скопируйте текст ошибки.

## Частые проблемы и решения

### Проблема: "Sheet 'Stats' not found"

**Решение:**
- Убедитесь, что лист называется точно **Stats** (с большой буквы S)
- Проверьте, что лист существует в Google Sheet

### Проблема: "Failed to fetch" или CORS ошибка

**Решение:**
- Убедитесь, что Google Apps Script развернут как Web app
- Проверьте, что "Who has access" = **Anyone**
- Создайте новый deployment если нужно

### Проблема: Пустой ответ или 0 строк

**Решение:**
- Проверьте, что данные заполнены в листе Stats
- Убедитесь, что первая строка = заголовки колонок
- Данные должны начинаться со второй строки

### Проблема: Неправильная структура данных

**Решение:**
- Проверьте структуру листа Stats (см. `backend/GOOGLE_SHEETS_STRUCTURE.md`)
- Убедитесь, что колонки называются точно: `id`, `value`, `label`, `icon`, `order`

## Быстрая проверка

Выполните в консоли браузера:

```javascript
// Проверить переменные окружения
console.log('Script URL:', import.meta.env.VITE_GOOGLE_SCRIPT_URL);
console.log('Sheet ID:', import.meta.env.VITE_GOOGLE_SHEET_ID);

// Проверить подключение
checkGoogleSheets();
```
