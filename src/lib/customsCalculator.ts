import { RegistrationCountry } from "@/types/car";

export interface CustomsCalculationInput {
  country: RegistrationCountry;
  carAge: 'LESS_THAN_3' | '3_TO_5' | '5_TO_7' | 'MORE_THAN_7';
  engineVolume: number; // in liters, e.g. 2.5
  enginePowerHp: number;
  engineType: 'PETROL' | 'DIESEL' | 'HYBRID' | 'ELECTRIC';
  declaredValueUsd: number;
  isCommercialResale: boolean; // true = коммерческий утильсбор (перепродажа или серый ввоз), false = физлицо для себя
}

export interface CustomsCalculationResult {
  country: RegistrationCountry;
  countryName: string;
  isLegalizable: boolean;
  legalizationFeasibility: 'RECOMMENDED' | 'FEASIBLE_WITH_COSTS' | 'ECONOMICALLY_UNFEASIBLE' | 'NOT_POSSIBLE';
  utilizationFee: number;
  customsDutyDiff: number;
  sbktsAndLabFee: number;
  eptsFee: number;
  brokerFee: number;
  totalCostRub: number;
  warnings: string[];
  recommendations: string[];
  breakdown: {
    title: string;
    amountRub: number;
    description: string;
  }[];
}

