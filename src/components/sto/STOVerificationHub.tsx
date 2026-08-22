'use client';

import React, { useState } from 'react';
import { PARTNER_STO_LIST, PartnerSTO } from '@/data/stoList';
import { formatPrice } from '@/lib/utils';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Star, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

export const STOVerificationHub: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Все');
  const [bookedSTO, setBookedSTO] = useState<PartnerSTO | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [carInfo, setCarInfo] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const filteredSTOs = selectedCity === 'Все'
    ? PARTNER_STO_LIST
    : PARTNER_STO_LIST.filter(s => s.city === selectedCity);

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-3 sm:px-6 space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/20 text-white backdrop-blur-md mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>СТАНДАРТ «ПРОВЕРЕНО В ДАГЕСТАНЕ»</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Сеть аккредитованных СТО и автоподбора 🛠️
          </h1>

          <p className="text-sm text-white/90 leading-relaxed font-medium">
            Проведите комплексную диагностику автомобиля в лучших сервисах Махачкалы, Хасавюрта и Дербента. Результаты с замерами ЛКП и эндоскопией попадают в электронный сертификат на платформе.
          </p>
        </div>
      </div>

      {/* City Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['Все', 'Махачкала', 'Хасавюрт', 'Дербент'].map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              selectedCity === city
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* STO Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSTOs.map((sto) => (
          <div
            key={sto.id}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-black text-slate-900">{sto.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{sto.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{sto.rating}</span>
                </div>
              </div>

              {/* Specialization Tags */}
              <div className="flex flex-wrap gap-1.5 my-3">
                {sto.specialization.map((spec, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Diagnostic Checklist Features */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                {sto.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Price */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500">Стоимость проверки:</div>
                <div className="text-lg font-black text-slate-900">{formatPrice(sto.priceRub)}</div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${sto.phone}`}
                  aria-label={`Позвонить в ${sto.name}`}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                </a>

                <button
                  onClick={() => {
                    setBookedSTO(sto);
                    setIsBooked(false);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                >
                  Записаться онлайн
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookedSTO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">Запись на диагностику</h3>
                <div className="text-xs text-emerald-700 font-semibold">{bookedSTO.name}</div>
              </div>
              <button
                onClick={() => setBookedSTO(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {isBooked ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-2">
                <div className="font-bold text-sm flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Запись успешно оформлена!</span>
                </div>
                <p>Мастер {bookedSTO.name} перезвонит вам в течение 10 минут для подтверждения времени визита.</p>
                <button
                  onClick={() => setBookedSTO(null)}
                  className="w-full py-2.5 mt-2 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-sm"
                >
                  Отлично, спасибо
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Марка и модель авто:</label>
                  <input
                    type="text"
                    placeholder="Например: Toyota Camry 2.5 2021"
                    value={carInfo}
                    onChange={(e) => setCarInfo(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Ваше имя:</label>
                  <input
                    type="text"
                    placeholder="Как к вам обращаться"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Номер телефона:</label>
                  <input
                    type="tel"
                    placeholder="+7 928 000-00-00"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700 flex items-center justify-between border border-slate-200">
                  <span>Стоимость диагностики:</span>
                  <strong className="text-emerald-700 font-bold">{formatPrice(bookedSTO.priceRub)}</strong>
                </div>

                <button
                  onClick={() => setIsBooked(true)}
                  disabled={!clientName || !clientPhone}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 active:scale-95 transition-all shadow-md"
                >
                  Подтвердить запись
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
