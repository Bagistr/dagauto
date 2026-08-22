'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { CarCard } from '@/components/catalog/CarCard';
import { CarDetailsModal } from '@/components/catalog/CarDetailsModal';
import { SmartBarterView } from '@/components/barter/SmartBarterView';
import { CustomsCalculatorView } from '@/components/customs/CustomsCalculatorView';
import { MurabahaCalculatorView } from '@/components/murabaha/MurabahaCalculatorView';
import { STOVerificationHub } from '@/components/sto/STOVerificationHub';
import { FastListingWizard } from '@/components/onboarding/FastListingWizard';
import { MOCK_CARS } from '@/data/mockCars';
import { Car, RegistrationCountry } from '@/types/car';
import { 
  Search, 
  Car as CarIcon, 
  X,
  Check
} from 'lucide-react';

const POPULAR_BRANDS = [
  { name: 'Все марки', value: '' },
  { name: 'Toyota', value: 'Toyota' },
  { name: 'Lada (ВАЗ)', value: 'Lada' },
  { name: 'Mercedes-Benz', value: 'Mercedes-Benz' },
  { name: 'BMW', value: 'BMW' },
  { name: 'Hyundai', value: 'Hyundai' },
];

const REGISTRATIONS: { label: string; value: RegistrationCountry | 'ALL'; flag: string }[] = [
  { label: 'Все авто', value: 'ALL', flag: '🚗' },
  { label: 'РФ Учёт', value: 'RU', flag: '🇷🇺' },
  { label: 'Киргизия (KG)', value: 'KG', flag: '🇰🇬' },
  { label: 'Армения (AM)', value: 'AM', flag: '🇦🇲' },
  { label: 'Абхазия (ABH)', value: 'ABH', flag: '🟢' },
];

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>(MOCK_CARS);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCity, setSelectedCity] = useState<string>('Все города');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedReg, setSelectedReg] = useState<RegistrationCountry | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isNewListingOpen, setIsNewListingOpen] = useState<boolean>(false);

  // Filtered cars
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // City filter
      if (selectedCity !== 'Все города' && car.city !== selectedCity) {
        return false;
      }

      // Brand filter
      if (selectedBrand && car.make !== selectedBrand) {
        return false;
      }

      // Registration filter
      if (selectedReg !== 'ALL' && car.registration.type !== selectedReg) {
        return false;
      }

      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        const fullString = `${car.make} ${car.model} ${car.title} ${car.description} ${car.city}`.toLowerCase();
        if (!fullString.includes(q)) return false;
      }

      return true;
    });
  }, [cars, selectedCity, selectedBrand, selectedReg, searchQuery]);

  const handleAddNewListing = (newCar: Car) => {
    setCars((prev) => [newCar, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onOpenNewListing={() => setIsNewListingOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16 space-y-6">
        
        {/* ===================== HOME VIEW ===================== */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Clean, Simple Search Bar */}
            <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Поиск авто в Дагестане: Camry, Приора, Веста, Mercedes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Popular Brands Pills */}
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Популярные марки:
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_BRANDS.map((brand) => (
                    <button
                      key={brand.value}
                      onClick={() => setSelectedBrand(brand.value)}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                        selectedBrand === brand.value
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Registration Tabs */}
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Учёт:
                </div>
                <div className="flex flex-wrap gap-2">
                  {REGISTRATIONS.map((reg) => (
                    <button
                      key={reg.value}
                      onClick={() => setSelectedReg(reg.value)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                        selectedReg === reg.value
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{reg.flag}</span>
                      <span>{reg.label}</span>
                      {selectedReg === reg.value && <Check className="w-3.5 h-3.5 ml-0.5" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count Header */}
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Автомобили в продаже ({filteredCars.length})
              </h2>

              {(selectedBrand || selectedReg !== 'ALL' || searchQuery || selectedCity !== 'Все города') && (
                <button
                  onClick={() => {
                    setSelectedBrand('');
                    setSelectedReg('ALL');
                    setSearchQuery('');
                    setSelectedCity('Все города');
                  }}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
                >
                  Сбросить фильтры
                </button>
              )}
            </div>

            {/* Clean Grid of Cars */}
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onSelect={(c) => setSelectedCar(c)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                <CarIcon className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">Автомобили не найдены</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Попробуйте выбрать «Все марки» или сбросить строку поиска.
                </p>
                <button
                  onClick={() => {
                    setSelectedBrand('');
                    setSelectedReg('ALL');
                    setSearchQuery('');
                    setSelectedCity('Все города');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm"
                >
                  Показать все авто
                </button>
              </div>
            )}

          </div>
        )}

        {/* ===================== TAB: SMART BARTER ===================== */}
        {activeTab === 'barter' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black text-slate-900">Умный бартер (Обмен авто)</h1>
              <button
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm"
              >
                ← На главную
              </button>
            </div>
            <SmartBarterView onSelectCar={(c) => setSelectedCar(c)} />
          </div>
        )}

        {/* ===================== TAB: CUSTOMS CALCULATOR ===================== */}
        {activeTab === 'customs' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black text-slate-900">Калькулятор дотаможки и утильсбора</h1>
              <button
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm"
              >
                ← На главную
              </button>
            </div>
            <CustomsCalculatorView />
          </div>
        )}

        {/* ===================== TAB: ISLAMIC MURABAHA ===================== */}
        {activeTab === 'murabaha' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black text-slate-900">Халяль-рассрочка (Мурабаха)</h1>
              <button
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm"
              >
                ← На главную
              </button>
            </div>
            <MurabahaCalculatorView />
          </div>
        )}

        {/* ===================== TAB: STO VERIFICATION ===================== */}
        {activeTab === 'sto' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black text-slate-900">Сеть проверенных СТО</h1>
              <button
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm"
              >
                ← На главную
              </button>
            </div>
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

      {/* Fast Listing Wizard */}
      {isNewListingOpen && (
        <FastListingWizard
          onClose={() => setIsNewListingOpen(false)}
          onListingCreated={handleAddNewListing}
        />
      )}

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-sm">Dag<span className="text-emerald-600">Auto</span> 05</span>
            <span>— Автомобильный маркетплейс Республики Дагестан</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span>Партнёры: «ЛяРиба-Финанс», «МЖК»</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
