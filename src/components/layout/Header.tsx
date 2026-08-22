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
  Send,
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
      
      {/* Top clean micro-bar */}
      <div className="bg-slate-900 text-white px-4 py-1 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 font-bold text-[10px] px-1.5 py-0.5 rounded">
              05 РЕГИОН
            </span>
            <span className="text-slate-300 hidden sm:inline">
              Авторынок Республики Дагестан
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <Send className="w-3.5 h-3.5 text-sky-400" /> TG: @DagAutoBot
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 group-hover:bg-emerald-700 transition-colors">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Dag<span className="text-emerald-600">Auto</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  05
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Автомобили в Дагестане
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" />
              Главная
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'catalog'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Car className="w-4 h-4" />
              Купить авто
            </button>

            <button
              onClick={() => setActiveTab('barter')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'barter'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Repeat className="w-4 h-4 text-amber-600" />
              Бартер (Обмен)
            </button>

            <button
              onClick={() => setActiveTab('customs')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'customs'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              Дотаможка
            </button>

            <button
              onClick={() => setActiveTab('murabaha')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'murabaha'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Coins className="w-4 h-4 text-emerald-600" />
              Рассрочка
            </button>

            <button
              onClick={() => setActiveTab('sto')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'sto'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              СТО
            </button>
          </nav>

          {/* Right: City selector + Big Post button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* City Selector */}
            <div className="flex items-center gap-1 bg-slate-100 px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-800 border border-slate-200">
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
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all shadow-md shadow-emerald-600/20"
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
