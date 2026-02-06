# Инструкция по настройке Google Sheets CMS

Эта инструкция поможет вам настроить систему управления контентом через Google Sheets.

## Шаг 1: Создать Google Sheet

1. Откройте [Google Sheets](https://sheets.google.com)
2. Создайте новый документ
3. Переименуйте его (например, "Auxility Website Content")

## Шаг 2: Создать листы с правильной структурой

Создайте следующие листы с указанными колонками:

### Лист "Hero"
Создайте лист с названием **Hero** и колонками:
```
field | title | subtitle | cta_primary_text | cta_primary_link | cta_secondary_text | cta_secondary_link | badge_text | stats_value_1 | stats_label_1 | stats_value_2 | stats_label_2 | stats_value_3 | stats_label_3
```

**Пример данных:**
```
main | Powered by Quality\nCommitted to Excellence | We build secure, compliant, and user-friendly custom software for FinTech and Healthcare industries. Your vision, our expertise. | Start Your Project | /#contact | View Our Work | /cases | Trusted by FinTech & Healthcare Leaders | 50+ | Projects Delivered | 98% | Client Satisfaction | 10+ | Years Experience
```

### Лист "Services"
Создайте лист с названием **Services** и колонками:
```
id | category | title | description | feature_1 | feature_2 | feature_3 | feature_4 | icon
```

**Пример данных:**
```
1 | fintech | FinTech Solutions | Banking platforms, payment gateways, and investment tools built with security-first architecture. | Payment Processing | Regulatory Compliance | Real-time Analytics | Fraud Detection | Building2
2 | healthcare | Healthcare Systems | HIPAA-compliant telemedicine, EHR integrations, and patient management solutions. | Telemedicine Platforms | EHR Integration | Patient Portals | Clinical Workflows | Heart
```

**Доступные иконки:** Building2, Heart, CreditCard, Stethoscope, LineChart, Shield, Globe, Smartphone, Lightbulb, и другие из [lucide-react](https://lucide.dev)

### Лист "Testimonials"
Создайте лист с названием **Testimonials** и колонками:
```
id | quote | author | role | company | active
```

**Пример данных:**
```
1 | Auxility delivered our banking platform ahead of schedule with exceptional attention to security. Their FinTech expertise saved us months of development time. | Sarah Chen | CTO, Digital Banking Startup | FinanceFlow | TRUE
2 | The telemedicine solution they built has transformed how we deliver care. Patient satisfaction increased by 40% within the first quarter. | Dr. Michael Roberts | Chief Medical Officer | Regional Health Network | TRUE
```

**Примечание:** Используйте `TRUE` для активных отзывов, `FALSE` для скрытых.

### Лист "Cases"
Создайте лист с названием **Cases** и колонками:
```
id | title | category | description | tag_1 | tag_2 | tag_3 | tag_4 | color | image_url
```

**Пример данных:**
```
1 | ICU Management System | Healthcare | Real-time patient monitoring and clinical decision support system for intensive care units. | React | Node.js | FHIR | Real-time | healthcare | 
2 | HALYK Bank Platform | FinTech | Digital banking transformation with mobile-first approach and seamless payment integrations. | React Native | Microservices | Security | | fintech |
```

**Примечание:** `color` должен быть `fintech` или `healthcare`

### Лист "Stats"
Создайте лист с названием **Stats** и колонками:
```
id | value | label | icon | order
```

**Пример данных:**
```
1 | 50+ | Projects Delivered | | 1
2 | 98% | Client Satisfaction | | 2
3 | 10+ | Years Experience | Zap | 3
```

## Шаг 3: Настроить Google Apps Script

1. Откройте ваш Google Sheet
2. Перейдите в **Extensions** → **Apps Script**
3. Вставьте код из файла `backend/GoogleAppsScript.gs`
4. Сохраните проект (Ctrl+S)
5. Нажмите **Deploy** → **New deployment**
6. Выберите тип **Web app**
7. Настройте:
   - **Execute as:** Me
   - **Who has access:** Anyone
8. Нажмите **Deploy**
9. Скопируйте **Web app URL**

## Шаг 4: Настроить переменные окружения

1. Откройте файл `.env` в корне проекта
2. Добавьте:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_GOOGLE_SHEET_ID=YOUR_GOOGLE_SHEET_ID
```

**Где найти Sheet ID:**
- Откройте ваш Google Sheet
- Посмотрите URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
- Скопируйте `[SHEET_ID]` и вставьте в `.env`

## Шаг 5: Перезапустить проект

```bash
npm run dev
```

## Как редактировать контент

1. Откройте ваш Google Sheet
2. Найдите нужный лист (Hero, Services, Testimonials, etc.)
3. Отредактируйте данные в таблице
4. Сохраните изменения (автоматически)
5. Обновите страницу сайта (F5) - изменения появятся сразу!

## Важные замечания

- ✅ **Первая строка** каждого листа должна содержать названия колонок (точно как указано)
- ✅ Данные начинаются со **второй строки**
- ✅ Названия листов **чувствительны к регистру** (Hero, Services, Testimonials, Cases, Stats)
- ✅ Для булевых значений используйте `TRUE`/`FALSE` или `1`/`0`
- ✅ Пустые ячейки допустимы
- ✅ Для переноса строки в тексте используйте `\n`

## Структура всех листов

Полная документация по структуре всех листов находится в файле:
`backend/GOOGLE_SHEETS_STRUCTURE.md`

## Поддержка

Если что-то не работает:
1. Проверьте, что Google Apps Script развернут как Web app
2. Проверьте, что "Who has access" установлен на "Anyone"
3. Проверьте переменные окружения в `.env`
4. Проверьте консоль браузера на ошибки (F12)