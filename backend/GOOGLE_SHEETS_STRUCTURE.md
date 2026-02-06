# Структура Google Sheets для управления контентом сайта

Этот документ описывает структуру Google Sheets, которая используется как CMS (Content Management System) для сайта.

## Ссылка на Google Sheet

**ВАЖНО:** Создайте Google Sheet и поделитесь им с сервисным аккаунтом или сделайте доступным для чтения.

## Структура листов

### 1. Лист "Hero" - Главная секция

| field | title | subtitle | cta_primary_text | cta_primary_link | cta_secondary_text | cta_secondary_link | badge_text | stats_value_1 | stats_label_1 | stats_value_2 | stats_label_2 | stats_value_3 | stats_label_3 |
|-------|-------|----------|------------------|------------------|-------------------|-------------------|------------|---------------|--------------|---------------|--------------|---------------|--------------|
| main | Powered by Quality Committed to Excellence | We build secure, compliant, and user-friendly custom software... | Start Your Project | /#contact | View Our Work | /cases | Trusted by FinTech & Healthcare Leaders | 50+ | Projects Delivered | 98% | Client Satisfaction | 10+ | Years Experience |

**Описание полей:**
- `field` - идентификатор записи (обычно "main")
- `title` - главный заголовок
- `subtitle` - подзаголовок
- `cta_primary_text` - текст первой кнопки
- `cta_primary_link` - ссылка первой кнопки
- `cta_secondary_text` - текст второй кнопки
- `cta_secondary_link` - ссылка второй кнопки
- `badge_text` - текст бейджа
- `stats_value_1/2/3` - значения статистики
- `stats_label_1/2/3` - подписи статистики

---

### 2. Лист "Services" - Услуги

| id | category | title | description | feature_1 | feature_2 | feature_3 | feature_4 | icon |
|----|----------|-------|-------------|-----------|-----------|-----------|-----------|------|
| 1 | fintech | FinTech Solutions | Banking platforms, payment gateways... | Payment Processing | Regulatory Compliance | Real-time Analytics | Fraud Detection | Building2 |
| 2 | healthcare | Healthcare Systems | HIPAA-compliant telemedicine... | Telemedicine Platforms | EHR Integration | Patient Portals | Clinical Workflows | Heart |

**Описание полей:**
- `id` - уникальный идентификатор
- `category` - категория (fintech/healthcare)
- `title` - название услуги
- `description` - описание
- `feature_1/2/3/4` - особенности услуги
- `icon` - название иконки из lucide-react

---

### 3. Лист "Testimonials" - Отзывы

| id | quote | author | role | company | active |
|----|-------|--------|------|---------|--------|
| 1 | Auxility delivered our banking platform... | Sarah Chen | CTO, Digital Banking Startup | FinanceFlow | TRUE |
| 2 | The telemedicine solution they built... | Dr. Michael Roberts | Chief Medical Officer | Regional Health Network | TRUE |

**Описание полей:**
- `id` - уникальный идентификатор
- `quote` - текст отзыва
- `author` - имя автора
- `role` - должность
- `company` - компания
- `active` - показывать ли отзыв (TRUE/FALSE)

---

### 4. Лист "Cases" - Кейсы/Портфолио

| id | title | category | description | tag_1 | tag_2 | tag_3 | tag_4 | color | image_url |
|----|-------|----------|-------------|-------|-------|-------|-------|-------|-----------|
| 1 | ICU Management System | Healthcare | Real-time patient monitoring... | React | Node.js | FHIR | Real-time | healthcare | /images/cases/icu.jpg |
| 2 | HALYK Bank Platform | FinTech | Digital banking transformation... | React Native | Microservices | Security | | fintech | /images/cases/halyk.jpg |

**Описание полей:**
- `id` - уникальный идентификатор
- `title` - название проекта
- `category` - категория
- `description` - описание
- `tag_1/2/3/4` - теги технологий
- `color` - цветовая схема (fintech/healthcare)
- `image_url` - URL изображения (опционально)

---

### 5. Лист "Offerings" - Предложения услуг

