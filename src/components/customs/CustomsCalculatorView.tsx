'use client';

import React, { useState } from 'react';
import { RegistrationCountry } from '@/types/car';
import { calculateCustomsAndLegalization, CustomsCalculationInput } from '@/lib/customsCalculator';
import { formatPrice } from '@/lib/utils';
import { 
  Calculator, 
  ShieldAlert, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Scale
} from 'lucide-react';

export const CustomsCalculatorView: React.FC = () => {
  const [country, setCountry] = useState<RegistrationCountry>('KG');
  const [carAge, setCarAge] = useState<CustomsCalculationInput['carAge']>('3_TO_5');
  const [engineVolume, setEngineVolume] = useState<number>(2.5);
  const [enginePowerHp, setEnginePowerHp] = useState<number>(200);
  const [declaredValueUsd, setDeclaredValueUsd] = useState<number>(22000);
  const [isCommercialResale, setIsCommercialResale] = useState<boolean>(true);

  const result = calculateCustomsAndLegalization({
    country,
    carAge,
    engineVolume,
    enginePowerHp,
    engineType: 'PETROL',
    declaredValueUsd,
    isCommercialResale,
  });

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-3 sm:px-6 space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/20 text-white backdrop-blur-md mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>КАЛЬКУЛЯТОР ДОТАМОЖКИ И УТИЛЬСБОРА</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Иностранный учёт и легализация на РФ 🇷🇺
          </h1>

          <p className="text-sm text-white/90 leading-relaxed font-medium">
            Точный автоматический расчёт расходов при переоформлении автомобилей из Киргизии (KG), Армении (AM), Абхазии (ABH) и стран ЕАЭС с учётом актуальной сетки коммерческого утильсбора.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Input Parameters (Left 5 Cols) */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <Scale className="w-4 h-4" /> Параметры автомобиля
          </h2>

          {/* Country selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Страна текущего учёта:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => setCountry('KG')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                  country === 'KG' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>🇰🇬</span> <span>Киргизия (KG)</span>
              </button>

              <button
                onClick={() => setCountry('AM')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                  country === 'AM' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>🇦🇲</span> <span>Армения (AM)</span>
              </button>

              <button
                onClick={() => setCountry('ABH')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                  country === 'ABH' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>🟢</span> <span>Абхазия (ABH)</span>
              </button>

              <button
                onClick={() => setCountry('OS')}
                className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                  country === 'OS' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>⚪</span> <span>Южная Осетия</span>
              </button>
            </div>
          </div>

          {/* Engine volume slider */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-600 font-medium">Объём двигателя:</span>
              <strong className="text-blue-700 font-mono font-bold">{engineVolume.toFixed(1)} л</strong>
            </div>
            <input
              type="range"
              min={1.0}
              max={5.0}
              step={0.1}
              value={engineVolume}
              onChange={(e) => setEngineVolume(Number(e.target.value))}
              aria-label="Объём двигателя в литрах"
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>1.0 л</span>
              <span>2.0 л</span>
              <span>3.0 л</span>
              <span>4.0 л</span>
              <span>5.0 л</span>
            </div>
          </div>

          {/* Car Age */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Возраст автомобиля:
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={() => setCarAge('LESS_THAN_3')}
                className={`p-2 rounded-lg border font-medium transition-all ${
                  carAge === 'LESS_THAN_3' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                До 3 лет
              </button>

              <button
                onClick={() => setCarAge('3_TO_5')}
                className={`p-2 rounded-lg border font-medium transition-all ${
                  carAge === '3_TO_5' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                От 3 до 5 лет
              </button>

              <button
                onClick={() => setCarAge('5_TO_7')}
                className={`p-2 rounded-lg border font-medium transition-all ${
                  carAge === '5_TO_7' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                От 5 до 7 лет
              </button>

              <button
                onClick={() => setCarAge('MORE_THAN_7')}
                className={`p-2 rounded-lg border font-medium transition-all ${
                  carAge === 'MORE_THAN_7' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Старше 7 лет
              </button>
            </div>
          </div>

          {/* Declared Value */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Декларированная стоимость ($ USD):
            </label>
            <input
              type="number"
              value={declaredValueUsd}
              onChange={(e) => setDeclaredValueUsd(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Resale vs Personal */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-800">Тариф утильсбора:</div>
              <div className="text-[11px] text-slate-500">
                {isCommercialResale ? 'Коммерческий (для продажи / ЕАЭС)' : 'Льготный (для себя > 1 года)'}
              </div>
            </div>
            <button
              onClick={() => setIsCommercialResale(!isCommercialResale)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isCommercialResale ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white'
              }`}
            >
              {isCommercialResale ? 'Коммерческий' : 'Льготный'}
            </button>
          </div>
        </div>

        {/* Output Results (Right 7 Cols) */}
        <div className="md:col-span-7 space-y-4">
          
          {/* Feasibility Alert Card */}
          <div className={`p-5 rounded-2xl border text-xs space-y-2 ${
            result.legalizationFeasibility === 'RECOMMENDED'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : result.legalizationFeasibility === 'FEASIBLE_WITH_COSTS'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="flex items-center gap-2 text-sm font-bold">
              {result.legalizationFeasibility === 'RECOMMENDED' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {result.legalizationFeasibility === 'FEASIBLE_WITH_COSTS' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
              {result.legalizationFeasibility === 'ECONOMICALLY_UNFEASIBLE' && <ShieldAlert className="w-5 h-5 text-rose-600" />}
              
              <span>
                {result.legalizationFeasibility === 'RECOMMENDED' && 'Легализация выгодна и рекомендована'}
                {result.legalizationFeasibility === 'FEASIBLE_WITH_COSTS' && 'Возможна с умеренными расходами'}
                {result.legalizationFeasibility === 'ECONOMICALLY_UNFEASIBLE' && 'Экономически нецелесообразно'}
              </span>
            </div>

            <p className="leading-relaxed">
              {result.country === 'ABH' 
                ? 'Абхазские машины ввозятся под временный ввоз. Переоформление на РФ номера потребует уплаты двойной пошлины, что превышает стоимость авто.' 
                : 'Расчёт сформирован с учётом правил ЕАЭС и списания утильсбора в РФ.'}
            </p>
          </div>

          {/* Breakdown List */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <FileText className="w-4 h-4 text-blue-600" /> Детализация платежей и сборов:
            </h2>

            <div className="space-y-2">
              {result.breakdown.map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-800">{item.title}</div>
                    <div className="text-[11px] text-slate-500">{item.description}</div>
                  </div>
                  <div className="font-mono font-bold text-sm text-blue-700">
                    {formatPrice(item.amountRub)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Sum */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">ИТОГОВЫЙ БЮДЖЕТ ДОТАМОЖКИ:</span>
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {formatPrice(result.totalCostRub)}
                </span>
              </div>

              <div className="text-right text-xs text-slate-500">
                <span>Срок оформления:</span>
                <strong className="text-slate-900 block font-bold">3–5 рабочих дней</strong>
              </div>
            </div>
          </div>

          {/* Warnings & Legal Tips */}
          {result.warnings.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
              <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Важные юридические нюансы:
              </div>
              {result.warnings.map((w, idx) => (
                <div key={idx} className="text-xs text-amber-950 flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{w}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
