export interface MurabahaCalculationInput {
  carPrice: number;
  downPaymentPercent: number; // e.g. 20 - 70%
  termMonths: number; // e.g. 6, 12, 18, 24, 36
  partnerFund: 'LARiba' | 'MZHK' | 'PRIVATE_ISLAMIC_POOL';
}

export interface MonthPaymentSchedule {
  monthNumber: number;
  paymentAmount: number;
  remainingDebt: number;
}

export interface MurabahaCalculationResult {
  carPrice: number;
  downPaymentAmount: number;
  financedAmount: number; // carPrice - downPaymentAmount
  fixedMarkupPercent: number; // Торговая наценка фонда за весь срок
  fixedMarkupAmount: number; // Сумма наценки в рублях
  totalRepaymentAmount: number; // financedAmount + fixedMarkupAmount
  totalCarCostWithMurabaha: number; // downPaymentAmount + totalRepaymentAmount
  monthlyPayment: number;
  termMonths: number;
  partnerFundName: string;
  shariaCertificateStatus: string;
  schedule: MonthPaymentSchedule[];
  halalPrinciples: string[];
}

export function calculateMurabaha(input: MurabahaCalculationInput): MurabahaCalculationResult {
  const { carPrice, downPaymentPercent, termMonths, partnerFund } = input;

  const downPaymentAmount = Math.round((carPrice * downPaymentPercent) / 100);
  const financedAmount = carPrice - downPaymentAmount;

  // Annual markup rate based on fund (12-16% per year fixed trade markup)
  let annualMarkupRate = 0.14;
  let partnerFundName = '«ЛяРиба-Финанс» (Махачкала)';
  let shariaCertificateStatus = 'Одобрено Советом Алимов и Шариатским Экспертным Советом';

  if (partnerFund === 'MZHK') {
    annualMarkupRate = 0.135;
    partnerFundName = '«МЖК-Финанс» (Хасавюрт / Махачкала)';
  } else if (partnerFund === 'PRIVATE_ISLAMIC_POOL') {
    annualMarkupRate = 0.15;
    partnerFundName = 'Исламский Инвестиционный Пул Дагестана';
  }

  // Calculate fixed markup proportional to months
  const totalMarkupRate = (annualMarkupRate / 12) * termMonths;
  const fixedMarkupPercent = Number((totalMarkupRate * 100).toFixed(1));
  const fixedMarkupAmount = Math.round(financedAmount * totalMarkupRate);
  
  const totalRepaymentAmount = financedAmount + fixedMarkupAmount;
  const monthlyPayment = Math.round(totalRepaymentAmount / termMonths);
  const totalCarCostWithMurabaha = downPaymentAmount + totalRepaymentAmount;

  // Generate schedule
  const schedule: MonthPaymentSchedule[] = [];
  let currentRemaining = totalRepaymentAmount;

  for (let i = 1; i <= termMonths; i++) {
    const payment = i === termMonths ? currentRemaining : monthlyPayment;
    currentRemaining = Math.max(0, currentRemaining - payment);
    schedule.push({
      monthNumber: i,
      paymentAmount: payment,
      remainingDebt: currentRemaining,
    });
  }

  const halalPrinciples = [
    'Без ростовщического ссудного процента (Риба) — классический договор купли-продажи с торговой наценкой.',
    'Фиксированная сумма долга: сумма выплат окончательная и не изменится ни при каких обстоятельствах.',
    'Без штрафов и пеней за просрочку (отсутствие скрытых санкций, противоречащих Шариату).',
    'Прозрачность: вы изначально знаете точную наценку до копейки до подписания договора.'
  ];

  return {
    carPrice,
    downPaymentAmount,
    financedAmount,
    fixedMarkupPercent,
    fixedMarkupAmount,
    totalRepaymentAmount,
    totalCarCostWithMurabaha,
    monthlyPayment,
    termMonths,
    partnerFundName,
    shariaCertificateStatus,
    schedule,
    halalPrinciples,
  };
}
