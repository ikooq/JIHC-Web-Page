import { Language } from "@/lib/i18n";

/**
 * Тексты сайта по умолчанию.
 * Содержат переводы для всех языков (EN, RU, KK).
 */
export const defaultCopy: Record<string, Record<Language, string>> = {
  // Сайт / навигация
  site_name: {
    en: "Auxility",
    ru: "Auxility",
    kk: "Auxility",
  },
  nav_services: {
    en: "Services",
    ru: "Услуги",
    kk: "Қызметтер",
  },
  nav_cases: {
    en: "Case Studies",
    ru: "Кейсы",
    kk: "Кейстер",
  },
  nav_about: {
    en: "About",
    ru: "О компании",
    kk: "Біз туралы",
  },
  nav_contact: {
    en: "Contact",
    ru: "Контакты",
    kk: "Контактілер",
  },
  nav_contact_btn: {
    en: "Get in Touch",
    ru: "Связаться",
    kk: "Хабарласу",
  },

  // Секция Services
  services_badge: {
    en: "Our Expertise",
    ru: "Наша экспертиза",
    kk: "Біздің тәжірибеміз",
  },
  services_heading: {
    en: "Specialized in FinTech & Healthcare",
    ru: "Специализируемся на FinTech и Healthcare",
    kk: "FinTech және Healthcare салаларына маманданғанбыз",
  },
  services_subheading: {
    en: "We understand the unique challenges of regulated industries and deliver solutions that meet the highest standards.",
    ru: "Мы понимаем уникальные вызовы регулируемых отраслей и предлагаем решения соответствующие самым высоким стандартам.",
    kk: "Біз реттелетін салалардың бірегей қиындықтарын түсінеміз және ең жоғары стандарттарға сай келетін шешімдерді ұсынамыз.",
  },

  // Секция Why Us
  whyus_badge: {
    en: "Why Choose Us",
    ru: "Почему мы",
    kk: "Неліктен біз",
  },
  whyus_heading: {
    en: "Six Reasons to Partner with Auxility",
    ru: "Шесть причин работать с Auxility",
    kk: "Auxility-мен жұмыс істеудің алты себебі",
  },
  whyus_subheading: {
    en: "We don't just build software — we build lasting partnerships that drive real business outcomes.",
    ru: "Мы не просто создаем софт — мы строим долгосрочные партнерские отношения, которые приносят реальные бизнес-результаты.",
    kk: "Біз жай ғана бағдарламалық жасақтама жасамаймыз — біз нақты бизнес нәтижелерін беретін ұзақ мерзімді серіктестік орнатамыз.",
  },

  // Services Page Specific
  services_page_badge: { en: "Our Services", ru: "Наши услуги", kk: "Біздің қызметтеріміз" },
  services_hero_title: { en: "Enterprise Solutions for Regulated Industries", ru: "Корпоративные решения для регулируемых отраслей", kk: "Реттелетін салаларға арналған корпоративтік шешімдер" },
  services_hero_subtitle: { en: "We specialize in building secure, compliant software for FinTech and Healthcare sectors with deep domain expertise.", ru: "Мы специализируемся на создании безопасного и соответствующего стандартам ПО для секторов FinTech и Healthcare.", kk: "Біз FinTech және Healthcare секторлары үшін қауіпсіз және стандарттарға сай бағдарламалық жасақтаманы жасауға маманданғанбыз." },
  services_key_benefits: { en: "Key Benefits", ru: "Ключевые преимущества", kk: "Негізгі артықшылықтар" },
  services_additional_title: { en: "Additional Capabilities", ru: "Дополнительные возможности", kk: "Қосымша мүмкіндіктер" },
  services_additional_subtitle: { en: "Complementary services to support your complete digital transformation", ru: "Дополнительные услуги для поддержки вашей полной цифровой трансформации", kk: "Сіздің толық цифрлық трансформацияңызды қолдауға арналған қосымша қызметтер" },
  services_cta_title: { en: "Ready to Start Your Project?", ru: "Готовы начать свой проект?", kk: "Жобаңызды бастауға дайынсыз ба?" },
  services_cta_subtitle: { en: "Let's discuss how we can help transform your business with our expertise in FinTech and Healthcare software development.", ru: "Давайте обсудим, как мы можем помочь трансформировать ваш бизнес с помощью нашего опыта в разработке ПО для FinTech и Healthcare.", kk: "FinTech және Healthcare бағдарламалық жасақтаманы әзірлеудегі тәжірибемізбен бизнесіңізді түрлендіруге қалай көмектесе алатынымызды талқылайық." },


  // Секция Offerings
  offerings_badge: {
    en: "What We Offer",
    ru: "Что мы предлагаем",
    kk: "Біз не ұсынамыз",
  },
  offerings_heading: {
    en: "Full-Spectrum Development Services",
    ru: "Полный спектр услуг разработки",
    kk: "Әзірлеу қызметтерінің толық спектрі",
  },
  offerings_subheading: {
    en: "From initial concept to production deployment, we cover every aspect of your software journey.",
    ru: "От начальной концепции до развертывания — мы берем на себя каждый аспект вашего пути создания ПО.",
    kk: "Бастапқы тұжырымдамадан өндіріске енгізуге дейін — біз бағдарламалық жасақтаманы құру жолының әрбір аспектісін қамтимыз.",
  },
  offerings_market_heading: {
    en: "Why Market Research Matters",
    ru: "Почему так важно исследование рынка",
    kk: "Нарықты зерттеу неге маңызды",
  },
  offerings_market_subheading: {
    en: "Before writing a single line of code, we help you validate your idea with data-driven insights.",
    ru: "Прежде чем написать первую строку кода, мы помогаем подтвердить вашу идею данными и инсайтами.",
    kk: "Кодтың алғашқы жолын жазбас бұрын, біз сіздің идеяңызды деректермен және түсініктермен растауға көмектесеміз.",
  },

  // Секция Cases
  cases_badge: {
    en: "Our Work",
    ru: "Наши работы",
    kk: "Біздің жұмыстар",
  },
  cases_heading: {
    en: "Prominent Case Studies",
    ru: "Избранные кейсы",
    kk: "Таңдаулы кейстер",
  },
  cases_subheading: {
    en: "Real results for real clients. Here's how we've helped industry leaders transform their digital presence.",
    ru: "Реальные результаты для реальных клиентов. Вот как мы помогаем лидерам отрасли трансформировать их цифровое присутствие.",
    kk: "Нақты клиенттер үшін нақты нәтижелер. Біз өнеркәсіп көшбасшыларына цифрлық болмысын өзгертуге осылай көмектесеміз.",
  },

  // Cases Page Specific
  cases_page_badge: { en: "Case Studies", ru: "Кейсы", kk: "Кейстер" },
  cases_hero_title: { en: "Real Results for Real Clients", ru: "Реальные результаты для реальных клиентов", kk: "Нақты клиенттер үшін нақты нәтижелер" },
  cases_hero_subtitle: { en: "Explore how we've helped industry leaders transform their digital presence and achieve measurable business outcomes.", ru: "Узнайте, как мы помогли лидерам отрасли трансформировать их цифровое присутствие.", kk: "Сала көшбасшыларына олардың цифрлық қатысуын өзгертуге қалай көмектескенімізді біліңіз." },
  cases_view_full: { en: "View Full Case Study", ru: "Просмотреть кейс полностью", kk: "Толық кейсті қарау" },
  cases_cta_title: { en: "Let's Create Your Success Story", ru: "Давайте создадим вашу историю успеха", kk: "Сіздің табыс тарихыңызды бірге жасайық" },
  cases_cta_subtitle: { en: "Ready to join our portfolio of successful projects? Let's discuss how we can help you achieve similar results.", ru: "Готовы присоединиться к нашему портфолио успешных проектов? Давайте обсудим ваши цели.", kk: "Біздің табысты жобалар портфолиосына қосылуға дайынсыз ба? Сіздің мақсаттарыңызды талқылайық." },
  cases_start_project: { en: "Start Your Project", ru: "Начать проект", kk: "Жобаны бастау" },


  // Секция Testimonials
  testimonials_badge: {
    en: "Client Stories",
    ru: "Отзывы клиентов",
    kk: "Клиенттердің пікірлері",
  },
  testimonials_heading: {
    en: "What Our Clients Say",
    ru: "Что говорят наши клиенты",
    kk: "Клиенттеріміз не дейді",
  },
  testimonials_subheading: {
    en: "Don't just take our word for it — hear from the leaders we've helped succeed.",
    ru: "Не верьте нам на слово — послушайте лидеров, которым мы помогли добиться успеха.",
    kk: "Біздің сөзімізге сенбеңіз — біз табысқа жетуге көмектескен көшбасшылардың пікірін тыңдаңыз.",
  },

  // Секция Contact
  contact_badge: {
    en: "Let's Talk",
    ru: "Давайте обсудим",
    kk: "Талқылайық",
  },
  contact_heading: {
    en: "Ready to Transform Your Business?",
    ru: "Готовы к трансформации вашего бизнеса?",
    kk: "Бизнесіңізді өзгертуге дайынсыз ба?",
  },
  contact_subheading: {
    en: "Whether you're launching a new product or modernizing existing systems, we're here to help you succeed. Let's discuss your project.",
    ru: "Запускаете ли вы новый продукт или модернизируете существующие системы — мы здесь, чтобы помочь вам. Давайте обсудим ваш проект.",
    kk: "Жаңа өнімді іске қоссаңыз да, бар жүйелерді жаңартсаңыз да — біз сізге көмектесуге дайынбыз. Жобаңызды талқылайық.",
  },
  contact_secure: {
    en: "Your data is secure",
    ru: "Ваши данные защищены",
    kk: "Деректеріңіз қауіпсіз",
  },
  contact_24h: {
    en: "Response within 24h",
    ru: "Ответ в течение 24ч",
    kk: "24 сағат ішінде жауап",
  },
  contact_form_name: {
    en: "Your Name",
    ru: "Ваше имя",
    kk: "Сіздің есіміңіз",
  },
  contact_form_email: {
    en: "Email Address",
    ru: "Email адрес",
    kk: "Email мекенжайы",
  },
  contact_form_message: {
    en: "Tell Us About Your Project",
    ru: "Расскажите о вашем проекте",
    kk: "Жобаңыз туралы айтып беріңіз",
  },
  contact_submit: {
    en: "Send Message",
    ru: "Отправить сообщение",
    kk: "Хабар жіберу",
  },
  contact_sending: {
    en: "Sending...",
    ru: "Отправка...",
    kk: "Жіберілуде...",
  },
  contact_success_title: {
    en: "Thank You!",
    ru: "Спасибо!",
    kk: "Рахмет!",
  },
  contact_success_message: {
    en: "We've received your message and will be in touch shortly.",
    ru: "Мы получили ваше сообщение и скоро свяжемся с вами.",
    kk: "Біз сіздің хабарламаңызды алдық және жақын арада хабарласамыз.",
  },
  contact_send_another: {
    en: "Send Another Message",
    ru: "Отправить еще раз",
    kk: "Тағы жіберу",
  },
  contact_placeholder_name: {
    en: "John Doe",
    ru: "Иван Иванов",
    kk: "Айдын Ахметов",
  },
  contact_placeholder_email: {
    en: "john@company.com",
    ru: "ivan@company.ru",
    kk: "aidyn@company.kz",
  },
  contact_placeholder_message: {
    en: "I'm looking to build a...",
    ru: "Я хочу разработать...",
    kk: "Мен ... жасағым келеді",
  },
  contact_privacy: {
    en: "By submitting, you agree to our privacy policy.",
    ru: "Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности.",
    kk: "Жіберу арқылы сіз құпиялылық саясатымен келісесіз.",
  },

  // Footer
  footer_tagline: {
    en: "Building secure, compliant, and user-friendly custom software for FinTech and Healthcare industries.",
    ru: "Разрабатываем защищенное и удобное ПО для FinTech и Healthcare отраслей.",
    kk: "FinTech және Healthcare салалары үшін қауіпсіз және ыңғайлы бағдарламалық жасақтаманы әзірлейміз.",
  },
  footer_services: {
    en: "Services",
    ru: "Услуги",
    kk: "Қызметтер",
  },
  footer_company: {
    en: "Company",
    ru: "Компания",
    kk: "Компания",
  },
  footer_industries: {
    en: "Industries",
    ru: "Отрасли",
    kk: "Салалар",
  },
  footer_copyright: {
    en: "All rights reserved.",
    ru: "Все права защищены.",
    kk: "Барлық құқықтар қорғалған.",
  },
  footer_privacy: {
    en: "Privacy Policy",
    ru: "Политика конфиденциальности",
    kk: "Құпиялылық саясаты",
  },
  footer_terms: {
    en: "Terms of Service",
    ru: "Условия использования",
    kk: "Пайдалану шарттары",
  },

  // Footer links (labels)
  footer_link_web_dev: { en: "Web Development", ru: "Веб-разработка", kk: "Веб-әзірлеу" },
  footer_link_mobile_dev: { en: "Mobile Development", ru: "Мобильная разработка", kk: "Мобильді әзірлеу" },
  footer_link_consulting: { en: "Consulting", ru: "Консалтинг", kk: "Консалтинг" },
  footer_link_integration: { en: "System Integration", ru: "Системная интеграция", kk: "Жүйелік интеграция" },
  footer_link_about: { en: "About Us", ru: "О компании", kk: "Біз туралы" },
  footer_link_cases: { en: "Case Studies", ru: "Кейсы", kk: "Кейстер" },
  footer_link_testimonials: { en: "Testimonials", ru: "Отзывы", kk: "Пікірлер" },
  footer_link_contact: { en: "Contact", ru: "Контакты", kk: "Контактілер" },
  footer_link_fintech: { en: "FinTech", ru: "Финтех", kk: "Финтех" },
  footer_link_healthcare: { en: "Healthcare", ru: "Здравоохранение", kk: "Денсаулық сақтау" },
  footer_link_banking: { en: "Banking", ru: "Банкинг", kk: "Банкинг" },
  footer_link_telemedicine: { en: "Telemedicine", ru: "Телемедицина", kk: "Телемедицина" },

  // Market Research Benefits
  offering_market_benefit_1: { en: "Identify market opportunities and apps", ru: "Выявление рыночных возможностей и ниш", kk: "Нарықтық мүмкіндіктер мен тауашаларды анықтау" },
  offering_market_benefit_2: { en: "Understand user pain points", ru: "Понимание проблем пользователей", kk: "Пайдаланушы мәселелерін түсіну" },
  offering_market_benefit_3: { en: "Analyze competitor strengths", ru: "Анализ сильных сторон конкурентов", kk: "Бәсекелестердің күшті жақтарын талдау" },
  offering_market_benefit_4: { en: "Define clear product requirements", ru: "Определение четких требований к продукту", kk: "Өнімге қойылатын нақты талаптарды анықтау" },
  offering_market_benefit_5: { en: "Reduce time-to-market risk", ru: "Снижение рисков при выходе на рынок", kk: "Нарыққа шығу тәуекелдерін азайту" },

  // Additional Services
  service_additional_payment: { en: "Payment Systems", ru: "Платежные системы", kk: "Төлем жүйелері" },
  service_additional_medical: { en: "Medical Devices", ru: "Медицинское оборудование", kk: "Медициналық жабдықтар" },
  service_additional_analytics: { en: "Analytics Dashboards", ru: "Аналитические панели", kk: "Аналитикалық панельдер" },
  service_additional_security: { en: "Security Audits", ru: "Аудит безопасности", kk: "Қауіпсіздік аудиті" },

  // Contact Form Toasts
  contact_toast_fill_fields: { en: "Please fill in all fields", ru: "Пожалуйста, заполните все поля", kk: "Барлық өрістерді толтырыңыз" },
  contact_toast_invalid_email: { en: "Please enter a valid email address", ru: "Пожалуйста, введите корректный email", kk: "Жарамды email мекенжайын енгізіңіз" },
  contact_toast_success_title: { en: "Message sent successfully!", ru: "Сообщение успешно отправлено!", kk: "Хабарлама сәтті жіберілді!" },
  contact_toast_success_desc: { en: "We'll get back to you within 24 hours.", ru: "Мы свяжемся с вами в течение 24 часов.", kk: "Біз сізбен 24 сағат ішінде хабарласамыз." },
  contact_toast_error_title: { en: "Failed to send message", ru: "Не удалось отправить сообщение", kk: "Хабарлама жіберілмеді" },
  contact_toast_error_desc: { en: "Please try again later.", ru: "Пожалуйста, попробуйте позже.", kk: "Кішкенеден кейін қайталап көріңіз." },

  // About Page
  about_badge: { en: "About Us", ru: "О компании", kk: "Біз туралы" },
  about_hero_title: { en: "Building the Future of Digital Health & Finance", ru: "Создаем будущее цифрового здравоохранения и финансов", kk: "Цифрлық денсаулық сақтау мен қаржының болашағын құрудамыз" },
  about_hero_subtitle: { en: "We're a team of passionate engineers, designers, and strategists dedicated to creating transformative software solutions.", ru: "Мы команда увлеченных инженеров, дизайнеров и стратегов, посвятивших себя созданию трансформационных программных решений.", kk: "Біз трансформациялық бағдарламалық шешімдерді жасауға арналған ынталы инженерлердің, дизайнерлердің және стратегтердің командасымыз." },
  about_mission_title: { en: "Our Mission", ru: "Наша миссия", kk: "Біздің миссиямыз" },
  about_mission_p1: { en: "At Auxility, we believe technology should empower organizations to deliver better outcomes for their customers. Our mission is to bridge the gap between innovative ideas and production-ready software.", ru: "В Auxility мы верим, что технологии должны давать организациям возможность достигать лучших результатов для своих клиентов. Наша миссия — сократить разрыв между инновационными идеями и готовым к промышленной эксплуатации ПО.", kk: "Auxility-де біз технологиялар ұйымдарға өз тұтынушылары үшін жақсы нәтижелер беруге мүмкіндік беруі керек деп санаймыз. Біздің миссиямыз - инновациялық идеялар мен өндіріске дайын бағдарламалық жасақтама арасындағы алшақтықты жою." },
  about_mission_p2: { en: "We specialize in FinTech and Healthcare because these industries have the highest impact on people's lives. When we build a payment system that works flawlessly or a telemedicine platform that connects patients with doctors, we're not just writing code—we're improving lives.", ru: "Мы специализируемся на FinTech и Healthcare, потому что эти отрасли оказывают наибольшее влияние на жизнь людей. Когда мы создаем безотказную платежную систему или платформу телемедицины — мы не просто пишем код, мы улучшаем жизни.", kk: "Біз FinTech және Healthcare салаларына маманданғанбыз, өйткені бұл салалар адамдардың өміріне ең көп әсер етеді. Біз мінсіз жұмыс істейтін төлем жүйесін немесе пациенттерді дәрігерлермен байланыстыратын телемедициналық платформаны құрған кезде біз жай ғана код жазып қоймаймыз — біз өмірді жақсартамыз." },
  about_founded: { en: "Founded in 2014", ru: "Основано в 2014", kk: "2014 жылы негізі қаланған" },
  about_location: { en: "Toronto, Canada", ru: "Торонто, Канада", kk: "Торонто, Канада" },
  about_history: { en: "What started as a small team of three engineers has grown into a full-service development agency serving clients across North America, Europe, and Asia.", ru: "То, что начиналось как небольшая команда из трех инженеров, превратилось в агентство полного цикла, обслуживающее клиентов в Северной Америке, Европе и Азии.", kk: "Үш инженерден тұратын шағын команда ретінде басталған жұмыс Солтүстік Америка, Еуропа және Азиядағы клиенттерге қызмет көрсететін толық циклді әзірлеу агенттігіне айналды." },
  about_values_title: { en: "Our Values", ru: "Наши ценности", kk: "Біздің құндылықтарымыз" },
  about_values_subtitle: { en: "The principles that guide everything we do", ru: "Принципы, которыми мы руководствуемся во всем, что делаем", kk: "Біздің кез келген ісімізге негіз болатын принциптер" },
  about_team_title: { en: "Leadership Team", ru: "Руководство", kk: "Басшылық командасы" },
  about_team_subtitle: { en: "Experienced leaders driving innovation and excellence", ru: "Опытные лидеры, внедряющие инновации и стремление к совершенству", kk: "Инновациялар мен кемелдікке бастайтын тәжірибелі жетекшілер" },
  about_cta_title: { en: "Let's Work Together", ru: "Давайте работать вместе", kk: "Бірге жұмыс істейік" },
  about_cta_subtitle: { en: "Ready to start your next project? We'd love to hear from you and discuss how we can help.", ru: "Готовы начать следующий проект? Мы будем рады обсудить, чем можем быть полезны.", kk: "Келесі жобаңызды бастауға дайынсыз ба? Біз сіздің пікіріңізді тыңдауға және қалай көмектесе алатынымызды талқылауға қуаныштымыз." },

  // About Values
  about_value_excellence_title: { en: "Excellence", ru: "Совершенство", kk: "Кемелдік" },
  about_value_excellence_desc: { en: "We pursue the highest standards in everything we build, from code quality to user experience.", ru: "Мы придерживаемся высочайших стандартов во всем, что создаем — от качества кода до UX.", kk: "Біз код сапасынан бастап пайдаланушы тәжірибесіне дейін барлық нәрседе ең жоғары стандарттарды ұстанамыз." },
  about_value_security_title: { en: "Security First", ru: "Безопасность прежде всего", kk: "Ең алдымен қауіпсіздік" },
  about_value_security_desc: { en: "Security isn't an afterthought—it's built into every layer of our solutions from day one.", ru: "Безопасность для нас не пустой звук — она встроена в каждый слой наших решений с первого дня.", kk: "Қауіпсіздік — бұл кейінгі ой емес, ол бірінші күннен бастап біздің шешімдеріміздің әрбір қабатына енгізілген." },
  about_value_partnership_title: { en: "Client Partnership", ru: "Партнерство с клиентами", kk: "Клиенттермен серіктестік" },
  about_value_partnership_desc: { en: "We treat every client relationship as a true partnership, invested in your long-term success.", ru: "Мы относимся к отношениям с клиентами как к истинному партнерству, нацеленному на долгосрочный успех.", kk: "Біз әрбір клиентпен қарым-қатынасты ұзақ мерзімді табысқа бағытталған шынайы серіктестік ретінде қарастырамыз." },
  about_value_innovation_title: { en: "Innovation", ru: "Инновации", kk: "Инновациялар" },
  about_value_innovation_desc: { en: "We stay ahead of technology trends to deliver cutting-edge solutions that give you competitive advantage.", ru: "Мы идем в ногу с технологическими трендами, чтобы предлагать передовые решения для вашего преимущества.", kk: "Біз сізге бәсекелестік артықшылық беретін заманауи шешімдерді ұсыну үшін технологиялық трендтерден озып отырамыз." },
  // Case - UUB
  case_uub_title: { en: "UUB Investment App", ru: "Инвестиционное приложение UUB", kk: "UUB инвестициялық қосымшасы" },
  case_uub_desc: { en: "Retail investment platform with real-time market data and personalized portfolio management. AI-powered recommendations and automated trading capabilities.", ru: "Платформа для розничных инвестиций с рыночными данными в реальном времени и управлением портфелем.", kk: "Нақты уақыттағы нарықтық деректері және портфельді басқаруы бар бөлшек инвестициялық платформа." },
  case_uub_metric_1_label: { en: "AUM", ru: "Активы под управлением", kk: "Басқарудағы активтер" },
  case_uub_metric_2_label: { en: "Daily Trades", ru: "Торгов в день", kk: "Күніне келісім-шарттар" },
  case_uub_metric_3_label: { en: "User Growth", ru: "Рост пользователей", kk: "Пайдаланушылардың өсуі" },

  // Cookie Consent
  cookie_title: { en: "We use cookies", ru: "Мы используем cookies", kk: "Біз cookies пайдаланамыз" },
  cookie_description: { en: "We use cookies to enhance your experience. By continuing, you agree to our cookie policy.", ru: "Мы используем cookies для улучшения вашего опыта. Продолжая, вы соглашаетесь с нашей политикой cookies.", kk: "Біз сіздің тәжірибеңізді жақсарту үшін cookies пайдаланамыз. Жалғастыра отырып, сіз біздің cookies саясатымызбен келісесіз." },
  cookie_accept: { en: "Accept", ru: "Принять", kk: "Қабылдау" },
  cookie_decline: { en: "Decline", ru: "Отклонить", kk: "Бас тарту" },

  // Accessibility
  skip_to_content: { en: "Skip to main content", ru: "Перейти к основному содержимому", kk: "Негізгі мазмұнға өту" },
};