| id | title | description | icon | order |
|----|-------|-------------|------|-------|
| 1 | Web Development | Responsive web applications... | Globe | 1 |
| 2 | Mobile Development | Native and cross-platform... | Smartphone | 2 |
| 3 | Consulting & Strategy | Technical consulting... | Lightbulb | 3 |

**Описание полей:**
- `id` - уникальный идентификатор
- `title` - название
- `description` - описание
- `icon` - название иконки из lucide-react
- `order` - порядок отображения

---

### 6. Лист "WhyUs" - Почему мы

| id | title | description | icon | order |
|----|-------|-------------|------|-------|
| 1 | 10+ Years Experience | Over a decade of expertise... | Award | 1 |
| 2 | Security First | Built-in security from day one... | Shield | 2 |

**Описание полей:**
- `id` - уникальный идентификатор
- `title` - заголовок
- `description` - описание
- `icon` - название иконки
- `order` - порядок отображения

---

### 7. Лист "Stats" - Статистика

| id | value | label | icon | order |
|----|-------|-------|------|-------|
| 1 | 50+ | Projects Delivered | | 1 |
| 2 | 98% | Client Satisfaction | | 2 |
| 3 | 10+ | Years Experience | Zap | 3 |

**Описание полей:**
- `id` - уникальный идентификатор
- `value` - значение (например, "50+")
- `label` - подпись
- `icon` - название иконки (опционально)
- `order` - порядок отображения

---

### 8. Лист "Contact" - Контактная информация

| field | value |
|-------|-------|
| email | contact@auxility.ca |
| phone | +1 (555) 123-4567 |
| address | Toronto, Canada |
| office_hours | Mon-Fri 9AM-6PM EST |

**Описание полей:**
- `field` - тип контакта
- `value` - значение

---

### 9. Лист "SEO" - SEO мета-теги

| field | value |
|-------|-------|
| title | Auxility | FinTech & Healthcare Software Development |
| description | Auxility delivers secure, compliant, and user-friendly custom software... |
| keywords | FinTech development, Healthcare software, custom software... |
| og_title | Auxility | FinTech & Healthcare Software Development |
| og_description | Building secure, compliant custom software... |
| og_image | /og-image.png |
| canonical_url | https://auxility.ca/ |

**Описание полей:**
- `field` - тип мета-тега
- `value` - значение

---

### 10. Лист "Copy" — все тексты сайта (редактирование слов и фраз)

Один лист для управления **любым текстом** на сайте: заголовки секций, кнопки, подписи, футер, навигация.

Для мульти-языка используйте колонки **en / ru / kk** (English / Русский / Қазақша). Меняйте значение в колонке выбранного языка — на сайте отобразится новый текст.

