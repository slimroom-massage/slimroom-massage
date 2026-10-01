export type Language = "ru" | "en" | "el";
export const contact = {
  phone: "+357 95 111 676",
  whatsapp: "https://wa.me/35795111676",
  instagram: "https://www.instagram.com/massage.slimroom/",
  handle: "@massage.slimroom",
};

// Stable IDs keep the selected treatment when the language changes.
export const treatments = [
  {
    id: "anti-cellulite",
    symbol: "≈",
    durationMinutes: 60,
    ru: {
      name: "Классический антицеллюлитный массаж",
      description:
        "Ручной массаж с акцентом на зоны, требующие особого внимания. Интенсивность и техники подбираются индивидуально для ухода за кожей и силуэтом.",
    },
    en: {
      name: "Classic anti-cellulite massage",
      description:
        "Focused manual massage for areas that need extra attention. Techniques and pressure are tailored to your comfort, with care for your skin and body contours.",
    },
    el: {
      name: "Κλασικό μασάζ κατά της κυτταρίτιδας",
      description:
        "Χειρομάλαξη με έμφαση στις περιοχές που χρειάζονται ιδιαίτερη φροντίδα. Οι τεχνικές και η ένταση προσαρμόζονται σε εσάς, για την περιποίηση της επιδερμίδας και του περιγράμματος του σώματος.",
    },
  },
  {
    id: "anti-cellulite-complex",
    symbol: "≋",
    durationMinutes: 60,
    ru: {
      name: "Комплексный антицеллюлитный массаж",
      description:
        "Индивидуальное сочетание ручного массажа, баночных техник, массажных перчаток, медового массажа и мадеротерапии. Комплексный уход за кожей и контурами тела.",
    },
    en: {
      name: "Comprehensive anti-cellulite massage",
      description:
        "A personalised combination of manual massage, cupping, massage gloves, honey massage and maderotherapy. A comprehensive approach to caring for your skin and body contours.",
    },
    el: {
      name: "Συνδυαστικό μασάζ κατά της κυτταρίτιδας",
      description:
        "Εξατομικευμένος συνδυασμός χειρομάλαξης, μασάζ με βεντούζες, γάντια μασάζ, μέλι και μαδεροθεραπεία. Ολοκληρωμένη φροντίδα για την επιδερμίδα και το περίγραμμα του σώματος.",
    },
  },
  {
    id: "maderotherapy",
    symbol: "⌁",
    durationMinutes: 60,
    ru: {
      name: "Мадеротерапия с баночным массажем",
      description:
        "Массаж деревянными инструментами в сочетании с баночными техниками. Ритмичная проработка выбранных зон с вниманием к контурам тела и вашему комфорту.",
    },
    en: {
      name: "Maderotherapy with cupping",
      description:
        "Massage with wooden tools complemented by cupping techniques. Rhythmic work on selected areas, with attention to your body contours and comfort.",
    },
    el: {
      name: "Μαδεροθεραπεία με βεντούζες",
      description:
        "Μασάζ με ξύλινα εργαλεία σε συνδυασμό με τεχνικές μασάζ με βεντούζες. Ρυθμική μάλαξη σε επιλεγμένες περιοχές, με προσοχή στο περίγραμμα του σώματος και την άνεσή σας.",
    },
  },
  {
    id: "therapeutic",
    symbol: "✳",
    durationMinutes: 60,
    ru: {
      name: "Терапевтический массаж",
      description:
        "Внимательная работа с мышцами и участками напряжения. Глубина и темп массажа подбираются под ваши ощущения для расслабления и комфорта в движении.",
    },
    en: {
      name: "Therapeutic massage",
      description:
        "Attentive work on muscles and areas of tension. Massage depth and pace are adapted to how you feel, with a focus on relaxation and ease of movement.",
    },
    el: {
      name: "Θεραπευτικό μασάζ",
      description:
        "Προσεκτική μάλαξη των μυών και των περιοχών έντασης. Το βάθος και ο ρυθμός προσαρμόζονται στις ανάγκες σας, με έμφαση στη χαλάρωση και την άνεση στην κίνηση.",
    },
  },
  {
    id: "pregnancy",
    symbol: "◡",
    durationMinutes: 60,
    ru: {
      name: "Массаж для беременных",
      description:
        "Бережный массаж с удобным положением тела и вниманием к вашему самочувствию. Мягкие техники для расслабления и спокойного времени для себя.",
    },
    en: {
      name: "Pregnancy massage",
      description:
        "Gentle massage with comfortable positioning and attention to how you feel. Soft, unhurried techniques for relaxation and a peaceful moment for yourself.",
    },
    el: {
      name: "Μασάζ εγκυμοσύνης",
      description:
        "Απαλό μασάζ με άνετη τοποθέτηση του σώματος και προσοχή στο πώς αισθάνεστε. Ήπιες τεχνικές για χαλάρωση και μια ήρεμη στιγμή για τον εαυτό σας.",
    },
  },
  {
    id: "children",
    symbol: "○",
    durationMinutes: 30,
    ru: {
      name: "Детский массаж",
      description:
        "Деликатный массаж с учётом возраста ребёнка и его комфорта. Спокойный темп, мягкие движения и индивидуальное внимание на протяжении сеанса.",
    },
    en: {
      name: "Children’s massage",
      description:
        "Gentle massage tailored to your child’s age and comfort. A calm pace, soft movements and individual attention throughout the session.",
    },
    el: {
      name: "Παιδικό μασάζ",
      description:
        "Απαλό μασάζ προσαρμοσμένο στην ηλικία και την άνεση του παιδιού. Ήρεμος ρυθμός, απαλές κινήσεις και εξατομικευμένη προσοχή σε όλη τη διάρκεια της συνεδρίας.",
    },
  },
  {
    id: "facial-sculpting",
    symbol: "◇",
    durationMinutes: 60,
    ru: {
      name: "Скульптурный массаж лица",
      description:
        "Точная ручная проработка мышц лица с акцентом на его естественные контуры. Продуманные массажные движения для расслабления и ухоженного вида.",
    },
    en: {
      name: "Facial sculpting massage",
      description:
        "Precise manual work on facial muscles with attention to your natural contours. Carefully considered massage movements for relaxation and a refreshed appearance.",
    },
    el: {
      name: "Μασάζ σμίλευσης προσώπου",
      description:
        "Στοχευμένη χειρομάλαξη των μυών του προσώπου με έμφαση στο φυσικό του περίγραμμα. Προσεγμένες κινήσεις μασάζ για χαλάρωση και ανανεωμένη όψη.",
    },
  },
  {
    id: "bioenergy-facial-sculpting",
    symbol: "✧",
    durationMinutes: 60,
    ru: {
      name: "Биоэнергетический скульптурный массаж лица",
      description:
        "Скульптурные приёмы в сочетании с мягкими биоэнергетическими техниками. Сеанс с акцентом на расслабление лица, спокойный ритм и ощущение гармонии.",
    },
    en: {
      name: "Bioenergy facial sculpting massage",
      description:
        "Facial sculpting combined with gentle bioenergy techniques. A session centred on facial relaxation, an unhurried rhythm and a sense of balance.",
    },
    el: {
      name: "Βιοενεργειακό μασάζ σμίλευσης προσώπου",
      description:
        "Τεχνικές σμίλευσης προσώπου σε συνδυασμό με απαλές βιοενεργειακές τεχνικές. Μια συνεδρία με έμφαση στη χαλάρωση του προσώπου, τον ήρεμο ρυθμό και την αίσθηση αρμονίας.",
    },
  },
  {
    id: "stretching",
    symbol: "↗",
    durationMinutes: 60,
    ru: {
      name: "Индивидуальный сеанс растяжки",
      description:
        "Растяжка в комфортном темпе с вниманием к вашим возможностям. Упражнения подбираются индивидуально для работы над гибкостью и свободой движений.",
    },
    en: {
      name: "Individual stretching session",
      description:
        "Stretching at a comfortable pace, with attention to your range of movement. Exercises are tailored to you, with a focus on flexibility and ease of movement.",
    },
    el: {
      name: "Ατομική συνεδρία διατάσεων",
      description:
        "Διατάσεις σε άνετο ρυθμό, με σεβασμό στις δυνατότητές σας. Οι ασκήσεις επιλέγονται εξατομικευμένα, με έμφαση στην ευλυγισία και την ελευθερία κινήσεων.",
    },
  },
] as const;

