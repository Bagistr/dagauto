'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { FilterBar } from '@/components/catalog/FilterBar';
import { CarCard } from '@/components/catalog/CarCard';
import { CarDetailsModal } from '@/components/catalog/CarDetailsModal';
import { SmartBarterView } from '@/components/barter/SmartBarterView';
import { CustomsCalculatorView } from '@/components/customs/CustomsCalculatorView';
import { MurabahaCalculatorView } from '@/components/murabaha/MurabahaCalculatorView';
import { STOVerificationHub } from '@/components/sto/STOVerificationHub';
import { FastListingWizard } from '@/components/onboarding/FastListingWizard';
import { MOCK_CARS } from '@/data/mockCars';
import { Car, FilterState } from '@/types/car';
import { 
  Car as CarIcon, 
  Repeat, 
  Calculator, 
  ShieldCheck, 
  Coins, 
  Search, 
  ArrowRight,
  Sparkles,
  MapPin,
  Send,
  Plus
} from 'lucide-react';

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>(MOCK_CARS);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCity, setSelectedCity] = useState<string>('Все города');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isNewListingOpen, setIsNewListingOpen] = useState<boolean>(false);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
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

  // Filtered cars list
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // City filter
      if (selectedCity !== 'Все города' && car.city !== selectedCity) {
        return false;
      }

      // Search query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const fullSearchString = `${car.make} ${car.model} ${car.title} ${car.description} ${car.city}`.toLowerCase();
        if (!fullSearchString.includes(q)) return false;
      }

      // Registration filter
      if (filters.registrationTypes.length > 0) {
        if (!filters.registrationTypes.includes(car.registration.type)) return false;
      }

      // Body condition filter
      if (filters.bodyConditions.length > 0) {
        if (!filters.bodyConditions.includes(car.bodyCondition)) return false;
      }

      // Regional mods filter
      if (filters.regionalMods.length > 0) {
        const hasAllMods = filters.regionalMods.every((m) => car.regionalMods.includes(m));
        if (!hasAllMods) return false;
      }

      // Fast toggles
      if (filters.onlyWithColdStartVideo && !car.media.coldStartVideoUrl) return false;
      if (filters.onlyWithSTOCheck && !car.stoInspection) return false;
      if (filters.onlyWithMurabaha && !car.murabaha.available) return false;
      if (filters.onlyWithBarter && !car.barter.acceptsBarter) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'views_desc') return b.viewsCount - a.viewsCount;
      return 0; // date_desc default
    });
  }, [cars, selectedCity, filters]);

  const handleAddNewListing = (newCar: Car) => {
    setCars((prev) => [newCar, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onOpenNewListing={() => setIsNewListingOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12 space-y-8">
        
        {/* ===================== TAB: HOME (Главная) ===================== */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-in fade-in">
            
            {/* Friendly Hero Search Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="max-w-2xl">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1.5">
                  Найдите автомобиль в Республике Дагестан
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {selectedCity === 'Все города' ? 'Махачкала, Хасавюрт, Дербент, Каспийск' : selectedCity} • Российский и иностранный учёт (KG, AM, ABH) • Бартер
                </p>
              </div>

              {/* Big Search Bar */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Марка, модель или ключевое слово (например: Camry, Приора, Пневма, ГБО)..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all font-medium"
                  />
                </div>

                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Показать авто ({filteredCars.length})</span>
                </button>
              </div>
            </div>

            {/* 5 Big Clean Category Navigation Cards (Ultra easy for any age) */}
            <div>
              <h2 className="text-base font-bold text-slate-800 mb-3 px-1">
                Основные разделы платформы:
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {/* 1. Catalog */}
                <div
                  onClick={() => setActiveTab('catalog')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <CarIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900 mb-1">Купить авто</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Полный каталог автомобилей с фильтрами по городам Дагестана и учёту.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mt-4">
                    <span>Открыть каталог</span> <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 2. Barter */}
                <div
                  onClick={() => setActiveTab('barter')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Repeat className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900 mb-1">Умный бартер</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Обмен авто ключ в ключ, с доплатой или на земельный участок.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 mt-4">
                    <span>Найти обмен</span> <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 3. Customs */}
                <div
                  onClick={() => setActiveTab('customs')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900 mb-1">Дотаможка & Утиль</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Калькулятор утильсбора и легализации авто из Киргизии, Армении, Абхазии.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-blue-600 mt-4">
                    <span>Рассчитать</span> <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 4. Murabaha */}
                <div
                  onClick={() => setActiveTab('murabaha')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Coins className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900 mb-1">Халяль-рассрочка</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Мурабаха без ростовщических процентов (Риба) от «ЛяРиба» и «МЖК».
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 mt-4">
                    <span>Калькулятор</span> <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 5. STO */}
                <div
                  onClick={() => setActiveTab('sto')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900 mb-1">СТО Проверка</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Диагностика ЛКП толщиномером и эндоскопия в проверенных сервисах.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-teal-600 mt-4">
                    <span>Выбрать СТО</span> <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Fresh Cars Feed */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    Свежие предложения в Дагестане
                  </h2>
                  <p className="text-xs text-slate-500">
                    Только реальные автомобили с прямыми контактами продавцов
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('catalog')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200"
                >
                  <span>Все автомобили ({cars.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cars.slice(0, 6).map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onSelect={(c) => setSelectedCar(c)}
                    onOpenBarterModal={() => setActiveTab('barter')}
                    onOpenCustomsModal={() => setActiveTab('customs')}
                    onOpenMurabahaModal={() => setActiveTab('murabaha')}
                  />
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB: CATALOG (Каталог) ===================== */}
        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Каталог автомобилей</h1>
                <p className="text-xs text-slate-500">Авторынок Республики Дагестан</p>
              </div>

              <button
                onClick={() => setActiveTab('home')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm"
              >
                ← На главную
              </button>
            </div>

            <FilterBar
              filters={filters}
              setFilters={setFilters}
              totalFound={filteredCars.length}
            />

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onSelect={(c) => setSelectedCar(c)}
                    onOpenBarterModal={() => setActiveTab('barter')}
                    onOpenCustomsModal={() => setActiveTab('customs')}
                    onOpenMurabahaModal={() => setActiveTab('murabaha')}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                <CarIcon className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">По вашим фильтрам ничего не найдено</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Попробуйте сбросить фильтры или выбрать другой город.
                </p>
                <button
                  onClick={() => setFilters({
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
                  })}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB: SMART BARTER ===================== */}
        {activeTab === 'barter' && (
          <div className="space-y-4 animate-in fade-in">
            <button
              onClick={() => setActiveTab('home')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm"
            >
              ← На главную
            </button>
            <SmartBarterView onSelectCar={(c) => setSelectedCar(c)} />
          </div>
        )}

        {/* ===================== TAB: CUSTOMS CALCULATOR ===================== */}
        {activeTab === 'customs' && (
          <div className="space-y-4 animate-in fade-in">
            <button
              onClick={() => setActiveTab('home')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm"
            >
              ← На главную
            </button>
            <CustomsCalculatorView />
          </div>
        )}

        {/* ===================== TAB: ISLAMIC MURABAHA ===================== */}
        {activeTab === 'murabaha' && (
          <div className="space-y-4 animate-in fade-in">
            <button
              onClick={() => setActiveTab('home')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm"
            >
              ← На главную
            </button>
            <MurabahaCalculatorView />
          </div>
        )}

        {/* ===================== TAB: STO VERIFICATION ===================== */}
        {activeTab === 'sto' && (
          <div className="space-y-4 animate-in fade-in">
            <button
              onClick={() => setActiveTab('home')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm"
            >
              ← На главную
            </button>
            <STOVerificationHub />
          </div>
        )}

      </main>

      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onOpenBarterModal={() => {
            setSelectedCar(null);
            setActiveTab('barter');
          }}
        />
      )}

      {/* Fast Listing Wizard (60-sec Onboarding) */}
      {isNewListingOpen && (
        <FastListingWizard
          onClose={() => setIsNewListingOpen(false)}
          onListingCreated={handleAddNewListing}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewListing={() => setIsNewListingOpen(true)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-sm">Dag<span className="text-emerald-600">Auto</span> 05</span>
            <span>— Автомобильная платформа и Telegram Mini App Республики Дагестан</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span className="flex items-center gap-1 font-medium">
              <Send className="w-3.5 h-3.5 text-sky-600" /> Telegram: @DagAutoBot
            </span>
            <span>•</span>
            <span>Партнёры: «ЛяРиба-Финанс», «МЖК»</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
