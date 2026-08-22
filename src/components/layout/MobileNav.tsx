'use client';

import React from 'react';
import { 
  Car, 
  Repeat, 
  Calculator, 
  Coins, 
  Plus 
} from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNewListing: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewListing,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-2 py-1.5 safe-bottom shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-all ${
            activeTab === 'catalog' ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Car className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Каталог</span>
        </button>

        <button
          onClick={() => setActiveTab('barter')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-all relative ${
            activeTab === 'barter' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <Repeat className="w-5 h-5 mb-0.5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full" />
          </div>
          <span className="text-[10px]">Бартер</span>
        </button>

        {/* Center Quick Post Button */}
        <button
          onClick={onOpenNewListing}
          aria-label="Подать новое объявление"
          className="flex flex-col items-center -mt-4 bg-emerald-600 text-white p-2.5 rounded-full shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 active:scale-95 transition-all"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
        </button>

        <button
          onClick={() => setActiveTab('customs')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-all ${
            activeTab === 'customs' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calculator className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Дотаможка</span>
        </button>

        <button
          onClick={() => setActiveTab('murabaha')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-all ${
            activeTab === 'murabaha' ? 'text-teal-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Coins className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Мурабаха</span>
        </button>
      </div>
    </div>
  );
};