export const copy = {
  ru: {
    skip: "Перейти к содержанию",
    languageLabel: "Язык сайта",
    bookingGreeting: "Здравствуйте, Алина! Хочу записаться.",
    nav: ["Обо мне", "Процедуры", "Контакты"],
    book: "Записаться",
    menu: "Меню",
    close: "Закрыть меню",
    eyebrow: "Индивидуальный уход · Кипр",
    hero: ["Лёгкость в теле.", "Уверенность", "в себе."],
    intro:
      "Массаж и коррекция фигуры с заботой о вас. Авторские техники, персональный подход и пространство, где можно уделить время себе.",
    bookSession: "Записаться на массаж",
    explore: "Выбрать процедуру",
    photoNote: "Ваше время. Ваша забота о себе.",
    experience: "лет опыта",
    clients: "клиентов",
    scroll: "Познакомимся ближе",
    aboutLabel: "01 / Обо мне",
    aboutTitle: "Забота о теле —",
    aboutAccent: "моя профессия.",
    aboutRole: "Alina Kärsten · эксперт по телесной терапии",
    aboutText:
      "Более 8 лет я работаю с коррекцией фигуры и антицеллюлитной терапией, помогая женщинам чувствовать себя увереннее в своём теле.",
    aboutText2:
      "Мой подход сочетает проверенные техники массажа, современное оборудование и персональный уход.",
    // Source: slimmalina/backend/src/config/default-config.ts, aboutPage.
    credentialsTitle: "Квалификация и сертификаты",
    credentialsList: [
      "Сертифицированный терапевт-учитель 5* категории в ЕС",
      "Профессиональный преподаватель",
      "Специалист по антицеллюлитной терапии",
      "Авторские техники массажа",
    ],
    quote:
      "Каждая женщина заслуживает чувствовать себя комфортно в своём теле. Я здесь, чтобы помочь вам достичь этого.",
    servicesLabel: "02 / Процедуры",
    servicesTitle: "Найдите свой",
    servicesAccent: "массаж.",
    servicesIntro:
      "Персональные процедуры для ваших целей. Подберём подходящий уход вместе.",
    choose: "Выбрать",
    minuteUnit: "мин",
    servicesNote:
      "Техники и интенсивность подбираются индивидуально с учётом ваших пожеланий.",
    spaceLabel: "Пространство для себя",
    spaceTitle: "Маленькая пауза.",
    spaceAccent: "Большая забота.",
    spaceText:
      "Индивидуальный уход, внимание к вашим пожеланиям и спокойная атмосфера студии.",
    bookingLabel: "03 / Запись и контакты",
    bookingTitle: "Начнём с",
    bookingAccent: "ваших пожеланий.",
    bookingIntro:
      "Расскажите, какой массаж вас интересует, и укажите удобное время. Я отвечу лично и помогу подобрать процедуру.",
    location: "Кипр · приём по записи",
    name: "Ваше имя",
    namePlaceholder: "Как к вам обращаться?",
    phone: "Номер телефона",
    service: "Процедура",
    select: "Выберите процедуру",
    consultation: "Помогите выбрать массаж",
    date: "Желаемая дата",
    time: "Удобное время",
    timePlaceholder: "Например, после 16:00",
    optional: "необязательно",
    message: "Ваши пожелания",
    messagePlaceholder: "Расскажите о своих целях или задайте вопрос",
    submit: "Продолжить в WhatsApp",
    formNote:
      "Откроется WhatsApp с готовым текстом. Отправьте сообщение, чтобы согласовать запись. Дата и время подтверждаются лично.",
    required: "Имя, телефон и процедура обязательны.",
    privacy:
      "Данные формы используются только для подготовки вашего сообщения в WhatsApp.",
    footerTagline: "Забота, которую вы чувствуете.",
    footerDescription:
      "Массаж, уход за лицом и телом, растяжка — с вниманием к вам и вашим пожеланиям.",
    footerNavigation: "Навигация",
    footerContact: "Будем на связи",
    rights: "Все права защищены.",
    back: "Наверх",
    portraitAlt: "Алина с букетом цветов в студии",
    studioAlt: "Светлая массажная студия",
    massageToolsAlt: "Деревянные инструменты для массажа Slimroom",
    cardAlt: "Визитка студии среди розовых лент",
    journalAlt: "Розовый блокнот с вдохновляющей надписью",
    title: "Slimroom — массаж и коррекция фигуры на Кипре",
    description:
      "Массаж и коррекция фигуры с Алиной на Кипре. Запись через WhatsApp.",
  },
  en: {
    skip: "Skip to content",
    languageLabel: "Website language",
    bookingGreeting: "Hello Alina! I’d like to book.",
    nav: ["About me", "Treatments", "Contact"],
    book: "Book a session",
    menu: "Menu",
    close: "Close menu",
    eyebrow: "Personalized care · Cyprus",
    hero: ["A lighter body.", "A more confident", "you."],
    intro:
      "Body therapy with you at its heart. Expert massage techniques, a personal approach and a space to make time for yourself.",
    bookSession: "Book a massage",
    explore: "Explore treatments",
    photoNote: "Your time. Your kind of self-care.",
    experience: "years of experience",
    clients: "clients",
    scroll: "Get to know me",
    aboutLabel: "01 / About me",
    aboutTitle: "Caring for your body.",
    aboutAccent: "It’s what I do.",
    aboutRole: "Alina Kärsten · body therapy expert",
    aboutText:
      "With over 8 years of experience in body sculpting and anti-cellulite therapy, I have helped hundreds of women feel more confident in their bodies.",
    aboutText2:
      "My approach combines proven massage techniques, modern equipment and personalized care.",
    credentialsTitle: "Credentials & Certifications",
    credentialsList: [
      "EU Certified 5★ Therapist & Educator",
      "Professional Instructor",
      "Anti-Cellulite Therapy Specialist",
      "Author of Signature Massage Techniques",
    ],
    quote:
      "Every woman deserves to feel at home in her body. I’m here to help you get there.",
    servicesLabel: "02 / Treatments",
    servicesTitle: "Find your kind",
    servicesAccent: "of care.",
    servicesIntro:
      "Personalized treatments for your goals. We’ll find the right approach together.",
    choose: "Choose treatment",
    minuteUnit: "min",
    servicesNote:
      "Techniques and intensity are tailored to your needs and preferences.",
    spaceLabel: "A space for yourself",
    spaceTitle: "A little pause.",
    spaceAccent: "A lot of care.",
    spaceText:
      "Personalized care, attention to your wishes and a calm studio atmosphere.",
    bookingLabel: "03 / Booking & contact",
    bookingTitle: "Let’s start",
    bookingAccent: "with you.",
    bookingIntro:
      "Tell me which treatment you’re interested in and when you’re available. I’ll reply personally and help you choose your care.",
    location: "Cyprus · by appointment",
    name: "Your name",
    namePlaceholder: "What should I call you?",
    phone: "Phone number",
    service: "Treatment",
    select: "Select a treatment",
    consultation: "Help me choose a massage",
    date: "Preferred date",
    time: "Preferred time",
    timePlaceholder: "For example, after 4 pm",
    optional: "optional",
    message: "Your wishes",
    messagePlaceholder: "Tell me about your goals or ask a question",
    submit: "Continue in WhatsApp",
    formNote:
      "WhatsApp will open with your message ready. Send it to arrange your booking. The date and time are confirmed personally.",
    required: "Name, phone and treatment are required.",
    privacy: "Form details are used only to prepare your WhatsApp message.",
    footerTagline: "Care you can feel.",
    footerDescription:
      "Massage, face and body care, and stretching — thoughtfully tailored to you.",
    footerNavigation: "Explore",
    footerContact: "Let’s keep in touch",
    rights: "All rights reserved.",
    back: "Back to top",
    portraitAlt: "Alina holding flowers in her studio",
    studioAlt: "A bright massage studio",
    massageToolsAlt: "Slimroom wooden massage tools",
    cardAlt: "Studio business card among pink ribbons",
    journalAlt: "Pink notebook with an inspiring message",
    title: "Slimroom — Body therapy & massage in Cyprus",
    description:
      "Personalized massage and body sculpting with Alina in Cyprus. Book through WhatsApp.",
  },
  el: {
    skip: "Μετάβαση στο περιεχόμενο",
    languageLabel: "Γλώσσα ιστοσελίδας",
    bookingGreeting: "Γεια σας, Alina! Θα ήθελα να κλείσω ένα ραντεβού.",
    nav: ["Σχετικά με εμένα", "Θεραπείες", "Επικοινωνία"],
    book: "Κλείστε ραντεβού",
    menu: "Μενού",
    close: "Κλείσιμο μενού",
    eyebrow: "Εξατομικευμένη φροντίδα · Κύπρος",
    hero: ["Ανάλαφρο σώμα.", "Αυτοπεποίθηση", "για εσάς."],
    intro:
      "Μασάζ και σμίλευση σώματος με επίκεντρο εσάς. Εξειδικευμένες τεχνικές, προσωπική προσέγγιση και ένας χώρος για να αφιερώσετε χρόνο στον εαυτό σας.",
    bookSession: "Κλείστε ένα μασάζ",
    explore: "Δείτε τις θεραπείες",
    photoNote: "Ο χρόνος σας. Η φροντίδα σας.",
    experience: "χρόνια εμπειρίας",
    clients: "πελάτισσες",
    scroll: "Ας γνωριστούμε",
    aboutLabel: "01 / Σχετικά με εμένα",
    aboutTitle: "Η φροντίδα του σώματος —",
    aboutAccent: "το επάγγελμά μου.",
    aboutRole: "Alina Kärsten · ειδικός στη σωματική θεραπεία",
    aboutText:
      "Για περισσότερα από 8 χρόνια ασχολούμαι με τη σμίλευση σώματος και τις θεραπείες κατά της κυτταρίτιδας, βοηθώντας τις γυναίκες να νιώθουν μεγαλύτερη αυτοπεποίθηση στο σώμα τους.",
    aboutText2:
      "Η προσέγγισή μου συνδυάζει δοκιμασμένες τεχνικές μασάζ, σύγχρονο εξοπλισμό και εξατομικευμένη φροντίδα.",
    credentialsTitle: "Προσόντα και πιστοποιήσεις",
    credentialsList: [
      "Πιστοποιημένη θεραπεύτρια και εκπαιδεύτρια κατηγορίας 5★ στην ΕΕ",
      "Επαγγελματίας εκπαιδεύτρια",
      "Ειδικός στις θεραπείες κατά της κυτταρίτιδας",
      "Δημιουργός προσωπικών τεχνικών μασάζ",
    ],
    quote:
      "Κάθε γυναίκα αξίζει να νιώθει άνετα στο σώμα της. Είμαι εδώ για να σας βοηθήσω να το πετύχετε.",
    servicesLabel: "02 / Θεραπείες",
    servicesTitle: "Βρείτε το μασάζ",
    servicesAccent: "που σας ταιριάζει.",
    servicesIntro:
      "Εξατομικευμένες θεραπείες για τους στόχους σας. Μαζί θα βρούμε την κατάλληλη φροντίδα.",
    choose: "Επιλέξτε",
    minuteUnit: "λεπτά",
    servicesNote:
      "Οι τεχνικές και η ένταση προσαρμόζονται στις ανάγκες και τις προτιμήσεις σας.",
    spaceLabel: "Ένας χώρος για εσάς",
    spaceTitle: "Μια μικρή παύση.",
    spaceAccent: "Πολλή φροντίδα.",
    spaceText:
      "Εξατομικευμένη φροντίδα, προσοχή στις επιθυμίες σας και μια ήρεμη ατμόσφαιρα στο στούντιο.",
    bookingLabel: "03 / Ραντεβού και επικοινωνία",
    bookingTitle: "Ας ξεκινήσουμε",
    bookingAccent: "με τις επιθυμίες σας.",
    bookingIntro:
      "Πείτε μου ποιο μασάζ σας ενδιαφέρει και ποια ώρα σας βολεύει. Θα σας απαντήσω προσωπικά και θα σας βοηθήσω να επιλέξετε τη σωστή θεραπεία.",
    location: "Κύπρος · κατόπιν ραντεβού",
    name: "Το όνομά σας",
    namePlaceholder: "Πώς να σας αποκαλώ;",
    phone: "Αριθμός τηλεφώνου",
    service: "Θεραπεία",
    select: "Επιλέξτε θεραπεία",
    consultation: "Βοηθήστε με να επιλέξω μασάζ",
    date: "Επιθυμητή ημερομηνία",
    time: "Ώρα που σας βολεύει",
    timePlaceholder: "Για παράδειγμα, μετά τις 16:00",
    optional: "προαιρετικό",
    message: "Οι επιθυμίες σας",
    messagePlaceholder: "Πείτε μου για τους στόχους σας ή κάντε μια ερώτηση",
    submit: "Συνέχεια στο WhatsApp",
    formNote:
      "Το WhatsApp θα ανοίξει με έτοιμο το μήνυμά σας. Στείλτε το για να κανονίσουμε το ραντεβού σας. Η ημερομηνία και η ώρα επιβεβαιώνονται προσωπικά.",
    required: "Το όνομα, το τηλέφωνο και η θεραπεία είναι υποχρεωτικά.",
    privacy:
      "Τα στοιχεία της φόρμας χρησιμοποιούνται μόνο για την προετοιμασία του μηνύματός σας στο WhatsApp.",
    footerTagline: "Φροντίδα που αισθάνεστε.",
    footerDescription:
      "Μασάζ, περιποίηση προσώπου και σώματος, διατάσεις — με προσοχή σε εσάς και τις επιθυμίες σας.",
    footerNavigation: "Περιηγηθείτε",
    footerContact: "Ας μείνουμε σε επαφή",
    rights: "Με επιφύλαξη παντός δικαιώματος.",
    back: "Επιστροφή στην κορυφή",
    portraitAlt: "Η Alina με ένα μπουκέτο λουλούδια στο στούντιο",
    studioAlt: "Ένα φωτεινό στούντιο μασάζ",
    massageToolsAlt: "Ξύλινα εργαλεία μασάζ Slimroom",
    cardAlt: "Επαγγελματική κάρτα του στούντιο ανάμεσα σε ροζ κορδέλες",
    journalAlt: "Ροζ σημειωματάριο με ένα εμπνευσμένο μήνυμα",
    title: "Slimroom — Μασάζ και σμίλευση σώματος στην Κύπρο",
    description:
      "Εξατομικευμένο μασάζ και σμίλευση σώματος με την Alina στην Κύπρο. Κλείστε ραντεβού μέσω WhatsApp.",
  },
} satisfies Record<Language, Record<string, string | string[]>>;
