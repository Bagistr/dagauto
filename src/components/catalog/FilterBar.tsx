'use client';

import React, { useState } from 'react';
import { FilterState, RegistrationCountry, BodyCondition, RegionalMod } from '@/types/car';
import { 
  Search, 
  RotateCcw, 
  SlidersHorizontal, 
  Video, 
  ShieldCheck, 
  Repeat, 
  Coins, 
  Check, 
  X,
  ChevronDown
} from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalFound: number;
}

const REGISTRATION_OPTIONS: { value: RegistrationCountry; label: string; flag: string }[] = [
  { value: 'RU', label: 'РФ Учёт', flag: '🇷🇺' },
  { value: 'KG', label: 'KG Киргизия', flag: '🇰🇬' },
  { value: 'AM', label: 'AM Армения', flag: '🇦🇲' },
  { value: 'ABH', label: 'ABH Абхазия', flag: '🟢' },
  { value: 'NO_DOCS', label: 'Без документов', flag: '⚠️' },
];

const BODY_OPTIONS: { value: BodyCondition; label: string }[] = [
  { value: 'NOT_BEATEN_NOT_PAINTED', label: 'Не бит / Не крашен' },
  { value: 'ARMOR_FILM', label: 'В бронеплёнке' },
  { value: 'COSMETIC_REFRESH', label: 'Освежалась' },
];

const REGIONAL_MODS_OPTIONS: { value: RegionalMod; label: string }[] = [
  { value: 'AIR_SUSPENSION', label: 'Пневмоподвеска' },
  { value: 'AUDIO_SQ_SPL', label: 'Автозвук SPL' },
  { value: 'LPG_WITH_MARK', label: 'Газ (ГБО) с отметкой' },
  { value: 'EXHAUST_TUNING', label: 'Тюнинг выхлопа' },
  { value: 'ENGINE_STAGE', label: 'Stage прошивка' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  totalFound,
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const toggleRegType = (type: RegistrationCountry) => {
    setFilters((prev) => {
      const exists = prev.registrationTypes.includes(type);
      return {
        ...prev,
        registrationTypes: exists
          ? prev.registrationTypes.filter((t) => t !== type)
          : [...prev.registrationTypes, type],
      };
    });
  };

  const toggleBodyCondition = (cond: BodyCondition) => {
    setFilters((prev) => {
      const exists = prev.bodyConditions.includes(cond);
      return {
        ...prev,
        bodyConditions: exists
          ? prev.bodyConditions.filter((c) => c !== cond)
          : [...prev.bodyConditions, cond],
      };
    });
  };

  const toggleRegionalMod = (mod: RegionalMod) => {
    setFilters((prev) => {
      const exists = prev.regionalMods.includes(mod);
      return {
        ...prev,
        regionalMods: exists
          ? prev.regionalMods.filter((m) => m !== mod)
          : [...prev.regionalMods, mod],
      };
    });
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      make: '',
      model: '',
      registrationTypes: [],
      bodyConditions: [],
      trimLevels: [],
      regionalMods: [],
      dealTypes: [],
      cities: [],
      onlyWithColdStartVideo: false,
      onlyWithSTOCheck: false,
      onlyWithMurabaha: false,
      onlyWithBarter: false,
      sortBy: 'date_desc',
    });
  };

  const activeFiltersCount = 
    filters.registrationTypes.length + 
    filters.bodyConditions.length + 
    filters.regionalMods.length + 
    (filters.onlyWithColdStartVideo ? 1 : 0) + 
    (filters.onlyWithSTOCheck ? 1 : 0) + 
    (filters.onlyWithMurabaha ? 1 : 0) + 
    (filters.onlyWithBarter ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <div className="w-full space-y-4">
      
      {/* Search and Main Quick Toggles */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3.5">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по марке, модели или ключевым словам (например: Camry, Приора, Пневма, ГБО)..."
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
              aria-label="Очистить поиск"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 1-Click Registration Filter Row */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-700 uppercase tracking-wider text-[11px]">
              Учёт автомобиля:
            </span>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Сбросить фильтры
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {REGISTRATION_OPTIONS.map((reg) => {
              const isSelected = filters.registrationTypes.includes(reg.value);
              return (
                <button
                  key={reg.value}
                  onClick={() => toggleRegType(reg.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span>{reg.flag}</span>
                  <span>{reg.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Functional Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, onlyWithColdStartVideo: !prev.onlyWithColdStartVideo }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              filters.onlyWithColdStartVideo
                ? 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-200'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-rose-600" />
            <span>Холодный пуск 📹</span>
          </button>

          <button
            onClick={() => setFilters((prev) => ({ ...prev, onlyWithSTOCheck: !prev.onlyWithSTOCheck }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              filters.onlyWithSTOCheck
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-200'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Проверено СТО 🛠️</span>
          </button>

          <button
            onClick={() => setFilters((prev) => ({ ...prev, onlyWithBarter: !prev.onlyWithBarter }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              filters.onlyWithBarter
                ? 'bg-amber-50 text-amber-700 border-amber-300 ring-2 ring-amber-200'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Repeat className="w-3.5 h-3.5 text-amber-600" />
            <span>Ищут бартер 🔄</span>
          </button>

          <button
            onClick={() => setFilters((prev) => ({ ...prev, onlyWithMurabaha: !prev.onlyWithMurabaha }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              filters.onlyWithMurabaha
                ? 'bg-teal-50 text-teal-700 border-teal-300 ring-2 ring-teal-200'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Coins className="w-3.5 h-3.5 text-teal-600" />
            <span>Халяль-рассрочка 🕌</span>
          </button>

          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              isAdvancedOpen || activeFiltersCount > 0
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Ещё фильтры {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Collapsible Advanced Filters */}
        {isAdvancedOpen && (
          <div className="pt-3 border-t border-slate-100 space-y-3.5 text-xs animate-in fade-in">
            {/* Body Condition */}
            <div>
              <span className="font-semibold text-slate-700 block mb-1.5">Состояние кузова и окрас:</span>
              <div className="flex flex-wrap gap-1.5">
                {BODY_OPTIONS.map((b) => {
                  const isSelected = filters.bodyConditions.includes(b.value);
                  return (
                    <button
                      key={b.value}
                      onClick={() => toggleBodyCondition(b.value)}
                      className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Regional Mods */}
            <div>
              <span className="font-semibold text-slate-700 block mb-1.5">Дагестанские доработки и опции:</span>
              <div className="flex flex-wrap gap-1.5">
                {REGIONAL_MODS_OPTIONS.map((m) => {
                  const isSelected = filters.regionalMods.includes(m.value);
                  return (
                    <button
                      key={m.value}
                      onClick={() => toggleRegionalMod(m.value)}
                      className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                        isSelected
                          ? 'bg-amber-50 text-amber-800 border-amber-300 font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Results Header Strip */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500">
        <span className="font-medium text-slate-700">
          Найдено предложений в Республике Дагестан: <strong className="text-slate-900 font-bold">{totalFound}</strong>
        </span>

        <div className="flex items-center gap-1.5">
          <span>Сортировка:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
            aria-label="Сортировка объявлений"
            className="bg-white text-slate-800 font-semibold rounded-lg px-2.5 py-1 text-xs border border-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="date_desc">Сначала свежие</option>
            <option value="price_asc">Сначала дешевле</option>
            <option value="price_desc">Сначала дороже</option>
            <option value="views_desc">Самые популярные</option>
          </select>
        </div>
      </div>

    </div>
  );
};