export function calculateCustomsAndLegalization(input: CustomsCalculationInput): CustomsCalculationResult {
  const { country, carAge, engineVolume, declaredValueUsd, isCommercialResale } = input;
  
  // Base constants
  const USD_TO_RUB = 92;
  const isOver3Years = carAge !== 'LESS_THAN_3';
  
  let utilizationFee = 0;
  let customsDutyDiff = 0;
  let sbktsAndLabFee = 55000;
  let eptsFee = 10000;
  let brokerFee = 35000;
  let isLegalizable = true;
  let legalizationFeasibility: CustomsCalculationResult['legalizationFeasibility'] = 'FEASIBLE_WITH_COSTS';
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // 1. Handling different country specifics
  if (country === 'ABH') {
    isLegalizable = false;
    legalizationFeasibility = 'ECONOMICALLY_UNFEASIBLE';
    warnings.push('Автомобили на абхазском учете ввезены на юрлица по процедуре временного ввоза.');
    warnings.push('Растаможка на РФ учёт потребует уплаты полной пошлины РФ + коммерческого утильсбора, что обычно превышает стоимость самого авто в 2–3 раза.');
    recommendations.push('Рекомендуется эксплуатировать исключительно по командировочному удостоверению / путевому листу с периодическим продлением временного ввоза.');
    
    // Abstract calculation if user still wanted full customs
    customsDutyDiff = declaredValueUsd * USD_TO_RUB * 0.48;
    utilizationFee = 844000;
    
    return {
      country,
      countryName: 'Абхазия (ABH)',
      isLegalizable,
      legalizationFeasibility,
      utilizationFee,
      customsDutyDiff,
      sbktsAndLabFee,
      eptsFee,
      brokerFee,
      totalCostRub: utilizationFee + customsDutyDiff + sbktsAndLabFee + eptsFee + brokerFee,
      warnings,
      recommendations,
      breakdown: [
        { title: 'Коммерческий утильсбор РФ', amountRub: utilizationFee, description: 'Тариф для авто старше 3 лет' },
        { title: 'Таможенная пошлина + НДС РФ', amountRub: customsDutyDiff, description: 'Полный перерасчёт по единой ставке РФ' },
        { title: 'СБКТС и испытательная лаборатория', amountRub: sbktsAndLabFee, description: 'Сертификация безопасности конструкции ТС' },
        { title: 'Оформление ЭПТС', amountRub: eptsFee, description: 'Электронный паспорт транспортного средства со статусом Действующий' },
        { title: 'Услуги брокера и декларанта', amountRub: brokerFee, description: 'Подготовка пакета документов и подача в таможню' },
      ]
    };
  }

  if (country === 'NO_DOCS') {
    return {
      country,
      countryName: 'Без документов / Снята',
      isLegalizable: false,
      legalizationFeasibility: 'NOT_POSSIBLE',
      utilizationFee: 0,
      customsDutyDiff: 0,
      sbktsAndLabFee: 0,
      eptsFee: 0,
      brokerFee: 0,
      totalCostRub: 0,
      warnings: ['Автомобиль без документов или с аннулированным учётом не подлежит официальной постановке на учёт.'],
      recommendations: ['Использовать как донора запчастей, под автоспорт или разбор.'],
      breakdown: []
    };
  }

  // Calculate Russian Recycling Fee (Утильсбор) according to 2024-2026 rules
  if (!isCommercialResale && engineVolume <= 3.0 && country !== 'KG') {
    // Льготный утильсбор для физлиц (только если лично ввезли и не продают в течение 12 мес)
    utilizationFee = isOver3Years ? 5200 : 3400;
  } else {
    // Коммерческий утильсбор (для Киргизии/ЕАЭС после реформы с 1 апреля 2024 или при перепродаже)
    if (engineVolume <= 1.0) {
      utilizationFee = isOver3Years ? 382000 : 170000;
    } else if (engineVolume <= 2.0) {
      utilizationFee = isOver3Years ? 844000 : 556000;
    } else if (engineVolume <= 3.0) {
      utilizationFee = isOver3Years ? 1875000 : 1279000;
    } else if (engineVolume <= 3.5) {
      utilizationFee = isOver3Years ? 2150000 : 1485000;
    } else {
      utilizationFee = isOver3Years ? 2400000 : 1623000;
    }
  }

  // Country specific customs duty differences
  if (country === 'KG') {
    // Киргизия — доплата разницы между заниженной таможней Бишкека и реальной сеткой РФ
    const estimatedCarCostRub = declaredValueUsd * USD_TO_RUB;
    customsDutyDiff = Math.max(150000, estimatedCarCostRub * 0.15); // Примерная разница формулы ЕАЭС
    legalizationFeasibility = utilizationFee > 1000000 ? 'FEASIBLE_WITH_COSTS' : 'RECOMMENDED';
    warnings.push('С 1 апреля 2024 года недоплаченные таможенные пошлины в странах ЕАЭС автоматически включаются в утильсбор РФ.');
    recommendations.push('Проверьте наличие пассажирской таможенной декларации (ПТД) и факта уплаты НДС в Киргизии.');
  } else if (country === 'AM') {
    // Армения
    if (carAge === 'LESS_THAN_3') {
      customsDutyDiff = declaredValueUsd * USD_TO_RUB * 0.12;
    } else {
      customsDutyDiff = 120000;
    }
    legalizationFeasibility = 'FEASIBLE_WITH_COSTS';
    recommendations.push('Для авто, ввезенных в Армению до 2020 года, действует упрощенный порядок. Проверьте дату ввоза в техпаспорте.');
  } else if (country === 'RU') {
    legalizationFeasibility = 'RECOMMENDED';
    return {
      country,
      countryName: 'РФ Учёт',
      isLegalizable: true,
      legalizationFeasibility: 'RECOMMENDED',
      utilizationFee: 0,
      customsDutyDiff: 0,
      sbktsAndLabFee: 0,
      eptsFee: 0,
      brokerFee: 0,
      totalCostRub: 0,
      warnings: ['Автомобиль уже стоит на российском учёте. Дополнительных таможенных сборов не требуется.'],
      recommendations: ['Оплачивается только стандартная госпошлина в ГИБДД (2 850 ₽ за СТС и новые номера).'],
      breakdown: [
        { title: 'Госпошлина ГИБДД за СТС', amountRub: 850, description: 'Выдача свидетельства о регистрации ТС' },
        { title: 'Госпошлина за госномера (при смене региона)', amountRub: 2000, description: 'Комплект регистрационных знаков 05 регион' }
      ]
    };
  }

  const totalCostRub = utilizationFee + customsDutyDiff + sbktsAndLabFee + eptsFee + brokerFee;

  return {
    country,
    countryName: country === 'KG' ? 'Киргизия (KG / ЕАЭС)' : country === 'AM' ? 'Армения (AM)' : 'Южная Осетия (РЮО)',
    isLegalizable,
    legalizationFeasibility,
    utilizationFee,
    customsDutyDiff,
    sbktsAndLabFee,
    eptsFee,
    brokerFee,
    totalCostRub,
    warnings,
    recommendations,
    breakdown: [
      { 
        title: isCommercialResale ? 'Коммерческий утильсбор РФ (2024–2026)' : 'Утилизационный сбор РФ', 
        amountRub: utilizationFee, 
        description: `Для мотора ${engineVolume}л (${isOver3Years ? 'старше 3 лет' : 'до 3 лет'})` 
      },
      { 
        title: 'Разница таможенных платежей ЕАЭС', 
        amountRub: customsDutyDiff, 
        description: 'Доплата до уровня официальной сетки ФТС РФ' 
      },
      { 
        title: 'СБКТС и испытания в лаборатории', 
        amountRub: sbktsAndLabFee, 
        description: 'Официальный протокол испытаний и кнопка ЭРА-ГЛОНАСС' 
      },
      { 
        title: 'Электронный ПТС (ЭПТС)', 
        amountRub: eptsFee, 
        description: 'Регистрация в системе «Электронный паспорт» РФ' 
      },
      { 
        title: 'Таможенный брокер и сопровождение', 
        amountRub: brokerFee, 
        description: 'Подготовка пакета в Дагестанскую / Центральную акцизную таможню' 
      },
    ]
  };
}