| key | en | ru | kk | description |
|-----|----|----|----|-------------|
| site_name | Auxility | Auxility | Auxility | Название сайта в шапке и футере |
| nav_services | Services |  |  | Пункт меню |
| nav_cases | Case Studies |  |  | Пункт меню |
| nav_about | About |  |  | Пункт меню |
| nav_contact | Contact |  |  | Пункт меню |
| nav_contact_btn | Get in Touch |  |  | Кнопка «Связаться» в шапке |
| services_badge | Our Expertise |  |  | Бейдж секции «Услуги» |
| services_heading | Specialized in FinTech & Healthcare |  |  | Заголовок секции «Услуги» |
| services_subheading | We understand the unique challenges... |  |  | Подзаголовок секции «Услуги» |
| whyus_badge | Why Choose Us |  |  | Бейдж секции «Почему мы» |
| whyus_heading | Six Reasons to Partner with Auxility |  |  | Заголовок секции «Почему мы» |
| whyus_subheading | We don't just build software... |  |  | Подзаголовок секции «Почему мы» |
| offerings_badge | What We Offer |  |  | Бейдж секции «Услуги» (Offerings) |
| offerings_heading | Full-Spectrum Development Services |  |  | Заголовок секции Offerings |
| offerings_subheading | From initial concept to production... |  |  | Подзаголовок Offerings |
| offerings_market_heading | Why Market Research Matters |  |  | Заголовок блока Market Research |
| offerings_market_subheading | Before writing a single line of code... |  |  | Подзаголовок Market Research |
| cases_badge | Our Work |  |  | Бейдж секции «Кейсы» |
| cases_heading | Prominent Case Studies |  |  | Заголовок секции «Кейсы» |
| cases_subheading | Real results for real clients... |  |  | Подзаголовок «Кейсы» |
| testimonials_badge | Client Stories |  |  | Бейдж секции «Отзывы» |
| testimonials_heading | What Our Clients Say |  |  | Заголовок секции «Отзывы» |
| testimonials_subheading | Don't just take our word for it... |  |  | Подзаголовок «Отзывы» |
| contact_badge | Let's Talk |  |  | Бейдж секции «Контакты» |
| contact_heading | Ready to Transform Your Business? |  |  | Заголовок секции «Контакты» |
| contact_subheading | Whether you're launching a new product... |  |  | Подзаголовок «Контакты» |
| contact_secure | Your data is secure |  |  | Текст «Ваши данные в безопасности» |
| contact_24h | Response within 24h |  |  | Текст «Ответ в течение 24 ч» |
| contact_form_name | Your Name |  |  | Метка поля «Имя» |
| contact_form_email | Email Address |  |  | Метка поля «Email» |
| contact_form_message | Tell Us About Your Project |  |  | Метка поля «Сообщение» |
| contact_submit | Send Message |  |  | Текст кнопки отправки |
| contact_sending | Sending... |  |  | Текст при отправке |
| contact_success_title | Thank You! |  |  | Заголовок после успешной отправки |
| contact_success_message | We've received your message... |  |  | Текст после отправки |
| contact_send_another | Send Another Message |  |  | Кнопка «Отправить ещё» |
| contact_placeholder_name | John Doe |  |  | Плейсхолдер поля имени |
| contact_placeholder_email | john@company.com |  |  | Плейсхолдер email |
| contact_placeholder_message | I'm looking to build a... |  |  | Плейсхолдер сообщения |
| contact_privacy | By submitting, you agree to our privacy policy. |  |  | Текст под формой |
| footer_tagline | Building secure, compliant, and user-friendly... |  |  | Текст в футере под логотипом |
| footer_services | Services |  |  | Заголовок колонки «Услуги» в футере |
| footer_company | Company |  |  | Заголовок колонки «Компания» |
| footer_industries | Industries |  |  | Заголовок колонки «Отрасли» |
| footer_copyright | All rights reserved. |  |  | Текст рядом с © (год подставится автоматически) |
| footer_privacy | Privacy Policy |  |  | Ссылка «Политика конфиденциальности» |
| footer_terms | Terms of Service |  |  | Ссылка «Условия использования» |

**Описание полей:**
- `key` — уникальный идентификатор текста (латиница, подчёркивания). Менять не рекомендуется.
- `en`, `ru`, `kk` — текст для соответствующего языка. Можно заполнять постепенно (если ячейка пустая — будет fallback на default).
- `description` — подсказка, где используется ключ (можно не заполнять).

**Как добавить свой текст:** добавьте новую строку с колонками `key`, `en`, `ru`, `kk` (и при необходимости `description`). В коде используйте этот ключ через хук `useCopy()`.

---

## Инструкция по настройке

1. **Создайте Google Sheet** с указанными выше листами
2. **Заполните первую строку** названиями колонок (точно как указано)
3. **Заполните данные** начиная со второй строки
4. **Скопируйте ID Google Sheet** из URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
5. **Добавьте ID в переменные окружения** (см. ниже)

## Переменные окружения

Добавьте в `.env`:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_GOOGLE_SHEET_ID=YOUR_GOOGLE_SHEET_ID
```

## Важные замечания

- ✅ Первая строка каждого листа = названия колонок
- ✅ Данные начинаются со второй строки
- ✅ Пустые ячейки будут возвращены как пустые строки
- ✅ Для булевых значений используйте TRUE/FALSE
- ✅ Порядок колонок важен - они должны соответствовать заголовкам

## Примеры данных

См. файл `backend/SAMPLE_DATA.md` для примеров заполнения.
