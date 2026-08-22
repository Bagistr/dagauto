export interface PartnerSTO {
  id: string;
  name: string;
  city: 'Махачкала' | 'Хасавюрт' | 'Дербент' | 'Каспийск';
  address: string;
  rating: number;
  reviewsCount: number;
  checksCompleted: number;
  phone: string;
  specialization: string[];
  priceRub: number;
  isOfficialPartner: boolean;
  features: string[];
}

export const PARTNER_STO_LIST: PartnerSTO[] = [
  {
    id: "sto-1",
    name: "«Анжи-Моторс Эксперт»",
    city: "Махачкала",
    address: "пр-кт Али-Гаджи Акушинского, 100/1",
    rating: 4.95,
    reviewsCount: 342,
    checksCompleted: 1280,
    phone: "+7 (988) 291-05-05",
    specialization: ["Toyota / Lexus", "Немецкая тройка (BMW, Mercedes, VAG)", "Корейские авто"],
    priceRub: 3500,
    isOfficialPartner: true,
    features: [
      "Проверка ЛКП толщиномером с калибровкой",
      "Эндоскопия цилиндров и замер компрессии",
      "Компьютерная диагностика дилерскими сканерами Launch / Star Diagnosis",
      "Проверка геометрии кузова на лазерном стенде",
      "Формирование электронного чек-листа с QR-кодом"
    ]
  },
  {
    id: "sto-2",
    name: "«Хасавюрт Авто-Мастер»",
    city: "Хасавюрт",
    address: "Махачкалинское шоссе, 42А",
    rating: 4.9,
    reviewsCount: 215,
    checksCompleted: 890,
    phone: "+7 (928) 500-11-22",
    specialization: ["ВАЗ / Lada", "Пневмоподвеска и тюнинг", "Японские авто"],
    priceRub: 2500,
    isOfficialPartner: true,
    features: [
      "Проверка пневмосистем и ресиверов",
      "Диагностика ГБО всех поколений (Digitronic, OMVL, BRC)",
      "Проверка заводских швов и лонжеронов",
      "Замер давления масла и компрессии"
    ]
  },
  {
    id: "sto-3",
    name: "«Bavaria Motors Dagestan»",
    city: "Махачкала",
    address: "ул. Бейбулатова, 53",
    rating: 4.98,
    reviewsCount: 180,
    checksCompleted: 740,
    phone: "+7 (928) 000-77-77",
    specialization: ["BMW M / Mercedes AMG / Audi RS", "Премиум сегмент"],
    priceRub: 5000,
    isOfficialPartner: true,
    features: [
      "Оригинальные диагностические комплексы BMW ISTA / Mercedes Xentry",
      "Считывание реального пробега со всех блоков (CAS, EGS, Ключи)",
      "Проверка задиров и состояния турбин",
      "Тест-драйв с логированием параметров двигателя"
    ]
  },
  {
    id: "sto-4",
    name: "«Дербент-Сервис Тойота»",
    city: "Дербент",
    address: "ул. Юрия Гагарина, 88",
    rating: 4.88,
    reviewsCount: 140,
    checksCompleted: 510,
    phone: "+7 (928) 888-05-05",
    specialization: ["Внедорожники (LC200, Prado, Patrol)", "Toyota / Nissan"],
    priceRub: 3000,
    isOfficialPartner: true,
    features: [
      "Осмотр рамы, коррозии и проверка VIN на раме",
      "Диагностика полного привода, раздаток и блокировок",
      "Проверка гидроподвески KDSS / AHC"
    ]
  }
];
