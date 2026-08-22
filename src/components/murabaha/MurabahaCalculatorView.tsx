'use client';

import React, { useState } from 'react';
import { calculateMurabaha } from '@/lib/murabahaCalculator';
import { formatPrice } from '@/lib/utils';
import { 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Calendar,
  Send
} from 'lucide-react';

export const MurabahaCalculatorView: React.FC = () => {
  const [carPrice, setCarPrice] = useState<number>(2000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [termMonths, setTermMonths] = useState<number>(24);
  const [partnerFund, setPartnerFund] = useState<'LARiba' | 'MZHK' | 'PRIVATE_ISLAMIC_POOL'>('LARiba');
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  const result = calculateMurabaha({
    carPrice,
    downPaymentPercent,
    termMonths,
    partnerFund,
  });

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-3 sm:px-6 space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/20 text-white backdrop-blur-md mb-3">
            <Coins className="w-3.5 h-3.5" />
            <span>ИСЛАМСКИЕ ФИНАНСЫ • МУРАБАХА</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Халяль-рассрочка на авто в Дагестане 🕌
          </h1>

          <p className="text-sm text-white/90 leading-relaxed font-medium">
            Покупка автомобиля по нормам Шариата: фиксированная прозрачная торговая наценка без ссудного процента (Риба), без штрафов за просрочку и скрытых комиссий.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Sliders and Parameters (Left 5 Cols) */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <Coins className="w-4 h-4" /> Параметры финансирования
          </h2>

          {/* Car price input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Стоимость выбранного автомобиля (₽):
            </label>
            <input
              type="number"
              value={carPrice}
              onChange={(e) => setCarPrice(Math.max(100000, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Down payment slider */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-600 font-medium">Первоначальный взнос:</span>
              <strong className="text-emerald-700 font-mono font-bold">
                {downPaymentPercent}% ({formatPrice(result.downPaymentAmount)})
              </strong>
            </div>
            <input
              type="range"
              min={20}
              max={70}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              aria-label="Первоначальный взнос в процентах"
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>20%</span>
              <span>30%</span>
              <span>50%</span>
              <span>70%</span>
            </div>
          </div>

          {/* Term slider */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-600 font-medium">Срок рассрочки:</span>
              <strong className="text-emerald-700 font-mono font-bold">{termMonths} месяцев ({(termMonths / 12).toFixed(1)} г.)</strong>
            </div>
            <input
              type="range"
              min={6}
              max={36}
              step={6}
              value={termMonths}
              onChange={(e) => setTermMonths(Number(e.target.value))}
              aria-label="Срок рассрочки в месяцах"
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>6 мес</span>
              <span>12 мес</span>
              <span>24 мес</span>
              <span>36 мес</span>
            </div>
          </div>

          {/* Partner Fund */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Аккредитованный исламский фонд:
            </label>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setPartnerFund('LARiba')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                  partnerFund === 'LARiba'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-500 shadow-sm font-bold ring-2 ring-emerald-200'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div>«ЛяРиба-Финанс»</div>
                  <div className="text-[10px] text-slate-500 font-normal">Махачкала • Лидер исламских финансов</div>
                </div>
                <div className="text-[11px] font-bold text-emerald-700">14.0% год.</div>
              </button>

              <button
                onClick={() => setPartnerFund('MZHK')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                  partnerFund === 'MZHK'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-500 shadow-sm font-bold ring-2 ring-emerald-200'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div>«МЖК-Финанс»</div>
                  <div className="text-[10px] text-slate-500 font-normal">Хасавюрт / Махачкала</div>
                </div>
                <div className="text-[11px] font-bold text-emerald-700">13.5% год.</div>
              </button>

              <button
                onClick={() => setPartnerFund('PRIVATE_ISLAMIC_POOL')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                  partnerFund === 'PRIVATE_ISLAMIC_POOL'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-500 shadow-sm font-bold ring-2 ring-emerald-200'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div>Частный Исламский Пул</div>
                  <div className="text-[10px] text-slate-500 font-normal">Прямое финансирование от инвесторов РД</div>
                </div>
                <div className="text-[11px] font-bold text-emerald-700">15.0% год.</div>
              </button>
            </div>
          </div>
        </div>

        {/* Output Calculation Results (Right 7 Cols) */}
        <div className="md:col-span-7 space-y-4">
          
          {/* Main Payment Result Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-3">
            <div className="text-xs text-slate-500 font-medium">Ежемесячный платёж (без изменений весь срок):</div>
            <div className="text-4xl font-black text-emerald-700 tracking-tight">
              {formatPrice(result.monthlyPayment)} <span className="text-sm font-normal text-slate-500">/ мес</span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500 text-[10px]">Фиксированная наценка</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{formatPrice(result.fixedMarkupAmount)}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500 text-[10px]">Наценка в % за срок</div>
                <div className="font-bold text-emerald-700 text-sm mt-0.5">{result.fixedMarkupPercent}%</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500 text-[10px]">Итоговая сумма выплат</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{formatPrice(result.totalCarCostWithMurabaha)}</div>
              </div>
            </div>
          </div>

          {/* Halal Principles Checklist */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
            <div className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Шариатские стандарты сделки:
            </div>
            {result.halalPrinciples.map((pr, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{pr}</span>
              </div>
            ))}
          </div>

          {/* Schedule View Toggle */}
          <div>
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="text-xs text-emerald-700 hover:text-emerald-800 flex items-center gap-1 font-semibold"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{showSchedule ? 'Скрыть график платежей' : 'Показать помесячный график платежей'}</span>
            </button>

            {showSchedule && (
              <div className="mt-3 p-3 rounded-2xl bg-white border border-slate-200 max-h-48 overflow-y-auto space-y-1.5 animate-in fade-in shadow-sm">
                {result.schedule.map((row) => (
                  <div key={row.monthNumber} className="flex items-center justify-between text-xs px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700">
                    <span>Месяц {row.monthNumber}</span>
                    <strong className="text-emerald-700 font-mono">{formatPrice(row.paymentAmount)}</strong>
                    <span className="text-[11px] text-slate-500">Остаток: {formatPrice(row.remainingDebt)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Lead Form */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-emerald-600" /> Подача предварительной заявки в {result.partnerFundName}
            </h2>

            {isApplicationSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs">
                <div className="font-bold text-sm mb-1 flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Заявка успешно отправлена!</span>
                </div>
                <p>Представитель фонда свяжется с вами в течение 15 минут для согласования договора.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Ваше ФИО"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="tel"
                    placeholder="Номер телефона (+7 928 ...)"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  onClick={() => setIsApplicationSubmitted(true)}
                  disabled={!clientName || !clientPhone}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white active:scale-95 transition-all shadow-md shadow-emerald-600/20"
                >
                  Отправить заявку на одобрение
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
