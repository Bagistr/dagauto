export type RegistrationCountry = 'RU' | 'KG' | 'AM' | 'ABH' | 'OS' | 'NO_DOCS';

export type BodyCondition = 'NOT_BEATEN_NOT_PAINTED' | 'COSMETIC_REFRESH' | 'FULL_REPAINT' | 'ARMOR_FILM';

export type TrimLevel = 'NORMA' | 'LUX' | 'FULL_LUX' | 'BLACK_EDITION' | 'EXECUTIVE' | 'SPORT' | 'AMG_LINE' | 'M_SPORT';

export type DealType = 'SALE_ONLY' | 'BARTER' | 'MURABAHA' | 'URGENT_BUYOUT';

export type RegionalMod = 
  | 'AIR_SUSPENSION'      // Пневмоподвеска
  | 'AUDIO_SQ_SPL'        // Автозвук SQ / SPL
  | 'LPG_WITH_MARK'       // Газ (ГБО) с отметкой в ПТС
  | 'LPG_WITHOUT_MARK'    // Газ (ГБО) без отметки
  | 'EXHAUST_TUNING'      // Тюнинг выхлопа / заслонки
  | 'ENGINE_STAGE'        // Stage 1 / Stage 2 прошивка
  | 'FULL_TINT'           // В круг тонировка (включая лобовое)
  | 'ARMOR_FILM'          // В бронеплёнке
  | 'ARMORED_GLASS';      // Бронестекла

export interface ThicknessMeasurement {
  part: string;
  microns: number;
  isFactory: boolean;
  notes?: string;
}

export interface STOChecklist {
  stoName: string;
  city: string;
  inspectorName: string;
  inspectionDate: string;
  certificateId: string;
  overallScore: number; // 1-100
  bodyScore: number;
  engineScore: number;
  transmissionScore: number;
  suspensionScore: number;
  computerDiagnostics: 'CLEAN' | 'MINOR_CODES' | 'CRITICAL_CODES';
  verifiedStampUrl?: string;
  notes: string;
}

export interface BarterPreferences {
  acceptsBarter: boolean;
  types: ('KEY_TO_KEY' | 'WITH_SELLER_SURCHARGE' | 'WITH_BUYER_SURCHARGE' | 'REAL_ESTATE_LAND')[];
  desiredCars?: string[];
  minSurchargeRub?: number;
  maxSurchargeRub?: number;
  notes?: string;
}

export interface MurabahaDetails {
  available: boolean;
  minDownPaymentPercent: number;
  maxTermMonths: number;
  partnerFunds: ('LARiba' | 'MZHK' | 'PRIVATE_ISLAMIC_POOL')[];
}

export interface Car {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  engineVolume: number; // liters, e.g. 2.5
  enginePower: number;  // hp
  fuelType: 'PETROL' | 'DIESEL' | 'HYBRID' | 'GAS_PETROL';
  transmission: 'AUTOMATIC' | 'MANUAL' | 'ROBOT' | 'VARIATOR';
  drive: 'FWD' | 'RWD' | 'AWD';
  color: string;
  city: 'Махачкала' | 'Хасавюрт' | 'Дербент' | 'Каспийск' | 'Буйнакск' | 'Кизляр' | 'Избербаш';
  
  // Kill features data
  registration: {
    type: RegistrationCountry;
    countryName: string;
    flag: string;
    isCustomsClearedRu: boolean;
    importDate?: string;
    proxyExpiresAt?: string;
    restrictionsRu: boolean;
    customsDetails?: string;
    estimatedClearanceCost?: number;
  };
  
  bodyCondition: BodyCondition;
  trimLevel: TrimLevel;
  regionalMods: RegionalMod[];
  dealTypes: DealType[];
  
  // Trust & Caucasus Standard
  media: {
    images: string[];
    coldStartVideoUrl?: string;
    exhaustAudioUrl?: string;
    has360View?: boolean;
  };
  
  paintThickness: ThicknessMeasurement[];
  stoInspection?: STOChecklist;
  vouchRating: {
    telegramVerified: boolean;
    gosuslugiVerified: boolean;
    communityVouchesCount: number;
    sellerReputationScore: number; // 0.0 - 5.0
  };
  
  barter: BarterPreferences;
  murabaha: MurabahaDetails;
  
  seller: {
    name: string;
    phone: string;
    whatsappPhone: string;
    telegramUsername: string;
    isDealer: boolean;
    dealerName?: string;
    responseTimeMinutes: number;
  };
  
  description: string;
  viewsCount: number;
  createdAt: string;
  isBoosted?: boolean;
}

export interface FilterState {
  searchQuery: string;
  make: string;
  model: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  registrationTypes: RegistrationCountry[];
  bodyConditions: BodyCondition[];
  trimLevels: TrimLevel[];
  regionalMods: RegionalMod[];
  dealTypes: DealType[];
  cities: string[];
  onlyWithColdStartVideo: boolean;
  onlyWithSTOCheck: boolean;
  onlyWithMurabaha: boolean;
  onlyWithBarter: boolean;
  sortBy: 'date_desc' | 'price_asc' | 'price_desc' | 'rating_desc' | 'views_desc';
}
