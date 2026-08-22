'use client';

import React from 'react';
import { 
  Car, 
  Repeat, 
  Calculator, 
  ShieldCheck, 
  Coins, 
  Plus, 
  MapPin, 
  Home
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  onOpenNewListing: () => void;
}

const CITIES = ['Все города', 'Махачкала', 'Хасавюрт', 'Дербент', 'Каспийск', 'Буйнакск', 'Кизляр'];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedCity,
  setSelectedCity,
  onOpenNewListing,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 group-hover:bg-emerald-700 transition-colors">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Dag<span className="text-emerald-600">Auto</span>
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  05
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Авторынок Дагестана
              </p>
            </div>
          </div>

          {/* Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Home className="w-4 h-4 text-slate-700" />
              <span>Главная</span>
            </button>

            <button
              onClick={() => setActiveTab('barter')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'barter'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Repeat className="w-4 h-4 text-amber-600" />
              <span>Бартер</span>
            </button>

            <button
              onClick={() => setActiveTab('customs')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'customs'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>Дотаможка</span>
            </button>

            <button
              onClick={() => setActiveTab('murabaha')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'murabaha'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>Рассрочка</span>
            </button>

            <button
              onClick={() => setActiveTab('sto')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'sto'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>СТО</span>
            </button>
          </nav>

          {/* Right: City dropdown + Big Post button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* City Selector */}
            <div className="flex items-center gap-1 bg-slate-100 px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm text-slate-800 border border-slate-200">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                aria-label="Выбор города в Республике Дагестан"
                className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer pr-1"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c} className="bg-white text-slate-900 font-medium">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Post button */}
            <button
              onClick={onOpenNewListing}
              className="flex items-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all shadow-md shadow-emerald-600/20"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">Подать объявление</span>
              <span className="sm:hidden">Подать</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
