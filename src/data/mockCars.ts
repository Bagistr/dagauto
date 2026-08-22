import { Car } from "@/types/car";

export const MOCK_CARS: Car[] = [
  {
    id: "dag-car-1",
    title: "Toyota Camry 2.5 AT Люкс Safety",
    make: "Toyota",
    model: "Camry",
    year: 2021,
    price: 2750000,
    mileage: 48000,
    engineVolume: 2.5,
    enginePower: 200,
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    drive: "FWD",
    color: "Белый перламутр",
    city: "Махачкала",
    
    registration: {
      type: "KG",
      countryName: "Киргизия (KG / ЕАЭС)",
      flag: "🇰🇬",
      isCustomsClearedRu: false,
      importDate: "12.02.2023",
      proxyExpiresAt: "12.02.2026",
      restrictionsRu: false,
      customsDetails: "Ввезен через Бишкек. Проходной на РФ учет при уплате коммерческого утильсбора.",
      estimatedClearanceCost: 909000,
    },
    
    bodyCondition: "NOT_BEATEN_NOT_PAINTED",
    trimLevel: "FULL_LUX",
    regionalMods: ["ARMOR_FILM", "FULL_TINT"],
    dealTypes: ["SALE_ONLY", "BARTER", "MURABAHA"],
    
    media: {
      images: [
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
      ],
      coldStartVideoUrl: "https://dagauto.ru/media/coldstart_camry70.mp4",
      exhaustAudioUrl: "https://dagauto.ru/media/exhaust_camry.mp3",
      has360View: true,
    },
    
    paintThickness: [
      { part: "Капот", microns: 115, isFactory: true },
      { part: "Переднее левое крыло", microns: 110, isFactory: true },
      { part: "Переднее правое крыло", microns: 118, isFactory: true },
      { part: "Водительская дверь", microns: 122, isFactory: true },
      { part: "Пассажирская передняя дверь", microns: 120, isFactory: true },
      { part: "Задняя левая дверь", microns: 115, isFactory: true },
      { part: "Задняя правая дверь", microns: 119, isFactory: true },
      { part: "Крыша", microns: 105, isFactory: true, notes: "В полиуретановой броне" },
      { part: "Крышка багажника", microns: 112, isFactory: true },
    ],
    
    stoInspection: {
      stoName: "«Анжи-Моторс Эксперт»",
      city: "Махачкала, пр-кт Акушинского",
      inspectorName: "Магомедов Руслан (Сертифицированный мастер)",
      inspectionDate: "18.08.2024",
      certificateId: "DAG-STO-7729",
      overallScore: 96,
      bodyScore: 98,
      engineScore: 97,
      transmissionScore: 95,
      suspensionScore: 94,
      computerDiagnostics: "CLEAN",
      notes: "Мотор шепчет, коробка 8-ступка листает без пинков. Подвеска в идеале. Все пломбы на месте.",
    },
    
    vouchRating: {
      telegramVerified: true,
      gosuslugiVerified: true,
      communityVouchesCount: 14,
      sellerReputationScore: 4.9,
    },
    
    barter: {
      acceptsBarter: true,
      types: ["WITH_BUYER_SURCHARGE"],
      desiredCars: ["Lada Vesta NG", "Lada Granta FL", "Hyundai Solaris"],
      minSurchargeRub: 1400000,
      notes: "Обменяю на свежую Весту или Гранту в люксе с вашей доплатой от 1.4 млн руб. Хлам не предлагать.",
    },
    
    murabaha: {
      available: true,
      minDownPaymentPercent: 30,
      maxTermMonths: 36,
      partnerFunds: ["LARiba", "MZHK"],
    },
    
    seller: {
      name: "Шамиль",
      phone: "+7 (928) 555-05-05",
      whatsappPhone: "+79285550505",
      telegramUsername: "shamil_camry05",
      isDealer: false,
      responseTimeMinutes: 5,
    },
    
    description: "Салам Алейкум. Продаю Камри 70 в предмаксимальной комплектации. Киргизский учёт (все документы чистые, доверенность свежая на 3 года). Машина вся в заводском окрасе, перед и зоны риска затянуты в дорогую плёнку SunTek. В салоне запах новой машины. Готов на любые проверки толщиномером и эндоскопом. Возможен бартер на Весту/Гранту с вашей доплатой или рассрочка через ЛяРиба.",
    viewsCount: 1420,
    createdAt: "2024-08-20",
    isBoosted: true,
  },
  {
    id: "dag-car-2",
    title: "Lada Priora 1.6 MT Black Edition (Пневма)",
    make: "Lada",
    model: "Priora",
    year: 2017,
    price: 780000,
    mileage: 95000,
    engineVolume: 1.6,
    enginePower: 106,
    fuelType: "GAS_PETROL",
    transmission: "MANUAL",
    drive: "FWD",
    color: "Черный космос",
    city: "Хасавюрт",
    
    registration: {
      type: "RU",
      countryName: "РФ Учёт",
      flag: "🇷🇺",
      isCustomsClearedRu: true,
      restrictionsRu: false,
      customsDetails: "05 регион. Юридически чистая, без запретов и штрафов.",
    },
    
    bodyCondition: "NOT_BEATEN_NOT_PAINTED",
    trimLevel: "BLACK_EDITION",
    regionalMods: ["AIR_SUSPENSION", "AUDIO_SQ_SPL", "LPG_WITH_MARK", "EXHAUST_TUNING", "FULL_TINT"],
    dealTypes: ["SALE_ONLY", "BARTER", "MURABAHA"],
    
    media: {
      images: [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop",
      ],
      coldStartVideoUrl: "https://dagauto.ru/media/coldstart_priora.mp4",
      exhaustAudioUrl: "https://dagauto.ru/media/exhaust_priora.mp3",
      has360View: false,
    },
    
    paintThickness: [
      { part: "Капот", microns: 95, isFactory: true },
      { part: "Крылья", microns: 90, isFactory: true },
      { part: "Двери", microns: 98, isFactory: true },
      { part: "Крыша", microns: 92, isFactory: true },
      { part: "Багажник", microns: 94, isFactory: true },
    ],
    
    stoInspection: {
      stoName: "«Хасавюрт Авто-Мастер»",
      city: "Хасавюрт, Махачкалинское шоссе",
      inspectorName: "Алиев Гаджи (Главный механик)",
      inspectionDate: "15.08.2024",
      certificateId: "DAG-STO-4912",
      overallScore: 92,
      bodyScore: 95,
      engineScore: 93,
      transmissionScore: 90,
      suspensionScore: 90,
      computerDiagnostics: "CLEAN",
      notes: "Пневма 4-контурная на рубенах, опускается в пол ровно. Музыка собрана на совесть (Pride Ruby, сабвуфер 15 дюймов). Газ форсуночный с отметкой.",
    },
    
    vouchRating: {
      telegramVerified: true,
      gosuslugiVerified: true,
      communityVouchesCount: 28,
      sellerReputationScore: 5.0,
    },
    
    barter: {
      acceptsBarter: true,
      types: ["KEY_TO_KEY", "WITH_SELLER_SURCHARGE"],
      desiredCars: ["Lada Vesta", "Kia Rio 4", "Hyundai Solaris"],
      notes: "Бартер ключ в ключ на Солярис или с моей доплатой до 300к на Весту.",
    },
    
    murabaha: {
      available: true,
      minDownPaymentPercent: 25,
      maxTermMonths: 24,
      partnerFunds: ["MZHK", "PRIVATE_ISLAMIC_POOL"],
    },
    
    seller: {
      name: "Мухаммад",
      phone: "+7 (988) 777-11-22",
      whatsappPhone: "+79887771122",
      telegramUsername: "muhammad_khas05",
      isDealer: false,
      responseTimeMinutes: 2,
    },
    
    description: "Приора 2 последней серии Black Edition в идеальнейшем состоянии! 100% не бит и не крашен, болты не крутились. Установлена дорогая 4-контурная пневмоподвеска с пультом и управлением с телефона. Музыка на 250 тыс рублей (фронт 3 пары Pride, усилители Apocalypse, саб в коробе). ГБО 4 поколения оформлено в ГИБДД. Выхлоп Stinger вся трасса, приятный басовитый звук. Сел и поехал собирать взгляды.",
    viewsCount: 3890,
    createdAt: "2024-08-21",
    isBoosted: true,
  },
  {
    id: "dag-car-3",
    title: "Mercedes-Benz E 300 AMG Line (W213)",
    make: "Mercedes-Benz",
    model: "E-Класс",
    year: 2019,
    price: 2450000,
    mileage: 72000,
    engineVolume: 2.0,
    enginePower: 245,
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    drive: "RWD",
    color: "Черный обсидиан",
    city: "Каспийск",
    
    registration: {
      type: "ABH",
      countryName: "Абхазия (ABH - Временный ввоз)",
      flag: "🟢",
      isCustomsClearedRu: false,
      proxyExpiresAt: "10.05.2025",
      restrictionsRu: true,
      customsDetails: "Абхазский учёт (на фирме). Передвижение по РФ по путевому листу и командировочному. Растаможка на РФ нецелесообразна.",
      estimatedClearanceCost: 1950000,
    },
    
    bodyCondition: "COSMETIC_REFRESH",
    trimLevel: "AMG_LINE",
    regionalMods: ["ENGINE_STAGE", "EXHAUST_TUNING", "FULL_TINT"],
    dealTypes: ["SALE_ONLY", "BARTER"],
    
    media: {
      images: [
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop",
      ],
      coldStartVideoUrl: "https://dagauto.ru/media/coldstart_e300.mp4",
      exhaustAudioUrl: "https://dagauto.ru/media/exhaust_e300.mp3",
      has360View: true,
    },
    
    paintThickness: [
      { part: "Капот", microns: 110, isFactory: true },
      { part: "Правая дверь", microns: 175, isFactory: false, notes: "Косметический окрас без шпатли (царапина)" },
      { part: "Остальные детали", microns: 115, isFactory: true },
    ],
    
    vouchRating: {
      telegramVerified: true,
      gosuslugiVerified: false,
      communityVouchesCount: 9,
      sellerReputationScore: 4.7,
    },
    
    barter: {
      acceptsBarter: true,
      types: ["REAL_ESTATE_LAND", "WITH_BUYER_SURCHARGE"],
      desiredCars: ["Toyota Camry 70", "Земельный участок в Каспийске/Махачкале"],
      notes: "Интересует обмен на земельный участок у моря в Каспийске или на РФ авто с доплатой.",
    },
    
    murabaha: {
      available: false,
      minDownPaymentPercent: 0,
      maxTermMonths: 0,
      partnerFunds: [],
    },
    
    seller: {
      name: "Ибрагим",
      phone: "+7 (963) 400-99-88",
      whatsappPhone: "+79634009988",
      telegramUsername: "ibragim_kaspiysk",
      isDealer: false,
      responseTimeMinutes: 10,
    },
    
    description: "Мерседес Е-класс W213 в оригинальном AMG пакете. Панорама, двойные экраны Widescreen, амбиентная подсветка 64 цвета, Burmester. Абхазский учёт, фирма действующая, документы продлены на год. Машина для тех, кто понимает специфику абхазского учёта. Stage 1 прошивка (290 л.с.), даунпайп с управляемыми заслонками на выхлопе. Рассмотрю бартер на участок или Camry.",
    viewsCount: 2950,
    createdAt: "2024-08-19",
    isBoosted: false,
  },
  {
    id: "dag-car-4",
    title: "BMW 530d xDrive M Sport (G30)",
    make: "BMW",
    model: "5 серия",
    year: 2020,
    price: 4350000,
    mileage: 63000,
    engineVolume: 3.0,
    enginePower: 249,
    fuelType: "DIESEL",
    transmission: "AUTOMATIC",
    drive: "AWD",
    color: "Синий Bluestone",
    city: "Махачкала",
    
    registration: {
      type: "AM",
      countryName: "Армения (AM)",
      flag: "🇦🇲",
      isCustomsClearedRu: false,
      importDate: "15.06.2022",
      restrictionsRu: false,
      customsDetails: "Армянский учёт. Полный пакет документов для РФ. Возможна постановка на РФ учет по запросу.",
      estimatedClearanceCost: 1450000,
    },
    
    bodyCondition: "ARMOR_FILM",
    trimLevel: "M_SPORT",
    regionalMods: ["ARMOR_FILM", "FULL_TINT", "ENGINE_STAGE"],
    dealTypes: ["SALE_ONLY", "MURABAHA", "BARTER"],
    
    media: {
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop",
      ],
      coldStartVideoUrl: "https://dagauto.ru/media/coldstart_bmw530.mp4",
      exhaustAudioUrl: "https://dagauto.ru/media/exhaust_bmw530.mp3",
      has360View: true,
    },
    
    paintThickness: [
      { part: "Кузов в круг", microns: 180, isFactory: true, notes: "Весь кузов затянут в дорогую полиуретановую бронепленку Llumar" },
    ],
    
    stoInspection: {
      stoName: "«Bavaria Motors Dagestan»",
      city: "Махачкала, ул. Бейбулатова",
      inspectorName: "Магомедтагир (BMW Certified)",
      inspectionDate: "19.08.2024",
      certificateId: "DAG-STO-9910",
      overallScore: 98,
      bodyScore: 100,
      engineScore: 98,
      transmissionScore: 97,
      suspensionScore: 96,
      computerDiagnostics: "CLEAN",
      notes: "Дизель B57 в идеальном состоянии, коррекции форсунок околонулевые. Раздатка и редуктора сухие.",
    },
    
    vouchRating: {
      telegramVerified: true,
      gosuslugiVerified: true,
      communityVouchesCount: 31,
      sellerReputationScore: 5.0,
    },
    
    barter: {
      acceptsBarter: true,
      types: ["WITH_BUYER_SURCHARGE", "REAL_ESTATE_LAND"],
      desiredCars: ["Toyota Land Cruiser 200", "Квартира каркас в Махачкале"],
      minSurchargeRub: 1500000,
      notes: "Бартер на каркас от проверенного застройщика или на Крузак 200.",
    },
    
    murabaha: {
      available: true,
      minDownPaymentPercent: 35,
      maxTermMonths: 36,
      partnerFunds: ["LARiba"],
    },
    
    seller: {
      name: "Арсен",
      phone: "+7 (928) 000-77-77",
      whatsappPhone: "+79280007777",
      telegramUsername: "arsen_bavaria05",
      isDealer: false,
      responseTimeMinutes: 1,
    },
    
    description: "BMW G30 530d xDrive M-Paket. Надёжнейший трехлитровый дизель B57 на 249 л.с. (налог смешной). Лазерные фары Laserlight, бесключевой доступ, проекция на лобовое, доводчики дверей, харман. Кузов с первого дня в матовой бронепленке. Обслуживание строго в Баварии каждые 7000 км. Возможна рассрочка по нормам Ислама через фонд «ЛяРиба-Финанс».",
    viewsCount: 4120,
    createdAt: "2024-08-21",
    isBoosted: true,
  },
  {
    id: "dag-car-5",
    title: "Toyota Land Cruiser 200 4.5d Executive White",
    make: "Toyota",
    model: "Land Cruiser 200",
    year: 2019,
    price: 6850000,
    mileage: 82000,
    engineVolume: 4.5,
    enginePower: 249,
    fuelType: "DIESEL",
    transmission: "AUTOMATIC",
    drive: "AWD",
    color: "Белый перламутр",
    city: "Дербент",
    
    registration: {
      type: "RU",
      countryName: "РФ Учёт",
      flag: "🇷🇺",
      isCustomsClearedRu: true,
      restrictionsRu: false,
      customsDetails: "Официальный дилерский авто РФ. Оригинал ПТС, 1 хозяин.",
    },
    
    bodyCondition: "NOT_BEATEN_NOT_PAINTED",
    trimLevel: "EXECUTIVE",
    regionalMods: ["ARMOR_FILM", "ARMORED_GLASS", "FULL_TINT"],
    dealTypes: ["SALE_ONLY", "BARTER", "MURABAHA"],
    
    media: {
      images: [
        "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop",
      ],
      coldStartVideoUrl: "https://dagauto.ru/media/coldstart_lc200.mp4",
      exhaustAudioUrl: "https://dagauto.ru/media/exhaust_lc200.mp3",
      has360View: true,
    },
    
    paintThickness: [
      { part: "Кузов в круг", microns: 120, isFactory: true, notes: "Заводской окрас 100%, ни один болт не крутился" },
    ],
    
    stoInspection: {
      stoName: "«Дербент-Сервис Тойота»",
      city: "Дербент, ул. Гагарина",
      inspectorName: "Курбанов Камиль",
      inspectionDate: "17.08.2024",
      certificateId: "DAG-STO-1188",
      overallScore: 99,
      bodyScore: 100,
      engineScore: 99,
      transmissionScore: 99,
      suspensionScore: 98,
      computerDiagnostics: "CLEAN",
      notes: "Гидроподвеска работает во всех положениях, рама обработана антикором Dinitrol, номер рамы читается идеально.",
    },
    
    vouchRating: {
      telegramVerified: true,
      gosuslugiVerified: true,
      communityVouchesCount: 45,
      sellerReputationScore: 5.0,
    },
    
    barter: {
      acceptsBarter: true,
      types: ["REAL_ESTATE_LAND", "WITH_BUYER_SURCHARGE"],
      desiredCars: ["Camry 70 / 80", "Коммерческая недвижимость в Дербенте или Махачкале"],
      notes: "Рассмотрю обмен на коммерческое помещение или квартиру с вашей доплатой.",
    },
    
    murabaha: {
      available: true,
      minDownPaymentPercent: 30,
      maxTermMonths: 36,
      partnerFunds: ["LARiba", "MZHK"],
    },
    
    seller: {
      name: "Гаджимурад",
      phone: "+7 (928) 888-05-05",
      whatsappPhone: "+79288880505",
      telegramUsername: "gadzhi_derbent",
      isDealer: false,
      responseTimeMinutes: 3,
    },
    
    description: "Легендарный двухсотый Крузак в максимальной комплектации Executive White. Гидроподвеска, темный салон, потолок черная алькантара, задние мониторы. Кузов полностью в бронепленке. Установлены бронестекла (двойной триплекс). Идеальное состояние без преувеличения. Любые проверки в любом СТО за ваш счет приветствуются.",
    viewsCount: 5200,
    createdAt: "2024-08-20",
    isBoosted: true,
  },
  {
    id: "dag-car-6",
    title: "Lada Vesta NG 1.6 MT Люкс Enjoy",
    make: "Lada",
    model: "Vesta",
    year: 2023,
    price: 1480000,
    mileage: 18000,
    engineVolume: 1.6,
    enginePower: 106,
    fuelType: "GAS_PETROL",
    transmission: "MANUAL",
    drive: "FWD",
    color: "Ледниковый белый",
    city: "Буйнакск",
    
    registration: {
      type: "RU",
      countryName: "РФ Учёт",
      flag: "🇷🇺",
      isCustomsClearedRu: true,
      restrictionsRu: false,
      customsDetails: "Куплена у официального дилера Каспий-Лада. На гарантии.",
    },
    
    bodyCondition: "NOT_BEATEN_NOT_PAINTED",
    trimLevel: "LUX",
    regionalMods: ["LPG_WITH_MARK", "FULL_TINT"],
    dealTypes: ["SALE_ONLY", "BARTER", "MURABAHA"],
    
    media: {
      images: [
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1000&auto=format&fit=crop",
      ],
      coldStartVideoUrl: "https://dagauto.ru/media/coldstart_vesta.mp4",
      has360View: false,
    },
    
    paintThickness: [
      { part: "Кузов в круг", microns: 105, isFactory: true },
    ],
    
    vouchRating: {
      telegramVerified: true,
      gosuslugiVerified: true,
      communityVouchesCount: 8,
      sellerReputationScore: 4.8,
    },
    
    barter: {
      acceptsBarter: true,
      types: ["WITH_SELLER_SURCHARGE"],
      desiredCars: ["Toyota Camry 70", "Kia K5"],
      minSurchargeRub: 800000,
      maxSurchargeRub: 1400000,
      notes: "Хочу перейти на Камри 70 или К5. Готов доплатить разницу сразу наличными.",
    },
    
    murabaha: {
      available: true,
      minDownPaymentPercent: 20,
      maxTermMonths: 36,
      partnerFunds: ["MZHK", "PRIVATE_ISLAMIC_POOL"],
    },
    
    seller: {
      name: "Мурад",
      phone: "+7 (928) 333-22-11",
      whatsappPhone: "+79283332211",
      telegramUsername: "murad_buynaksk",
      isDealer: false,
      responseTimeMinutes: 8,
    },
    
    description: "Веста нового поколения NG. Состояние новой машины. Комплектация Enjoy: цифровая приборка, мультимедиа с Яндекс Навигатором, камера заднего вида, обогрев лобового, круиз. Установлено качественное ГБО OMVL с отметкой в ПТС. Готов к бартеру на Камри 70 с моей доплатой.",
    viewsCount: 1680,
    createdAt: "2024-08-22",
    isBoosted: false,
  }
];
